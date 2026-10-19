//! Vergleicht automerge 0.5 (Op-Baum), 0.7 und 0.12 (spaltenorientierter Op-Satz) an derselben Elementform:
//! Aufbau, Nachschlagen, Schreiben, Schreiben mit Commit, Speichern, Laden. Nur zur Analyse.
//!
//! `cargo run --release --manifest-path spikes/datenmodell/Cargo.toml --example probe -- 10000`

use std::time::Instant;

macro_rules! probe {
    ($name:ident, $am:ident) => {
        fn $name(n: usize) {
            use $am::{transaction::Transactable, AutoCommit, ObjType, ReadDoc, Value, ROOT};
            let label = stringify!($am);
            let mut doc = AutoCommit::new();
            let elems = doc.put_object(ROOT, "elements", ObjType::Map).unwrap();
            let t = Instant::now();
            let mut params = Vec::new();
            for i in 0..n {
                let e = doc
                    .put_object(&elems, format!("e{i:06}"), ObjType::Map)
                    .unwrap();
                doc.put(&e, "type", "wall").unwrap();
                for f in ["inputs", "outputs", "meta"] {
                    doc.put_object(&e, f, ObjType::Map).unwrap();
                }
                let p = doc.put_object(&e, "params", ObjType::Map).unwrap();
                doc.put(&p, "length", 1000i64).unwrap();
                doc.put(&p, "height", 3000i64).unwrap();
                doc.put(&p, "thickness", 175i64).unwrap();
                doc.put_object(&e, "content", ObjType::List).unwrap();
                params.push(p);
            }
            doc.commit();
            println!(
                "{label} n={n} aufbauen: {:.1} ms",
                t.elapsed().as_secs_f64() * 1e3
            );

            let t = Instant::now();
            for k in 0..1000 {
                let id = format!("e{:06}", (k * 7919) % n);
                let e = match doc.get(&elems, id.as_str()).unwrap() {
                    Some((Value::Object(_), o)) => o,
                    _ => panic!("Element fehlt"),
                };
                let _p = doc.get(&e, "params").unwrap();
            }
            println!(
                "{label} nachschlagen: {:.4} ms/op",
                t.elapsed().as_secs_f64()
            );

            let t = Instant::now();
            for k in 0..1000 {
                doc.put(&params[(k * 7919) % n], "length", k as i64)
                    .unwrap();
            }
            println!(
                "{label} schreiben ohne Commit: {:.4} ms/op",
                t.elapsed().as_secs_f64()
            );
            doc.commit();

            let t = Instant::now();
            for k in 0..1000 {
                doc.put(&params[(k * 7919) % n], "length", k as i64)
                    .unwrap();
                doc.commit();
            }
            println!(
                "{label} schreiben mit Commit: {:.4} ms/op",
                t.elapsed().as_secs_f64()
            );

            let t = Instant::now();
            let bytes = doc.save();
            println!(
                "{label} speichern: {:.1} ms, {:.2} MB",
                t.elapsed().as_secs_f64() * 1e3,
                bytes.len() as f64 / 1e6
            );
            let t = Instant::now();
            let loaded = AutoCommit::load(&bytes).unwrap();
            println!(
                "{label} laden: {:.1} ms ({} Elemente)",
                t.elapsed().as_secs_f64() * 1e3,
                loaded.length(&elems)
            );
        }
    };
}

probe!(probe_05, automerge_05);
probe!(probe_07, automerge_07);
probe!(probe_12, automerge);

fn main() {
    let n: usize = std::env::args()
        .nth(1)
        .and_then(|s| s.parse().ok())
        .unwrap_or(10_000);
    probe_05(n);
    probe_07(n);
    probe_12(n);
}
