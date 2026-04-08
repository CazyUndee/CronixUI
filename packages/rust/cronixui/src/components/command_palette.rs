//! Command palette component

pub struct CommandItem {
    pub title: String,
    pub subtitle: Option<String>,
    pub kbd: Option<String>,
}

impl CommandItem {
    pub fn new(title: impl Into<String>) -> Self {
        Self { title: title.into(), subtitle: None, kbd: None }
    }

    pub fn subtitle(mut self, subtitle: impl Into<String>) -> Self {
        self.subtitle = Some(subtitle.into());
        self
    }

    pub fn kbd(mut self, kbd: impl Into<String>) -> Self {
        self.kbd = Some(kbd.into());
        self
    }
}

pub struct CommandPalette {
    pub items: Vec<CommandItem>,
    pub query: String,
    pub open: bool,
}

impl CommandPalette {
    pub fn new() -> Self {
        Self { items: Vec::new(), query: String::new(), open: false }
    }

    pub fn item(mut self, item: CommandItem) -> Self {
        self.items.push(item);
        self
    }

    pub fn open(&mut self) {
        self.open = true;
    }

    pub fn close(&mut self) {
        self.open = false;
        self.query.clear();
    }

    pub fn toggle(&mut self) {
        if self.open {
            self.close();
        } else {
            self.open = true;
        }
    }

    pub fn filter(&self) -> Vec<&CommandItem> {
        if self.query.is_empty() {
            return self.items.iter().collect();
        }
        self.items
            .iter()
            .filter(|item| item.title.to_lowercase().contains(&self.query.to_lowercase()))
            .collect()
    }
}

impl Default for CommandPalette {
    fn default() -> Self {
        Self::new()
    }
}
