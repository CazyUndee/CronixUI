//! Drawer component

/// Drawer side.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DrawerSide {
    Left,
    Right,
    Top,
    Bottom,
}

/// Drawer size.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DrawerSize {
    Sm,
    Md,
    Lg,
}

/// Drawer/panel state.
pub struct Drawer {
    pub open: bool,
    pub title: String,
    pub side: DrawerSide,
    pub size: DrawerSize,
}

impl Drawer {
    pub fn new(title: &str) -> Self {
        Self { open: false, title: title.to_string(), side: DrawerSide::Right, size: DrawerSize::Md }
    }

    pub fn with_side(mut self, side: DrawerSide) -> Self {
        self.side = side;
        self
    }

    pub fn with_size(mut self, size: DrawerSize) -> Self {
        self.size = size;
        self
    }

    pub fn open(&mut self) { self.open = true; }
    pub fn close(&mut self) { self.open = false; }
    pub fn toggle(&mut self) { self.open = !self.open; }
    pub fn is_open(&self) -> bool { self.open }

    /// Render as text.
    pub fn render_text(&self) -> String {
        if self.open {
            format!("[Drawer: {}]", self.title)
        } else {
            String::new()
        }
    }
}
