pub struct SearchItem {
    pub title: String,
    pub subtitle: Option<String>,
}

impl SearchItem {
    pub fn new(title: impl Into<String>) -> Self {
        Self {
            title: title.into(),
            subtitle: None,
        }
    }

    pub fn subtitle(mut self, subtitle: impl Into<String>) -> Self {
        self.subtitle = Some(subtitle.into());
        self
    }
}

pub struct Search {
    items: Vec<SearchItem>,
}

impl Search {
    pub fn new() -> Self {
        Self { items: Vec::new() }
    }

    pub fn set_items(&mut self, items: Vec<SearchItem>) {
        self.items = items;
    }

    pub fn filter(&self, query: &str) -> Vec<&SearchItem> {
        self.items
            .iter()
            .filter(|item| item.title.to_lowercase().contains(&query.to_lowercase()))
            .collect()
    }

    pub fn items(&self) -> &[SearchItem] {
        &self.items
    }
}

impl Default for Search {
    fn default() -> Self {
        Self::new()
    }
}
