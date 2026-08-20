//! EmptyState component

/// Empty state placeholder.
pub struct EmptyState {
    pub title: String,
    pub description: Option<String>,
    pub icon: Option<String>,
}

impl EmptyState {
    pub fn new(title: &str) -> Self {
        Self { title: title.to_string(), description: None, icon: None }
    }
    pub fn with_description(mut self, desc: &str) -> Self { self.description = Some(desc.to_string()); self }
    pub fn with_icon(mut self, icon: &str) -> Self { self.icon = Some(icon.to_string()); self }
}

impl Default for EmptyState {
    fn default() -> Self { Self::new("") }
}
