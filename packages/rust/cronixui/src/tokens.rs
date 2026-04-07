//! Design tokens for CronixUI

use egui::{vec2, Rounding};

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

pub const FONT_FAMILY: &str = "Outfit";
pub const FONT_MONO: &str = "JetBrains Mono";

pub const FONT_SIZE_XS: f32 = 11.0;
pub const FONT_SIZE_SM: f32 = 12.0;
pub const FONT_SIZE_BASE: f32 = 13.0;
pub const FONT_SIZE_MD: f32 = 14.0;
pub const FONT_SIZE_LG: f32 = 16.0;
pub const FONT_SIZE_XL: f32 = 20.0;
pub const FONT_SIZE_2XL: f32 = 28.0;
pub const FONT_SIZE_3XL: f32 = 36.0;

// =============================================================================
// SPACING TOKENS
// =============================================================================

pub const SPACE_1: f32 = 4.0;
pub const SPACE_2: f32 = 8.0;
pub const SPACE_3: f32 = 12.0;
pub const SPACE_4: f32 = 16.0;
pub const SPACE_5: f32 = 20.0;
pub const SPACE_6: f32 = 24.0;
pub const SPACE_8: f32 = 32.0;
pub const SPACE_10: f32 = 40.0;
pub const SPACE_12: f32 = 48.0;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

pub const RADIUS_SM: f32 = 6.0;
pub const RADIUS: f32 = 10.0;
pub const RADIUS_LG: f32 = 14.0;
pub const RADIUS_XL: f32 = 20.0;
pub const RADIUS_FULL: f32 = 9999.0;

/// Get rounded corners
pub fn rounded() -> Rounding {
    Rounding::same(RADIUS)
}

pub fn rounded_sm() -> Rounding {
    Rounding::same(RADIUS_SM)
}

pub fn rounded_lg() -> Rounding {
    Rounding::same(RADIUS_LG)
}

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

pub const Z_INDEX_DROPDOWN: f32 = 100.0;
pub const Z_INDEX_STICKY: f32 = 200.0;
pub const Z_INDEX_FIXED: f32 = 300.0;
pub const Z_INDEX_MODAL_BACKDROP: f32 = 400.0;
pub const Z_INDEX_MODAL: f32 = 500.0;
pub const Z_INDEX_POPOVER: f32 = 600.0;
pub const Z_INDEX_TOOLTIP: f32 = 700.0;
pub const Z_INDEX_TOAST: f32 = 800.0;

// =============================================================================
// LAYOUT TOKENS
// =============================================================================

pub const CONTAINER_MAX: f32 = 1200.0;
pub const SIDEBAR_WIDTH: f32 = 260.0;
pub const HEADER_HEIGHT: f32 = 60.0;

// =============================================================================
// SHADOW TOKENS (as string descriptions)
// =============================================================================

pub const SHADOW_SM: &str = "0 1px 2px rgba(0, 0, 0, 0.3)";
pub const SHADOW: &str = "0 4px 12px rgba(0, 0, 0, 0.4)";
pub const SHADOW_LG: &str = "0 8px 24px rgba(0, 0, 0, 0.5)";

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

pub const TRANSITION_FAST: f32 = 0.1;
pub const TRANSITION: f32 = 0.15;
pub const TRANSITION_SLOW: f32 = 0.25;

// =============================================================================
// CONTAINER SIZES
// =============================================================================

pub const CONTAINER_SM: f32 = 640.0;
pub const CONTAINER_MD: f32 = 900.0;
pub const CONTAINER_LG: f32 = 1200.0;
pub const CONTAINER_XL: f32 = 1400.0;

/// Get container padding
pub fn container_padding() -> vec2 {
    vec2(SPACE_6, SPACE_6)
}
