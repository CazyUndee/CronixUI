//! DatePicker component

/// Date picker state.
///
/// ## Example
/// ```no_run
/// use cronixui::components::DatePicker;
///
/// let mut picker = DatePicker::new();
/// picker.set_value("2024-06-15");
/// assert_eq!(picker.get_value(), "2024-06-15");
/// ```
pub struct DatePicker {
    pub value: String,
    pub min_date: Option<String>,
    pub max_date: Option<String>,
    pub disabled: bool,
}

impl DatePicker {
    pub fn new() -> Self {
        Self { value: String::new(), min_date: None, max_date: None, disabled: false }
    }

    pub fn with_value(value: &str) -> Self {
        Self { value: value.to_string(), ..Self::new() }
    }

    pub fn set_value(&mut self, value: &str) {
        self.value = value.to_string();
    }

    pub fn get_value(&self) -> &str {
        &self.value
    }

    pub fn set_min(&mut self, min: &str) {
        self.min_date = Some(min.to_string());
    }

    pub fn set_max(&mut self, max: &str) {
        self.max_date = Some(max.to_string());
    }
}

impl Default for DatePicker {
    fn default() -> Self {
        Self::new()
    }
}
