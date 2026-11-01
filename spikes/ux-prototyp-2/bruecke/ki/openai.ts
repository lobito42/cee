// Anbieter `openai-kompatibel` (ap-52, design.md Abschnitt 1): `POST <CEE_KI_URL>/chat/completions` mit Werkzeugen,
// `tool_choice: "auto"`, `temperature: 0`. Deckt Ollama, llama.cpp, vLLM, LM Studio und Dienste mit dieser
// Schnittstelle ab. Nur `fetch` aus Node, keine neuen Pakete. Der Schlüssel bleibt in der Brücke (ADR-037).
import type { Anbieter, Aufruf, Nachricht, Schritt, Werkzeug } from './typen';

export interface Einrichtung {
  url: string;
  modell: string;
  schluessel?: string;
  zeitlimitMs: number;
  /** Fertige Systemanweisung (feste Anweisung); die Modellübersicht kommt aus der Systemnachricht. */
  anweisung: string;
  /** Protokoll ausgehender Anfragen (nur Prüfmodus): Host, Pfad, Werkzeugnamen, Bytes, ob ein Schlüssel ging. */
  protokoll?: (eintrag: Record<string, unknown>) => void;
}

interface OaNachricht {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: { id: string; type: 'function'; function: { name: string; arguments: string } }[];
  tool_call_id?: string;
}

/** Nachrichten der Schnittstelle → OpenAI-Format. */
export function nachOpenAi(nachrichten: Nachricht[], anweisung: string): OaNachricht[] {
  const aus: OaNachricht[] = [];
  for (const n of nachrichten) {
    if (n.rolle === 'system')
      aus.push({ role: 'system', content: [anweisung, n.text ?? ''].filter(Boolean).join('\n\n') });
    else if (n.rolle === 'mensch') aus.push({ role: 'user', content: n.text ?? '' });
    else if (n.rolle === 'ki') {
      const m: OaNachricht = { role: 'assistant', content: n.text ?? null };
      if (n.aufrufe?.length)
        m.tool_calls = n.aufrufe.map((a) => ({
          id: a.id,
          type: 'function',
          function: {
            name: a.werkzeug,
            arguments: typeof a.argumente === 'string' ? a.argumente : JSON.stringify(a.argumente),
          },
        }));
      aus.push(m);
    } else
      aus.push({
        role: 'tool',
        tool_call_id: n.aufruf_id ?? '',
        content: JSON.stringify(n.ergebnis ?? {}),
      });
  }
  return aus;
}

export function openAiAnbieter(e: Einrichtung): Anbieter {
  return {
    id: 'openai-kompatibel',
    async schritt(nachrichten: Nachricht[], werkzeuge: Werkzeug[]): Promise<Schritt> {
      const body = JSON.stringify({
        model: e.modell,
        messages: nachOpenAi(nachrichten, e.anweisung),
        tools: werkzeuge.map((w) => ({
          type: 'function',
          function: { name: w.name, description: w.description, parameters: w.inputSchema },
        })),
        tool_choice: 'auto',
        temperature: 0,
      });
      const ziel = new URL(`${e.url.replace(/\/+$/, '')}/chat/completions`);
      e.protokoll?.({
        host: ziel.hostname,
        pfad: ziel.pathname,
        werkzeuge: werkzeuge.map((w) => w.name),
        bytes: Buffer.byteLength(body),
        schluessel: !!e.schluessel,
      });
      const abbruch = new AbortController();
      const uhr = setTimeout(() => abbruch.abort(), e.zeitlimitMs);
      try {
        const r = await fetch(ziel, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(e.schluessel ? { Authorization: `Bearer ${e.schluessel}` } : {}),
          },
          body,
          signal: abbruch.signal,
        });
        if (!r.ok) return { aufrufe: [], fehler: `http_${r.status}` };
        const j = (await r.json()) as {
          choices?: {
            message?: {
              content?: string | null;
              tool_calls?: { id?: string; function?: { name?: string; arguments?: string } }[];
            };
          }[];
        };
        const m = j.choices?.[0]?.message ?? {};
        const aufrufe: Aufruf[] = (m.tool_calls ?? []).map((c, i) => {
          const roh = c.function?.arguments ?? '{}';
          let argumente: unknown = roh;
          try {
            argumente = JSON.parse(roh);
          } catch {
            /* bleibt Text: das Werkzeug meldet `invalid_arguments` */
          }
          return { id: c.id ?? `aufruf-${i + 1}`, werkzeug: c.function?.name ?? '', argumente };
        });
        return { text: m.content ?? undefined, aufrufe };
      } catch {
        return { aufrufe: [], fehler: abbruch.signal.aborted ? 'zeitlimit' : 'netz' };
      } finally {
        clearTimeout(uhr);
      }
    },
  };
}
