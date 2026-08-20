//! Chip component

/// Chip variant.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ChipVariant {
    Default,
    Accent,
    Success,
    Warning,
    Error,
    Info,
}

/// Chip/tag with optional remove button.
///
/// ## Example
/// ```no_run
/// use cronixui::components::{Chip, ChipVariant};
///
/// let chip = Chip::new("Option A")
///     .with_variant(ChipVariant::Accent)
///     .selected(true);
/// assert!(chip.is_selected());
/// ```
pub struct Chip {
    pub label: String,
    pub variant: ChipVariant,
    pub selected: bool,
    pub removable: bool,
}

impl Chip {
    pub fn new(label: &str) -> Self {
        Self { label: label.to_string(), variant: ChipVariant::Default, selected: false, removable: false }
    }

    pub fn with_variant(mut self, variant: ChipVariant) -> Self {
        self.variant = variant;
        self
    }

    pub fn selected(mut self, selected: bool) -> Self {
        self.selected = selected;
        self
    }

    pub fn removable(mut self, removable: bool) -> Self {
        self.removable = removable;
        self
    }

    pub fn is_selected(&self) -> bool {
        self.selected
    }

    /// Render as text.
    pub fn render_text(&self) -> String {
        if self.removable {
            format!("{} ✕", self.label)
        } else {
            self.label.clone()
        }
    }
}
