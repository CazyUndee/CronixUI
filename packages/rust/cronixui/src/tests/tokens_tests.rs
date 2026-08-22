use crate::tokens::*;
use egui::Vec2;

#[test]
fn test_font_size_monotonic() {
    assert!(FONT_SIZE_XS < FONT_SIZE_SM);
    assert!(FONT_SIZE_SM < FONT_SIZE_BASE);
    assert!(FONT_SIZE_BASE < FONT_SIZE_MD);
    assert!(FONT_SIZE_MD < FONT_SIZE_LG);
    assert!(FONT_SIZE_LG < FONT_SIZE_XL);
    assert!(FONT_SIZE_XL < FONT_SIZE_2XL);
    assert!(FONT_SIZE_2XL < FONT_SIZE_3XL);
}

#[test]
fn test_spacing_monotonic() {
    assert!(SPACE_1 < SPACE_2);
    assert!(SPACE_2 < SPACE_3);
    assert!(SPACE_3 < SPACE_4);
    assert!(SPACE_4 < SPACE_5);
    assert!(SPACE_5 < SPACE_6);
    assert!(SPACE_6 < SPACE_8);
    assert!(SPACE_8 < SPACE_10);
    assert!(SPACE_10 < SPACE_12);
}

#[test]
fn test_spacing_values() {
    assert_eq!(SPACE_1, 4.0);
    assert_eq!(SPACE_2, 8.0);
    assert_eq!(SPACE_4, 16.0);
    assert_eq!(SPACE_6, 24.0);
}

#[test]
fn test_radius_monotonic() {
    assert!(RADIUS_SM < RADIUS);
    assert!(RADIUS < RADIUS_LG);
    assert!(RADIUS_LG < RADIUS_XL);
    assert!(RADIUS_XL < RADIUS_FULL);
}

#[test]
fn test_radius_values() {
    assert_eq!(RADIUS_SM, 6.0);
    assert_eq!(RADIUS, 10.0);
    assert_eq!(RADIUS_LG, 14.0);
    assert_eq!(RADIUS_XL, 20.0);
    assert_eq!(RADIUS_FULL, 9999.0);
}

#[test]
fn test_z_index_monotonic() {
    assert!(Z_INDEX_DROPDOWN < Z_INDEX_STICKY);
    assert!(Z_INDEX_STICKY < Z_INDEX_FIXED);
    assert!(Z_INDEX_FIXED < Z_INDEX_MODAL_BACKDROP);
    assert!(Z_INDEX_MODAL_BACKDROP < Z_INDEX_MODAL);
    assert!(Z_INDEX_MODAL < Z_INDEX_POPOVER);
    assert!(Z_INDEX_POPOVER < Z_INDEX_TOOLTIP);
    assert!(Z_INDEX_TOOLTIP < Z_INDEX_TOAST);
}

#[test]
fn test_transition_monotonic() {
    assert!(TRANSITION_FAST < TRANSITION);
    assert!(TRANSITION < TRANSITION_SLOW);
}

#[test]
fn test_container_sizes_monotonic() {
    assert!(CONTAINER_SM < CONTAINER_MD);
    assert!(CONTAINER_MD < CONTAINER_LG);
    assert!(CONTAINER_LG < CONTAINER_XL);
}

#[test]
fn test_container_sizes_values() {
    assert_eq!(CONTAINER_SM, 640.0);
    assert_eq!(CONTAINER_MD, 900.0);
    assert_eq!(CONTAINER_LG, 1200.0);
    assert_eq!(CONTAINER_XL, 1400.0);
}

#[test]
fn test_rounded_functions() {
    let r = rounded();
    assert_eq!(r.nw, RADIUS as u32);
    assert_eq!(r.ne, RADIUS as u32);
    assert_eq!(r.sw, RADIUS as u32);
    assert_eq!(r.se, RADIUS as u32);
}

#[test]
fn test_rounded_sm_functions() {
    let r = rounded_sm();
    assert_eq!(r.nw, RADIUS_SM as u32);
}

#[test]
fn test_rounded_lg_functions() {
    let r = rounded_lg();
    assert_eq!(r.nw, RADIUS_LG as u32);
}

#[test]
fn test_container_padding() {
    let p = container_padding();
    assert_eq!(p.x, SPACE_6);
    assert_eq!(p.y, SPACE_6);
}

#[test]
fn test_layout_tokens() {
    assert_eq!(CONTAINER_MAX, 1200.0);
    assert_eq!(SIDEBAR_WIDTH, 260.0);
    assert_eq!(HEADER_HEIGHT, 60.0);
}

#[test]
fn test_shadow_tokens_are_nonempty() {
    assert!(!SHADOW_SM.is_empty());
    assert!(!SHADOW.is_empty());
    assert!(!SHADOW_LG.is_empty());
}

#[test]
fn test_font_tokens_are_nonempty() {
    assert!(!FONT_FAMILY.is_empty());
    assert!(!FONT_MONO.is_empty());
    assert_eq!(FONT_FAMILY, "Outfit");
    assert_eq!(FONT_MONO, "JetBrains Mono");
}

#[test]
fn test_spacing_values_exact() {
    assert_eq!(SPACE_1, 4.0);
    assert_eq!(SPACE_2, 8.0);
    assert_eq!(SPACE_3, 12.0);
    assert_eq!(SPACE_5, 20.0);
    assert_eq!(SPACE_6, 24.0);
    assert_eq!(SPACE_8, 32.0);
    assert_eq!(SPACE_10, 40.0);
    assert_eq!(SPACE_12, 48.0);
}

#[test]
fn test_font_sizes_exact() {
    assert_eq!(FONT_SIZE_XS, 11.0);
    assert_eq!(FONT_SIZE_SM, 12.0);
    assert_eq!(FONT_SIZE_BASE, 13.0);
    assert_eq!(FONT_SIZE_MD, 14.0);
    assert_eq!(FONT_SIZE_LG, 16.0);
    assert_eq!(FONT_SIZE_XL, 20.0);
    assert_eq!(FONT_SIZE_2XL, 28.0);
    assert_eq!(FONT_SIZE_3XL, 36.0);
}
