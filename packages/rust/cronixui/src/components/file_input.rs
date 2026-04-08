//! File input component

pub struct FileInput {
    pub accept: String,
    pub multiple: bool,
}

impl FileInput {
    pub fn new() -> Self {
        Self { accept: String::new(), multiple: false }
    }

    pub fn accept(mut self, accept: impl Into<String>) -> Self {
        self.accept = accept.into();
        self
    }

    pub fn multiple(mut self) -> Self {
        self.multiple = true;
        self
    }
}

impl Default for FileInput {
    fn default() -> Self {
        Self::new()
    }
}
