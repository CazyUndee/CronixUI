pub struct Tabs {
    active_index: usize,
}

impl Tabs {
    pub fn new() -> Self {
        Self { active_index: 0 }
    }

    pub fn set_active(&mut self, index: usize) {
        self.active_index = index;
    }

    pub fn active_index(&self) -> usize {
        self.active_index
    }
}

impl Default for Tabs {
    fn default() -> Self {
        Self::new()
    }
}
