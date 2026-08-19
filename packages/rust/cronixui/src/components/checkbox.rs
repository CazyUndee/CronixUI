//! Checkbox component

/// Checkbox state.
///
/// ## Example
/// ```
/// use cronixui::components::Checkbox;
///
/// let mut checkbox = Checkbox::new();
/// checkbox.set(true);
/// assert!(checkbox.is_checked());
/// checkbox.toggle();
/// assert!(!checkbox.is_checked());
/// ```
pub struct Checkbox {
    pub checked: bool,
    pub label: String,
}

impl Checkbox {
    pub fn new() -> Self {
        Self {
            checked: false,
            label: String::new(),
        }
    }

    pub fn with_label(label: impl Into<String>) -> Self {
        Self {
            checked: false,
            label: label.into(),
        }
    }

    pub fn set(&mut self, checked: bool) {
        self.checked = checked;
    }

    pub fn toggle(&mut self) {
        self.checked = !self.checked;
    }

    pub fn is_checked(&self) -> bool {
        self.checked
    }
}

impl Default for Checkbox {
    fn default() -> Self {
        Self::new()
    }
}
