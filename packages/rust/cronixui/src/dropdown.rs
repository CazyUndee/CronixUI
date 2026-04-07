pub struct Dropdown {
    open: bool,
}

impl Dropdown {
    pub fn new() -> Self {
        Self { open: false }
    }

    pub fn open(&mut self) {
        self.open = true;
    }

    pub fn close(&mut self) {
        self.open = false;
    }

    pub fn toggle(&mut self) {
        self.open = !self.open;
    }

    pub fn is_open(&self) -> bool {
        self.open
    }
}

impl Default for Dropdown {
    fn default() -> Self {
        Self::new()
    }
}
