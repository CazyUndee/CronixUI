//! Tooltip component

pub struct Tooltip {
    pub content: String,
}

impl Tooltip {
    pub fn new(content: impl Into<String>) -> Self {
        Self { content: content.into() }
    }
}
