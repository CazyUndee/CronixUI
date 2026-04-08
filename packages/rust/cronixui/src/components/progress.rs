//! Progress component

pub struct Progress {
    pub value: f32,
    pub max: f32,
}

impl Progress {
    pub fn new() -> Self {
        Self { value: 0.0, max: 100.0 }
    }

    pub fn set_value(&mut self, value: f32) {
        self.value = value.clamp(0.0, self.max);
    }

    pub fn percentage(&self) -> f32 {
        (self.value / self.max) * 100.0
    }
}

impl Default for Progress {
    fn default() -> Self {
        Self::new()
    }
}

pub struct Stat {
    pub value: String,
    pub label: String,
    pub delta: Option<String>,
    pub delta_up: bool,
}

impl Stat {
    pub fn new(value: impl Into<String>, label: impl Into<String>) -> Self {
        Self {
            value: value.into(),
            label: label.into(),
            delta: None,
            delta_up: true,
        }
    }

    pub fn delta(mut self, delta: impl Into<String>, up: bool) -> Self {
        self.delta = Some(delta.into());
        self.delta_up = up;
        self
    }
}
