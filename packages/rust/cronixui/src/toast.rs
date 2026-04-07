use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ToastType {
    Success,
    Error,
    Warning,
    Info,
}

impl fmt::Display for ToastType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ToastType::Success => write!(f, "success"),
            ToastType::Error => write!(f, "error"),
            ToastType::Warning => write!(f, "warning"),
            ToastType::Info => write!(f, "info"),
        }
    }
}

#[derive(Debug, Clone)]
pub struct Toast {
    pub title: Option<String>,
    pub message: String,
    pub toast_type: ToastType,
    pub duration: u32,
}

impl Toast {
    pub fn show(message: impl Into<String>) -> Self {
        Self {
            title: None,
            message: message.into(),
            toast_type: ToastType::Info,
            duration: 4000,
        }
    }

    pub fn title(mut self, title: impl Into<String>) -> Self {
        self.title = Some(title.into());
        self
    }

    pub fn toast_type(mut self, toast_type: ToastType) -> Self {
        self.toast_type = toast_type;
        self
    }

    pub fn duration(mut self, duration: u32) -> Self {
        self.duration = duration;
        self
    }

    pub fn success(message: impl Into<String>) -> Self {
        Self::show(message).toast_type(ToastType::Success)
    }

    pub fn error(message: impl Into<String>) -> Self {
        Self::show(message).toast_type(ToastType::Error)
    }

    pub fn warning(message: impl Into<String>) -> Self {
        Self::show(message).toast_type(ToastType::Warning)
    }

    pub fn info(message: impl Into<String>) -> Self {
        Self::show(message).toast_type(ToastType::Info)
    }
}
