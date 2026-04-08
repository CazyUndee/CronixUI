//! Search component

pub struct SearchItem {
    pub title: String,
    pub subtitle: Option<String>,
}

impl SearchItem {
    pub fn new(title: impl Into<String>) -> Self {
        Self { title: title.into(), subtitle: None }
    }

    pub fn subtitle(mut self, subtitle: impl Into<String>) -> Self {
        self.subtitle = Some(subtitle.into());
        self
    }
}

pub struct Search {
    pub items: Vec<SearchItem>,
    pub query: String,
}

impl Search {
    pub fn new() -> Self {
        Self { items: Vec::new(), query: String::new() }
    }

    pub fn item(mut self, item: SearchItem) -> Self {
        self.items.push(item);
        self
    }

    pub fn filter(&self) -> Vec<&SearchItem> {
        if self.query.is_empty() {
            return self.items.iter().collect();
        }
        self.items
            .iter()
            .filter(|item| item.title.to_lowercase().contains(&self.query.to_lowercase()))
            .collect()
    }
}

impl Default for Search {
    fn default() -> Self {
        Self::new()
    }
}
