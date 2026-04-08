//! Dropdown component

pub struct Dropdown {
    pub items: Vec<String>,
    pub selected: Option<usize>,
    pub open: bool,
}

impl Dropdown {
    pub fn new(items: impl IntoIterator<Item = impl Into<String>>) -> Self {
        Self {
            items: items.into_iter().map(|s| s.into()).collect(),
            selected: None,
            open: false,
        }
    }

    pub fn select(&mut self, index: usize) {
        if index < self.items.len() {
            self.selected = Some(index);
        }
    }

    pub fn toggle(&mut self) {
        self.open = !self.open;
    }

    pub fn close(&mut self) {
        self.open = false;
    }

    pub fn selected_text(&self) -> Option<&str> {
        self.selected.map(|i| self.items[i].as_str())
    }
}
