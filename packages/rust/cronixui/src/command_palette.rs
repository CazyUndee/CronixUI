pub struct CommandPaletteItem {
    pub title: String,
    pub kbd: Option<String>,
}

impl CommandPaletteItem {
    pub fn new(title: impl Into<String>) -> Self {
        Self {
            title: title.into(),
            kbd: None,
        }
    }

    pub fn kbd(mut self, kbd: impl Into<String>) -> Self {
        self.kbd = Some(kbd.into());
        self
    }
}

pub struct CommandPalette {
    open: bool,
    items: Vec<CommandPaletteItem>,
}

impl CommandPalette {
    pub fn new() -> Self {
        Self {
            open: false,
            items: Vec::new(),
        }
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

    pub fn set_items(&mut self, items: Vec<CommandPaletteItem>) {
        self.items = items;
    }

    pub fn items(&self) -> &[CommandPaletteItem] {
        &self.items
    }
}

impl Default for CommandPalette {
    fn default() -> Self {
        Self::new()
    }
}
