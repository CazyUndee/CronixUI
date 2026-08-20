//! Notification component

/// Notification variant.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum NotificationVariant { Info, Success, Warning, Error }

/// Notification toast state.
pub struct Notification {
    pub message: String,
    pub title: Option<String>,
    pub variant: NotificationVariant,
    pub visible: bool,
}

impl Notification {
    pub fn new(message: &str) -> Self {
        Self { message: message.to_string(), title: None, variant: NotificationVariant::Info, visible: false }
    }
    pub fn show(&mut self) { self.visible = true; }
    pub fn hide(&mut self) { self.visible = false; }
}

impl Default for Notification {
    fn default() -> Self { Self::new("") }
}
