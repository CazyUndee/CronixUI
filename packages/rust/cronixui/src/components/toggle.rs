//! Toggle component

pub struct Toggle {
    pub on: bool,
}

impl Toggle {
    pub fn new() -> Self {
        Self { on: false }
    }

    pub fn toggle(&mut self) {
        self.on = !self.on;
    }

    pub fn set(&mut self, value: bool) {
        self.on = value;
    }

    pub fn is_on(&self) -> bool {
        self.on
    }
}

impl Default for Toggle {
    fn default() -> Self {
        Self::new()
    }
}
