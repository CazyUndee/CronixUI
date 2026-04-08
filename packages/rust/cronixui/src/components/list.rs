//! List component

pub struct ListItem {
    pub title: String,
    pub subtitle: Option<String>,
}

impl ListItem {
    pub fn new(title: impl Into<String>) -> Self {
        Self { title: title.into(), subtitle: None }
    }

    pub fn subtitle(mut self, subtitle: impl Into<String>) -> Self {
        self.subtitle = Some(subtitle.into());
        self
    }
}

pub struct List {
    pub items: Vec<ListItem>,
}

impl List {
    pub fn new() -> Self {
        Self { items: Vec::new() }
    }

    pub fn item(mut self, item: ListItem) -> Self {
        self.items.push(item);
        self
    }
}

impl Default for List {
    fn default() -> Self {
        Self::new()
    }
}
