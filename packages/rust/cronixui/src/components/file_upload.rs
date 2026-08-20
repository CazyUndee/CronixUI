//! FileUpload component

/// File upload state.
pub struct FileUpload {
    pub accept: Option<String>,
    pub multiple: bool,
    pub label: String,
}

impl FileUpload {
    pub fn new() -> Self {
        Self { accept: None, multiple: false, label: "Drag & drop files here or click to browse".to_string() }
    }
    pub fn with_accept(mut self, accept: &str) -> Self { self.accept = Some(accept.to_string()); self }
    pub fn multiple(mut self, m: bool) -> Self { self.multiple = m; self }
}

impl Default for FileUpload {
    fn default() -> Self { Self::new() }
}
