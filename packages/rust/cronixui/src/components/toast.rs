//! Toast notifications

use crate::colors::*;
use egui::Color32;

pub enum ToastType {
    Success,
    Error,
    Warning,
    Info,
}

pub struct Toast {
    pub message: String,
    pub toast_type: ToastType,
    pub duration: f32,
}

impl Toast {
    pub fn success(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
            toast_type: ToastType::Success,
            duration: 3.0,
        }
    }

    pub fn error(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
            toast_type: ToastType::Error,
            duration: 3.0,
        }
    }

    pub fn warning(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
            toast_type: ToastType::Warning,
            duration: 3.0,
        }
    }

    pub fn info(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
            toast_type: ToastType::Info,
            duration: 3.0,
        }
    }

    pub fn color(&self) -> Color32 {
        match self.toast_type {
            ToastType::Success => SUCCESS,
            ToastType::Error => ERROR,
            ToastType::Warning => WARNING,
            ToastType::Info => INFO,
        }
    }

    pub fn prefix(&self) -> &'static str {
        match self.toast_type {
            ToastType::Success => "✓ ",
            ToastType::Error => "✕ ",
            ToastType::Warning => "⚠ ",
            ToastType::Info => "ℹ ",
        }
    }
}
