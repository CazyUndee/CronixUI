pub struct Toggle {
    on: bool,
}

impl Toggle {
    pub fn new() -> Self {
        Self { on: false }
    }

    pub fn toggle(&mut self) {
        self.on = !self.on;
    }

    pub fn is_on(&self) -> bool {
        self.on
    }

    pub fn set_on(&mut self, value: bool) {
        self.on = value;
    }
}

impl Default for Toggle {
    fn default() -> Self {
        Self::new()
    }
}
