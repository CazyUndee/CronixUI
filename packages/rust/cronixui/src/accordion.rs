use std::collections::HashSet;

pub struct Accordion {
    open_indices: HashSet<usize>,
}

impl Accordion {
    pub fn new() -> Self {
        Self {
            open_indices: HashSet::new(),
        }
    }

    pub fn toggle(&mut self, index: usize) {
        if self.open_indices.contains(&index) {
            self.open_indices.remove(&index);
        } else {
            self.open_indices.insert(index);
        }
    }

    pub fn open(&mut self, index: usize) {
        self.open_indices.insert(index);
    }

    pub fn close(&mut self, index: usize) {
        self.open_indices.remove(&index);
    }

    pub fn open_all(&mut self, total: usize) {
        for i in 0..total {
            self.open_indices.insert(i);
        }
    }

    pub fn close_all(&mut self) {
        self.open_indices.clear();
    }

    pub fn is_open(&self, index: usize) -> bool {
        self.open_indices.contains(&index)
    }
}

impl Default for Accordion {
    fn default() -> Self {
        Self::new()
    }
}
