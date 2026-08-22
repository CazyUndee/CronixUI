use crate::colors::*;
use egui::Color32;

#[test]
fn test_default_colors_bg() {
    let c = Colors::default();
    assert_eq!(c.bg, Color32::from_rgb(10, 10, 10));
}

#[test]
fn test_default_colors_surface() {
    let c = Colors::default();
    assert_eq!(c.surface, Color32::from_rgb(17, 17, 17));
    assert_eq!(c.surface_2, Color32::from_rgb(26, 26, 26));
    assert_eq!(c.surface_3, Color32::from_rgb(34, 34, 34));
    assert_eq!(c.surface_4, Color32::from_rgb(42, 42, 42));
}

#[test]
fn test_default_colors_text() {
    let c = Colors::default();
    assert_eq!(c.text, Color32::from_rgb(240, 237, 232));
}

#[test]
fn test_default_colors_accent() {
    let c = Colors::default();
    assert_eq!(c.accent, Color32::from_rgb(107, 35, 35));
    assert_eq!(c.accent_hover, Color32::from_rgb(125, 42, 42));
    assert_eq!(c.accent_light, Color32::from_rgb(138, 53, 53));
    assert_eq!(c.accent_text, Color32::from_rgb(201, 122, 122));
}

#[test]
fn test_default_colors_semantic() {
    let c = Colors::default();
    assert_eq!(c.success, Color32::from_rgb(30, 80, 40));
    assert_eq!(c.success_text, Color32::from_rgb(107, 196, 122));
    assert_eq!(c.warning, Color32::from_rgb(80, 60, 20));
    assert_eq!(c.warning_text, Color32::from_rgb(196, 164, 58));
    assert_eq!(c.error, Color32::from_rgb(80, 20, 20));
    assert_eq!(c.error_text, Color32::from_rgb(196, 107, 107));
    assert_eq!(c.info, Color32::from_rgb(20, 53, 80));
    assert_eq!(c.info_text, Color32::from_rgb(107, 168, 196));
}

#[test]
fn test_default_colors_border() {
    let c = Colors::default();
    assert_eq!(c.border, Color32::from_rgba_unmultiplied(255, 255, 255, 20));
    assert_eq!(c.border_hover, Color32::from_rgba_unmultiplied(255, 255, 255, 38));
    assert_eq!(c.border_focus, Color32::from_rgba_unmultiplied(255, 255, 255, 64));
}

#[test]
fn test_color_constants_match_struct() {
    let c = Colors::default();
    // For fully opaque colors, constants should match struct
    assert_eq!(BG, c.bg);
    assert_eq!(SURFACE, c.surface);
    assert_eq!(TEXT, c.text);
    assert_eq!(ACCENT, c.accent);
    assert_eq!(SUCCESS, c.success);
    assert_eq!(WARNING, c.warning);
    assert_eq!(ERROR, c.error);
    assert_eq!(INFO, c.info);
}

#[test]
fn test_surface_is_darker_than_bg() {
    let c = Colors::default();
    let bg_luma = (c.bg.r() as f32 * 0.299 + c.bg.g() as f32 * 0.587 + c.bg.b() as f32 * 0.114) as u8;
    let s_luma = (c.surface.r() as f32 * 0.299 + c.surface.g() as f32 * 0.587 + c.surface.b() as f32 * 0.114) as u8;
    assert!(s_luma > bg_luma, "surface should be lighter than bg");
}

#[test]
fn test_surface_hierarchy_monotonic() {
    let c = Colors::default();
    let luma = |col: Color32| -> u8 {
        (col.r() as f32 * 0.299 + col.g() as f32 * 0.587 + col.b() as f32 * 0.114) as u8
    };
    assert!(luma(c.bg) < luma(c.surface));
    assert!(luma(c.surface) < luma(c.surface_2));
    assert!(luma(c.surface_2) < luma(c.surface_3));
    assert!(luma(c.surface_3) < luma(c.surface_4));
}

#[test]
fn test_accent_hover_is_lighter_than_accent() {
    let c = Colors::default();
    let luma = |col: Color32| -> f32 {
        col.r() as f32 * 0.299 + col.g() as f32 * 0.587 + col.b() as f32 * 0.114
    };
    assert!(luma(c.accent_hover) > luma(c.accent));
}

#[test]
fn test_error_and_warning_are_distinct() {
    let c = Colors::default();
    assert_ne!(c.error, c.warning);
    assert_ne!(c.error_text, c.warning_text);
}

#[test]
fn test_info_and_success_are_distinct() {
    let c = Colors::default();
    assert_ne!(c.info, c.success);
    assert_ne!(c.info_text, c.success_text);
}
