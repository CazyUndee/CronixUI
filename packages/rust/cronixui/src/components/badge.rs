//! Badge component

use crate::colors::*;
use egui::Color32;

pub enum BadgeVariant {
    Default,
    Accent,
    Success,
    Warning,
    Error,
    Info,
}

pub fn badge_color(variant: BadgeVariant) -> Color32 {
    match variant {
        BadgeVariant::Default => SURFACE_2,
        BadgeVariant::Accent => ACCENT,
        BadgeVariant::Success => SUCCESS,
        BadgeVariant::Warning => WARNING,
        BadgeVariant::Error => ERROR,
        BadgeVariant::Info => INFO,
    }
}

pub fn badge_text_color(variant: BadgeVariant) -> Color32 {
    match variant {
        BadgeVariant::Default => TEXT_MUTED,
        BadgeVariant::Accent => ACCENT_TEXT,
        BadgeVariant::Success => SUCCESS_TEXT,
        BadgeVariant::Warning => WARNING_TEXT,
        BadgeVariant::Error => ERROR_TEXT,
        BadgeVariant::Info => INFO_TEXT,
    }
}
