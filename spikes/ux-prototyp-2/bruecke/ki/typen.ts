// Anbieter-Schnittstelle (ap-52, design.md Abschnitt 1): ein Schritt „Nachrichten und Werkzeuge hinein, Text und
// Werkzeugaufrufe heraus“. Läuft nur in der lokalen Brücke; Schlüssel gelangen nie in den Browser (ADR-037).

export interface Werkzeug {
  name: string;
  befehl?: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface Aufruf {
  id: string;
  werkzeug: string;
  argumente: unknown;
}

export interface Nachricht {
  rolle: 'system' | 'mensch' | 'ki' | 'werkzeug';
  text?: string;
  aufrufe?: Aufruf[];
  aufruf_id?: string;
  ergebnis?: unknown;
}

export interface Schritt {
  text?: string;
  aufrufe: Aufruf[];
  /** Nur Satzerkennung: false, wenn kein Satzmuster passt (dann versucht der Chat die Simulation). */
  erkannt?: boolean;
  /** Fehler des Anbieters (`zeitlimit`, `http_<n>`, `netz`): Graph bleibt unverändert. */
  fehler?: string;
}

export interface Anbieter {
  id: 'regel' | 'openai-kompatibel';
  schritt(nachrichten: Nachricht[], werkzeuge: Werkzeug[]): Promise<Schritt>;
}
