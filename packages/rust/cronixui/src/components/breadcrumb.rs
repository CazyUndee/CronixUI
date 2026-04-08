//! Breadcrumb component

pub struct Breadcrumb {
    pub items: Vec<String>,
}

impl Breadcrumb {
    pub fn new() -> Self {
        Self { items: Vec::new() }
    }

    pub fn item(mut self, item: impl Into<String>) -> Self {
        self.items.push(item.into());
        self
    }
}

impl Default for Breadcrumb {
    fn default() -> Self {
        Self::new()
    }
}
