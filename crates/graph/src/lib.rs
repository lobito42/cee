//! Element-Graph – Quelle der Wahrheit (ADR-028), gemeinsamer Kern für Server, Client und SDK (ADR-029).
//!
//! Das eigentliche Datenmodell entsteht im Change `ap-01-spike-datenmodell`. Bis dahin hält diese Datei
//! nur die Schema-Version fest, damit Workspace, CI und Agenten-Hooks laufen.

/// Version des Elementschemas unter `format/schema/`. Jede Änderung braucht eine Migration (ADR-028).
pub const SCHEMA_VERSION: u32 = 0;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn schema_version_is_defined() {
        assert_eq!(SCHEMA_VERSION, 0);
    }
}
