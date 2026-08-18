#[cfg(test)]
use crate::colors::Colors;
use crate::tokens;
use crate::VERSION;

#[test]
fn test_version() {
    assert_eq!(VERSION, "1.0.6");
}

#[test]
fn test_colors_default() {
    let colors = Colors::default();
    // Verify accent color is crimson
    assert_eq!(colors.accent, crate::colors::ACCENT);
    assert_eq!(colors.text, crate::colors::TEXT);
}

#[test]
fn test_tokens() {
    assert!(tokens::SPACE_2 > 0.0);
    assert!(tokens::RADIUS > 0.0);
    assert!(tokens::FONT_SIZE_BASE > 0.0);
    let padding = tokens::container_padding();
    assert!(padding.x > 0.0);
    assert!(padding.y > 0.0);
}
