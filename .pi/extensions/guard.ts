// Vertragsschutz für Pi: blockiert Schreibzugriffe, die tools/guard.py für den aktuellen Branch verbietet.
// Gleiche Regeln wie Claude-Hook, Git-Pre-Commit und CI. Wird nach dem Vertrauen des Projekts geladen.
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const WRITE_TOOLS = new Set(["write", "edit", "multi_edit", "multiedit"]);

export default function (pi: any) {
  pi.on("tool_call", async (event: any, ctx: any) => {
    if (!WRITE_TOOLS.has(String(event.toolName).toLowerCase())) return;
    const target = event.input?.path ?? event.input?.file_path;
    if (!target) return;
    const cwd: string = ctx?.cwd ?? process.cwd();
    try {
      execFileSync("python3", [join(cwd, "tools", "guard.py"), "check", String(target)], {
        cwd,
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 15000,
      });
    } catch (err: any) {
      if (err?.status === 2) {
        const reason = String(err.stderr ?? "").trim() || "Vertragsschutz: Pfad auf diesem Branch gesperrt";
        return { block: true, reason };
      }
      // Andere Fehler (kein Python, Timeout) nicht blockieren; Git-Pre-Commit und CI greifen trotzdem.
    }
  });
}
