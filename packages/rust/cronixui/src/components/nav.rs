//! Navigation component

pub struct Nav {
    pub items: Vec<String>,
    pub active: usize,
}

impl Nav {
    pub fn new(items: impl IntoIterator<Item = impl Into<String>>) -> Self {
        Self {
            items: items.into_iter().map(|s| s.into()).collect(),
            active: 0,
        }
    }

    pub fn set_active(&mut self, index: usize) {
        self.active = index.min(self.items.len().saturating_sub(1));
    }
}
