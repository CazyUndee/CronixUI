pub struct Modal {
    open: bool,
}

impl Modal {
    pub fn new() -> Self {
        Self { open: false }
    }

    pub fn open(&mut self) {
        self.open = true;
    }

    pub fn close(&mut self) {
        self.open = false;
    }

    pub fn is_open(&self) -> bool {
        self.open
    }
}

impl Default for Modal {
    fn default() -> Self {
        Self::new()
    }
}
