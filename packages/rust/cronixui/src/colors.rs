//! Color tokens for CronixUI

use egui::Color32;

/// All colors extracted from CSS variables
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Colors {
    // Background
    pub bg: Color32,
    pub surface: Color32,
    pub surface_2: Color32,
    pub surface_3: Color32,
    pub surface_4: Color32,

    // Text
    pub text: Color32,
    pub text_muted: Color32,
    pub text_dim: Color32,

    // Accent (Crimson)
    pub accent: Color32,
    pub accent_hover: Color32,
    pub accent_light: Color32,
    pub accent_text: Color32,

    // Semantic - Success
    pub success: Color32,
    pub success_border: Color32,
    pub success_text: Color32,

    // Semantic - Warning
    pub warning: Color32,
    pub warning_border: Color32,
    pub warning_text: Color32,

    // Semantic - Error
    pub error: Color32,
    pub error_border: Color32,
    pub error_text: Color32,

    // Semantic - Info
    pub info: Color32,
    pub info_border: Color32,
    pub info_text: Color32,

    // Border
    pub border: Color32,
    pub border_hover: Color32,
    pub border_focus: Color32,
}

impl Default for Colors {
    fn default() -> Self {
        Self {
            // Background
            bg: Color32::from_rgb(10, 10, 10),
            surface: Color32::from_rgb(17, 17, 17),
            surface_2: Color32::from_rgb(26, 26, 26),
            surface_3: Color32::from_rgb(34, 34, 34),
            surface_4: Color32::from_rgb(42, 42, 42),

            // Text
            text: Color32::from_rgb(240, 237, 232),
            text_muted: Color32::from_rgba_unmultiplied(240, 237, 232, 128),
            text_dim: Color32::from_rgba_unmultiplied(240, 237, 232, 64),

            // Accent
            accent: Color32::from_rgb(107, 35, 35),
            accent_hover: Color32::from_rgb(125, 42, 42),
            accent_light: Color32::from_rgb(138, 53, 53),
            accent_text: Color32::from_rgb(201, 122, 122),

            // Success
            success: Color32::from_rgb(30, 80, 40),
            success_border: Color32::from_rgba_unmultiplied(60, 140, 70, 102),
            success_text: Color32::from_rgb(107, 196, 122),

            // Warning
            warning: Color32::from_rgb(80, 60, 20),
            warning_border: Color32::from_rgba_unmultiplied(150, 110, 30, 102),
            warning_text: Color32::from_rgb(196, 164, 58),

            // Error
            error: Color32::from_rgb(80, 20, 20),
            error_border: Color32::from_rgba_unmultiplied(180, 60, 60, 102),
            error_text: Color32::from_rgb(196, 107, 107),

            // Info
            info: Color32::from_rgb(20, 53, 80),
            info_border: Color32::from_rgba_unmultiplied(60, 140, 200, 102),
            info_text: Color32::from_rgb(107, 168, 196),

            // Border
            border: Color32::from_rgba_unmultiplied(255, 255, 255, 20),
            border_hover: Color32::from_rgba_unmultiplied(255, 255, 255, 38),
            border_focus: Color32::from_rgba_unmultiplied(255, 255, 255, 64),
        }
    }
}

// Background color constants
pub const BG: Color32 = Color32::from_rgb(10, 10, 10);
pub const SURFACE: Color32 = Color32::from_rgb(17, 17, 17);
pub const SURFACE_2: Color32 = Color32::from_rgb(26, 26, 26);
pub const SURFACE_3: Color32 = Color32::from_rgb(34, 34, 34);
pub const SURFACE_4: Color32 = Color32::from_rgb(42, 42, 42);

// Text color constants
pub const TEXT: Color32 = Color32::from_rgb(240, 237, 232);
pub const TEXT_MUTED: Color32 = Color32::from_rgba_unmultiplied(240, 237, 232, 128);
pub const TEXT_DIM: Color32 = Color32::from_rgba_unmultiplied(240, 237, 232, 64);

// Accent color constants
pub const ACCENT: Color32 = Color32::from_rgb(107, 35, 35);
pub const ACCENT_HOVER: Color32 = Color32::from_rgb(125, 42, 42);
pub const ACCENT_LIGHT: Color32 = Color32::from_rgb(138, 53, 53);
pub const ACCENT_TEXT: Color32 = Color32::from_rgb(201, 122, 122);

// Semantic color constants
pub const SUCCESS: Color32 = Color32::from_rgb(30, 80, 40);
pub const SUCCESS_TEXT: Color32 = Color32::from_rgb(107, 196, 122);

pub const WARNING: Color32 = Color32::from_rgb(80, 60, 20);
pub const WARNING_TEXT: Color32 = Color32::from_rgb(196, 164, 58);

pub const ERROR: Color32 = Color32::from_rgb(80, 20, 20);
pub const ERROR_TEXT: Color32 = Color32::from_rgb(196, 107, 107);

pub const INFO: Color32 = Color32::from_rgb(20, 53, 80);
pub const INFO_TEXT: Color32 = Color32::from_rgb(107, 168, 196);

// Border color constants
pub const BORDER: Color32 = Color32::from_rgba_unmultiplied(255, 255, 255, 20);
pub const BORDER_HOVER: Color32 = Color32::from_rgba_unmultiplied(255, 255, 255, 38);
pub const BORDER_FOCUS: Color32 = Color32::from_rgba_unmultiplied(255, 255, 255, 64);
