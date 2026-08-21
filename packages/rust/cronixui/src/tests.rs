//! CronixUI theme and token tests

use crate::{Colors, VERSION};

#[test]
fn version_is_set() {
    assert_eq!(VERSION, "1.0.6");
}

#[test]
fn colors_default_has_correct_values() {
    let c = Colors::default();
    // BG should be very dark (r=10, g=10, b=10)
    assert!(c.bg.r() < 26);
    assert!(c.bg.g() < 26);
    assert!(c.bg.b() < 26);
    // Text should be light (r=240, g=237, b=232)
    assert!(c.text.r() > 200);
    assert!(c.text.g() > 200);
    assert!(c.text.b() > 200);
    // Accent should be crimson-ish (r=107, g=35, b=35)
    assert!(c.accent.r() > 80);
    assert!(c.accent.g() < 60);
    assert!(c.accent.b() < 60);
}

#[test]
fn colors_success_is_green_tinted() {
    let c = Colors::default();
    // success = rgb(30, 80, 40)
    assert!(c.success.g() > c.success.r());
    assert!(c.success.g() > c.success.b());
}

#[test]
fn colors_warning_is_yellow_tinted() {
    let c = Colors::default();
    // warning = rgb(80, 60, 20)
    assert!(c.warning.r() > c.warning.b());
    assert!(c.warning.g() > c.warning.b());
}

#[test]
fn colors_error_is_red_tinted() {
    let c = Colors::default();
    // error = rgb(80, 20, 20)
    assert!(c.error.r() > c.error.g());
    assert!(c.error.r() > c.error.b());
}

#[test]
fn colors_info_is_blue_tinted() {
    let c = Colors::default();
    // info = rgb(20, 53, 80)
    assert!(c.info.b() > c.info.r());
    assert!(c.info.b() > c.info.g());
}

#[test]
fn colors_border_is_semi_transparent() {
    let c = Colors::default();
    // border = rgba(255, 255, 255, 20)
    assert!(c.border.a() < 255);
    assert!(c.border.a() > 0);
}

#[test]
fn spacing_constants_are_positive() {
    assert!(crate::SPACE_1 > 0.0);
    assert!(crate::SPACE_2 > 0.0);
    assert!(crate::SPACE_3 > 0.0);
    assert!(crate::SPACE_4 > 0.0);
    assert!(crate::SPACE_6 > 0.0);
    assert!(crate::SPACE_8 > 0.0);
    assert!(crate::SPACE_12 > 0.0);
}

#[test]
fn spacing_constants_are_monotonically_increasing() {
    assert!(crate::SPACE_1 < crate::SPACE_2);
    assert!(crate::SPACE_2 < crate::SPACE_3);
    assert!(crate::SPACE_3 < crate::SPACE_4);
    assert!(crate::SPACE_4 < crate::SPACE_6);
    assert!(crate::SPACE_6 < crate::SPACE_8);
    assert!(crate::SPACE_8 < crate::SPACE_12);
}

#[test]
fn radius_constants_are_positive() {
    assert!(crate::RADIUS_SM > 0.0);
    assert!(crate::RADIUS > 0.0);
    assert!(crate::RADIUS_LG > 0.0);
    assert!(crate::RADIUS_XL > 0.0);
    assert!(crate::RADIUS_FULL > 0.0);
}

#[test]
fn radius_constants_are_monotonically_increasing() {
    assert!(crate::RADIUS_SM < crate::RADIUS);
    assert!(crate::RADIUS < crate::RADIUS_LG);
    assert!(crate::RADIUS_LG < crate::RADIUS_XL);
    assert!(crate::RADIUS_XL < crate::RADIUS_FULL);
}

#[test]
fn font_size_constants_are_positive() {
    assert!(crate::FONT_SIZE_XS > 0.0);
    assert!(crate::FONT_SIZE_SM > 0.0);
    assert!(crate::FONT_SIZE_BASE > 0.0);
    assert!(crate::FONT_SIZE_LG > 0.0);
    assert!(crate::FONT_SIZE_XL > 0.0);
    assert!(crate::FONT_SIZE_2XL > 0.0);
    assert!(crate::FONT_SIZE_3XL > 0.0);
}

#[test]
fn font_size_constants_are_monotonically_increasing() {
    assert!(crate::FONT_SIZE_XS < crate::FONT_SIZE_SM);
    assert!(crate::FONT_SIZE_SM < crate::FONT_SIZE_BASE);
    assert!(crate::FONT_SIZE_BASE < crate::FONT_SIZE_LG);
    assert!(crate::FONT_SIZE_LG < crate::FONT_SIZE_XL);
    assert!(crate::FONT_SIZE_XL < crate::FONT_SIZE_2XL);
    assert!(crate::FONT_SIZE_2XL < crate::FONT_SIZE_3XL);
}

#[test]
fn z_index_constants_are_positive() {
    assert!(crate::Z_INDEX_DROPDOWN > 0.0);
    assert!(crate::Z_INDEX_STICKY > 0.0);
    assert!(crate::Z_INDEX_FIXED > 0.0);
    assert!(crate::Z_INDEX_MODAL_BACKDROP > 0.0);
    assert!(crate::Z_INDEX_MODAL > 0.0);
    assert!(crate::Z_INDEX_POPOVER > 0.0);
    assert!(crate::Z_INDEX_TOOLTIP > 0.0);
    assert!(crate::Z_INDEX_TOAST > 0.0);
}

#[test]
fn z_index_constants_are_monotonically_increasing() {
    assert!(crate::Z_INDEX_DROPDOWN < crate::Z_INDEX_STICKY);
    assert!(crate::Z_INDEX_STICKY < crate::Z_INDEX_FIXED);
    assert!(crate::Z_INDEX_FIXED < crate::Z_INDEX_MODAL_BACKDROP);
    assert!(crate::Z_INDEX_MODAL_BACKDROP < crate::Z_INDEX_MODAL);
    assert!(crate::Z_INDEX_MODAL < crate::Z_INDEX_POPOVER);
    assert!(crate::Z_INDEX_POPOVER < crate::Z_INDEX_TOOLTIP);
    assert!(crate::Z_INDEX_TOOLTIP < crate::Z_INDEX_TOAST);
}

#[test]
fn color_constants_match_struct_values() {
    let c = Colors::default();
    assert_eq!(c.bg, crate::BG);
    assert_eq!(c.surface, crate::SURFACE);
    assert_eq!(c.text, crate::TEXT);
    assert_eq!(c.accent, crate::ACCENT);
    assert_eq!(c.border, crate::BORDER);
}
