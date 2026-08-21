#[cfg(test)]
mod tests {
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

    #[test]
    fn test_colors_bg_is_dark() {
        let c = Colors::default();
        assert!(c.bg.r() < 26);
        assert!(c.bg.g() < 26);
        assert!(c.bg.b() < 26);
    }

    #[test]
    fn test_colors_text_is_light() {
        let c = Colors::default();
        assert!(c.text.r() > 200);
        assert!(c.text.g() > 200);
        assert!(c.text.b() > 200);
    }

    #[test]
    fn test_colors_accent_is_crimson() {
        let c = Colors::default();
        assert!(c.accent.r() > 80);
        assert!(c.accent.g() < 60);
        assert!(c.accent.b() < 60);
    }

    #[test]
    fn test_colors_success_is_green_tinted() {
        let c = Colors::default();
        assert!(c.success.g() > c.success.r());
        assert!(c.success.g() > c.success.b());
    }

    #[test]
    fn test_colors_warning_is_yellow_tinted() {
        let c = Colors::default();
        assert!(c.warning.r() > c.warning.b());
        assert!(c.warning.g() > c.warning.b());
    }

    #[test]
    fn test_colors_error_is_red_tinted() {
        let c = Colors::default();
        assert!(c.error.r() > c.error.g());
        assert!(c.error.r() > c.error.b());
    }

    #[test]
    fn test_colors_info_is_blue_tinted() {
        let c = Colors::default();
        assert!(c.info.b() > c.info.r());
        assert!(c.info.b() > c.info.g());
    }

    #[test]
    fn test_colors_border_is_semi_transparent() {
        let c = Colors::default();
        assert!(c.border.a() < 255);
        assert!(c.border.a() > 0);
    }

    #[test]
    fn test_spacing_constants_are_monotonic() {
        assert!(tokens::SPACE_1 < tokens::SPACE_2);
        assert!(tokens::SPACE_2 < tokens::SPACE_3);
        assert!(tokens::SPACE_3 < tokens::SPACE_4);
        assert!(tokens::SPACE_4 < tokens::SPACE_6);
        assert!(tokens::SPACE_6 < tokens::SPACE_8);
        assert!(tokens::SPACE_8 < tokens::SPACE_12);
    }

    #[test]
    fn test_radius_constants_are_monotonic() {
        assert!(tokens::RADIUS_SM < tokens::RADIUS);
        assert!(tokens::RADIUS < tokens::RADIUS_LG);
        assert!(tokens::RADIUS_LG < tokens::RADIUS_XL);
        assert!(tokens::RADIUS_XL < tokens::RADIUS_FULL);
    }

    #[test]
    fn test_font_size_constants_are_monotonic() {
        assert!(tokens::FONT_SIZE_XS < tokens::FONT_SIZE_SM);
        assert!(tokens::FONT_SIZE_SM < tokens::FONT_SIZE_BASE);
        assert!(tokens::FONT_SIZE_BASE < tokens::FONT_SIZE_LG);
        assert!(tokens::FONT_SIZE_LG < tokens::FONT_SIZE_XL);
        assert!(tokens::FONT_SIZE_XL < tokens::FONT_SIZE_2XL);
        assert!(tokens::FONT_SIZE_2XL < tokens::FONT_SIZE_3XL);
    }

    #[test]
    fn test_z_index_constants_are_monotonic() {
        assert!(tokens::Z_INDEX_DROPDOWN < tokens::Z_INDEX_STICKY);
        assert!(tokens::Z_INDEX_STICKY < tokens::Z_INDEX_FIXED);
        assert!(tokens::Z_INDEX_FIXED < tokens::Z_INDEX_MODAL_BACKDROP);
        assert!(tokens::Z_INDEX_MODAL_BACKDROP < tokens::Z_INDEX_MODAL);
        assert!(tokens::Z_INDEX_MODAL < tokens::Z_INDEX_POPOVER);
        assert!(tokens::Z_INDEX_POPOVER < tokens::Z_INDEX_TOOLTIP);
        assert!(tokens::Z_INDEX_TOOLTIP < tokens::Z_INDEX_TOAST);
    }

    #[test]
    fn test_color_constants_match_struct() {
        let c = Colors::default();
        // Only test opaque colors (unmultiplied and premultiplied are the same)
        assert_eq!(c.bg, crate::colors::BG);
        assert_eq!(c.surface, crate::colors::SURFACE);
        assert_eq!(c.text, crate::colors::TEXT);
        assert_eq!(c.accent, crate::colors::ACCENT);
    }
}
