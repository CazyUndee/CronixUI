//! Select component

/// Dropdown select state.
///
/// ## Example
/// ```
/// use cronixui::components::Select;
///
/// let mut select = Select::new(vec!["Small".to_string(), "Large".to_string()]);
/// select.set_value("Large");
/// assert_eq!(select.value(), Some("Large"));
/// ```
pub struct Select {
    pub options: Vec<String>,
    pub value: Option<String>,
}

impl Select {
    pub fn new(options: Vec<String>) -> Self {
        Self {
            options,
            value: None,
        }
    }

    pub fn set_value(&mut self, value: impl Into<String>) {
        let val = value.into();
        if self.options.iter().any(|o| o == &val) {
            self.value = Some(val);
        }
    }

    pub fn value(&self) -> Option<&str> {
        self.value.as_deref()
    }

    pub fn clear(&mut self) {
        self.value = None;
    }
}
