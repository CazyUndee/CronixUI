//! Alert component

use crate::colors::*;
use egui::Color32;

pub enum AlertVariant {
    Info,
    Success,
    Warning,
    Error,
}

impl AlertVariant {
    pub fn bg_color(&self) -> Color32 {
        match self {
            AlertVariant::Info => INFO,
            AlertVariant::Success => SUCCESS,
            AlertVariant::Warning => WARNING,
            AlertVariant::Error => ERROR,
        }
    }

    pub fn border_color(&self) -> Color32 {
        match self {
            AlertVariant::Info => INFO_TEXT,
            AlertVariant::Success => SUCCESS_TEXT,
            AlertVariant::Warning => WARNING_TEXT,
            AlertVariant::Error => ERROR_TEXT,
        }
    }

    pub fn icon(&self) -> &'static str {
        match self {
            AlertVariant::Info => "ℹ",
            AlertVariant::Success => "✓",
            AlertVariant::Warning => "⚠",
            AlertVariant::Error => "✕",
        }
    }
}

pub struct Alert {
    pub title: Option<String>,
    pub message: String,
    pub variant: AlertVariant,
    pub dismissible: bool,
}

impl Alert {
    pub fn info(message: impl Into<String>) -> Self {
        Self {
            title: None,
            message: message.into(),
            variant: AlertVariant::Info,
            dismissible: false,
        }
    }

    pub fn success(message: impl Into<String>) -> Self {
        Self {
            title: None,
            message: message.into(),
            variant: AlertVariant::Success,
            dismissible: false,
        }
    }

    pub fn warning(message: impl Into<String>) -> Self {
        Self {
            title: None,
            message: message.into(),
            variant: AlertVariant::Warning,
            dismissible: false,
        }
    }

    pub fn error(message: impl Into<String>) -> Self {
        Self {
            title: None,
            message: message.into(),
            variant: AlertVariant::Error,
            dismissible: false,
        }
    }

    pub fn title(mut self, title: impl Into<String>) -> Self {
        self.title = Some(title.into());
        self
    }

    pub fn dismissible(mut self) -> Self {
        self.dismissible = true;
        self
    }
}
