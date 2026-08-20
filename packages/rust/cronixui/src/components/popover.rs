//! Popover component

/// Popover placement.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum PopoverPlacement {
    Top,
    Bottom,
    Left,
    Right,
}

/// Popover state.
pub struct Popover {
    pub open: bool,
    pub placement: PopoverPlacement,
}

impl Popover {
    pub fn new() -> Self {
        Self { open: false, placement: PopoverPlacement::Bottom }
    }

    pub fn with_placement(mut self, placement: PopoverPlacement) -> Self {
        self.placement = placement;
        self
    }

    pub fn show(&mut self) { self.open = true; }
    pub fn hide(&mut self) { self.open = false; }
    pub fn toggle(&mut self) { self.open = !self.open; }
    pub fn is_open(&self) -> bool { self.open }
}

impl Default for Popover {
    fn default() -> Self {
        Self::new()
    }
}
