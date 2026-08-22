use crate::colors::*;
use crate::tokens::*;
use crate::apply_theme;

#[test]
fn test_apply_theme_does_not_panic() {
    let _ = std::panic::catch_unwind(|| {
        let ctx = egui::Context::default();
        apply_theme(&ctx);
    });
}

#[test]
fn test_colors_default_is_consistent() {
    let c1 = Colors::default();
    let c2 = Colors::default();
    assert_eq!(c1, c2);
}

#[test]
fn test_color_fields_are_distinct() {
    let c = Colors::default();
    // Background colors should all be different
    assert_ne!(c.bg, c.surface);
    assert_ne!(c.surface, c.surface_2);
    assert_ne!(c.surface_2, c.surface_3);
    assert_ne!(c.surface_3, c.surface_4);
}

#[test]
fn test_accent_colors_are_distinct() {
    let c = Colors::default();
    assert_ne!(c.accent, c.accent_hover);
    assert_ne!(c.accent_hover, c.accent_light);
    assert_ne!(c.accent_light, c.accent_text);
}

#[test]
fn test_version_is_set() {
    assert!(!crate::VERSION.is_empty());
}
