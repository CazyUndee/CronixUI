//! Slider component

/// Slider state.
///
/// ## Example
/// ```
/// use cronixui::components::Slider;
///
/// let mut slider = Slider::new(0.0, 100.0);
/// slider.set_value(42.0);
/// assert_eq!(slider.value(), 42.0);
/// ```
pub struct Slider {
    pub min: f32,
    pub max: f32,
    pub value: f32,
}

impl Slider {
    pub fn new(min: f32, max: f32) -> Self {
        Self {
            min,
            max,
            value: min,
        }
    }

    pub fn set_value(&mut self, value: f32) {
        self.value = value.clamp(self.min, self.max);
    }

    pub fn value(&self) -> f32 {
        self.value
    }

    /// Progress as a 0.0..=1.0 fraction.
    pub fn fraction(&self) -> f32 {
        if self.max <= self.min {
            return 0.0;
        }
        ((self.value - self.min) / (self.max - self.min)).clamp(0.0, 1.0)
    }
}
