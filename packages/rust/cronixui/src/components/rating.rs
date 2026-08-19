//! Rating component

/// Star rating state.
///
/// ## Example
/// ```
/// use cronixui::components::Rating;
///
/// let mut rating = Rating::new();
/// rating.set_value(4);
/// assert_eq!(rating.get_value(), 4);
/// assert_eq!(rating.stars(), "★★★★☆");
/// ```
pub struct Rating {
    pub value: u8,
    pub max: u8,
}

impl Rating {
    pub fn new() -> Self {
        Self { value: 0, max: 5 }
    }

    pub fn with_max(max: u8) -> Self {
        Self { value: 0, max: max.max(1) }
    }

    pub fn set_value(&mut self, value: u8) {
        self.value = value.min(self.max);
    }

    pub fn get_value(&self) -> u8 {
        self.value
    }

    /// Render the rating as filled (★) and empty (☆) stars.
    pub fn stars(&self) -> String {
        let mut out = String::with_capacity(self.max as usize);
        for i in 1..=self.max {
            out.push(if i <= self.value { '★' } else { '☆' });
        }
        out
    }
}

impl Default for Rating {
    fn default() -> Self {
        Self::new()
    }
}
