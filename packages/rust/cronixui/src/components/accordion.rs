//! Accordion component

pub struct Accordion {
    pub open_indices: Vec<bool>,
}

impl Accordion {
    pub fn new(count: usize) -> Self {
        Self {
            open_indices: vec![false; count],
        }
    }

    pub fn toggle(&mut self, index: usize) {
        if index < self.open_indices.len() {
            self.open_indices[index] = !self.open_indices[index];
        }
    }

    pub fn open(&mut self, index: usize) {
        if index < self.open_indices.len() {
            self.open_indices[index] = true;
        }
    }

    pub fn close(&mut self, index: usize) {
        if index < self.open_indices.len() {
            self.open_indices[index] = false;
        }
    }

    pub fn open_all(&mut self) {
        for open in &mut self.open_indices {
            *open = true;
        }
    }

    pub fn close_all(&mut self) {
        for open in &mut self.open_indices {
            *open = false;
        }
    }

    pub fn is_open(&self, index: usize) -> bool {
        self.open_indices.get(index).copied().unwrap_or(false)
    }
}
