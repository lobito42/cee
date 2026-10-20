//! Element-Graph – Quelle der Wahrheit (ADR-028), gemeinsamer Kern für Server, Client und SDK (ADR-029).
//!
//! Bausteine:
//! - [`units`]: Dimensionen, Einheitentabelle (UCUM-Codes), Umrechnung, Lesen von Eingaben (ADR-057)
//! - [`types`]: Typdefinitionen (Parameter → Dimension, Standard-Einheit), zur Laufzeit registriert
//! - [`schema`]: Elementform, Größe und Geld, Regeln beim Schreiben von Zahlen
//! - [`doc`]: Dokument auf Automerge – Operationen, Laden, Speichern, Merge, Hash, Stapel-Import
//! - [`validate`]: Prüfung mit Befunden
//! - [`synth`]: deterministischer Generator für Projekte und Prüfkorpora

pub mod doc;
pub mod schema;
pub mod synth;
pub mod types;
pub mod units;
pub mod validate;

use std::fmt;

/// Version des Elementschemas unter `format/schema/`. Jede Änderung braucht eine Migration (ADR-028).
pub const SCHEMA_VERSION: u32 = 1;

/// Fehler des Kerns. Bindungen wandeln ihn über [`Error::code`] in strukturierte Fehler um.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    /// Eingabe nicht lesbar.
    Parse(String),
    /// Einheiten-Code nicht in der Tabelle.
    UnknownUnit(String),
    /// Dimension passt nicht.
    DimensionMismatch(String),
    /// Typdefinition ungültig.
    InvalidTypeDefinition(String),
    /// Geld ohne Währung, als Gleitkommazahl oder sonst unzulässig.
    InvalidMoney(String),
    /// ID entspricht nicht dem Muster.
    InvalidId(String),
    /// ID gibt es schon.
    DuplicateId(String),
    /// Name eines Eingangs, Ausgangs, Parameters oder Meta-Eintrags unzulässig.
    InvalidName(String),
    /// Element gibt es nicht.
    UnknownElement(String),
    /// Unbekannte oder unvollständige Operation.
    InvalidOperation(String),
    /// Ungültiges JSON oder unerwartete JSON-Form.
    Json(String),
    /// Fehler aus Automerge.
    Automerge(String),
    /// Verstoß gegen das Datenmodell.
    Model(String),
}

impl Error {
    /// Stabiler Fehlercode (snake_case) für Bindungen und Abnahmetests.
    pub fn code(&self) -> &'static str {
        match self {
            Error::Parse(_) => "parse_error",
            Error::UnknownUnit(_) => "unknown_unit",
            Error::DimensionMismatch(_) => "dimension_mismatch",
            Error::InvalidTypeDefinition(_) => "invalid_type_definition",
            Error::InvalidMoney(_) => "invalid_money",
            Error::InvalidId(_) => "invalid_id",
            Error::DuplicateId(_) => "duplicate_id",
            Error::InvalidName(_) => "invalid_name",
            Error::UnknownElement(_) => "unknown_element",
            Error::InvalidOperation(_) => "invalid_operation",
            Error::Json(_) => "json_error",
            Error::Automerge(_) => "automerge_error",
            Error::Model(_) => "model_error",
        }
    }

    fn message(&self) -> &str {
        match self {
            Error::Parse(m)
            | Error::UnknownUnit(m)
            | Error::DimensionMismatch(m)
            | Error::InvalidTypeDefinition(m)
            | Error::InvalidMoney(m)
            | Error::InvalidId(m)
            | Error::DuplicateId(m)
            | Error::InvalidName(m)
            | Error::UnknownElement(m)
            | Error::InvalidOperation(m)
            | Error::Json(m)
            | Error::Automerge(m)
            | Error::Model(m) => m,
        }
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.code(), self.message())
    }
}

impl std::error::Error for Error {}

impl From<automerge::AutomergeError> for Error {
    fn from(e: automerge::AutomergeError) -> Self {
        Error::Automerge(e.to_string())
    }
}

impl From<serde_json::Error> for Error {
    fn from(e: serde_json::Error) -> Self {
        Error::Json(e.to_string())
    }
}

/// Ergebnis mit dem Fehlertyp des Kerns.
pub type Result<T> = std::result::Result<T, Error>;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn schema_version_is_defined() {
        assert_eq!(SCHEMA_VERSION, 1);
    }

    #[test]
    fn error_codes_are_stable() {
        assert_eq!(Error::Parse("x".into()).code(), "parse_error");
        assert_eq!(Error::UnknownUnit("x".into()).code(), "unknown_unit");
        assert_eq!(
            Error::DimensionMismatch("x".into()).to_string(),
            "dimension_mismatch: x"
        );
    }
}
