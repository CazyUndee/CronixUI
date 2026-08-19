//! Radio component

/// Radio button group state.
///
/// ## Example
/// ```
/// use cronixui::components::Radio;
///
/// let mut radio = Radio::new(vec!["A".to_string(), "B".to_string(), "C".to_string()]);
/// radio.select("B");
/// assert_eq!(radio.selected(), Some("B"));
/// ```
pub struct Radio {
    pub options: Vec<String>,
    pub selected: Option<String>,
}

impl Radio {
    pub fn new(options: Vec<String>) -> Self {
        Self {
            options,
            selected: None,
        }
    }

    pub fn select(&mut self, option: impl Into<String>) {
        let value = option.into();
        if self.options.iter().any(|o| o == &value) {
            self.selected = Some(value);
        }
    }

    pub fn selected(&self) -> Option<&str> {
        self.selected.as_deref()
    }

    pub fn clear(&mut self) {
        self.selected = None;
    }
}
