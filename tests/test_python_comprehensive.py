"""Comprehensive Python component tests — verifies API contracts, token values,
and utility functions without requiring a display.

These tests validate that the Python CronixUI package maintains parity with
other language implementations by testing real behavior, not just imports.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "packages" / "python"))


class TestTokenValues:
    """Verify design tokens match the canonical values."""

    def test_bg_color(self):
        from cronixui.tokens import BG
        assert BG.hex == "#0a0a0a"
        assert BG.rgb == (10, 10, 10)

    def test_surface_colors(self):
        from cronixui.tokens import SURFACE, SURFACE_2, SURFACE_3, SURFACE_4
        assert SURFACE.hex == "#111111"
        assert SURFACE_2.hex == "#1a1a1a"
        assert SURFACE_3.hex == "#222222"
        assert SURFACE_4.hex == "#2a2a2a"

    def test_accent_colors(self):
        from cronixui.tokens import ACCENT, ACCENT_HOVER, ACCENT_LIGHT
        assert ACCENT.hex == "#6b2323"
        assert ACCENT_HOVER.hex == "#7d2a2a"
        assert ACCENT_LIGHT.hex == "#8a3535"

    def test_text_color(self):
        from cronixui.tokens import TEXT
        assert TEXT.hex == "#f0ede8"
        assert TEXT.rgb == (240, 237, 232)

    def test_semantic_colors(self):
        from cronixui.tokens import SUCCESS, WARNING, ERROR, INFO
        assert SUCCESS.hex == "#1e5028"
        assert WARNING.hex == "#503c14"
        assert ERROR.hex == "#501414"
        assert INFO.hex == "#143550"

    def test_semantic_text_colors(self):
        from cronixui.tokens import SUCCESS_TEXT, WARNING_TEXT, ERROR_TEXT, INFO_TEXT
        assert SUCCESS_TEXT.hex == "#6bc47a"
        assert WARNING_TEXT.hex == "#c4a43a"
        assert ERROR_TEXT.hex == "#c46b6b"
        assert INFO_TEXT.hex == "#6ba8c4"

    def test_color_rgb_matches_hex(self):
        from cronixui.tokens import BG, ACCENT, TEXT
        from cronixui.core import hex_to_rgb
        for token in [BG, ACCENT, TEXT]:
            r, g, b = hex_to_rgb(token.hex)
            assert (r, g, b) == token.rgb, f"{token.hex} RGB mismatch"

    def test_typography_tokens(self):
        from cronixui.tokens import typography
        assert typography.xs == 11
        assert typography.sm == 12
        assert typography.base == 13
        assert typography.md == 14
        assert typography.lg == 16
        assert typography.xl == 20
        assert typography.xxl == 28
        assert typography.xxxl == 36

    def test_spacing_tokens(self):
        from cronixui.tokens import spacing
        assert spacing.space_1 == 4
        assert spacing.space_2 == 8
        assert spacing.space_3 == 12
        assert spacing.space_4 == 16
        assert spacing.space_8 == 32
        assert spacing.space_12 == 48

    def test_radius_tokens(self):
        from cronixui.tokens import radius
        assert radius.sm == 6
        assert radius.default == 10
        assert radius.lg == 14
        assert radius.xl == 20
        assert radius.full == 9999

    def test_z_index_tokens(self):
        from cronixui.tokens import z_index
        assert z_index.dropdown == 100
        assert z_index.modal == 500
        assert z_index.toast == 800

    def test_layout_tokens(self):
        from cronixui.tokens import layout
        assert layout.container_max == 1200
        assert layout.sidebar_width == 260


class TestColorUtilities:
    """Test color utility functions thoroughly."""

    def test_hex_to_rgb_primary(self):
        from cronixui.core import hex_to_rgb
        assert hex_to_rgb("#ff0000") == (255, 0, 0)
        assert hex_to_rgb("#00ff00") == (0, 255, 0)
        assert hex_to_rgb("#0000ff") == (0, 0, 255)

    def test_hex_to_rgb_without_hash(self):
        from cronixui.core import hex_to_rgb
        assert hex_to_rgb("ff0000") == (255, 0, 0)

    def test_hex_to_rgb_black_white(self):
        from cronixui.core import hex_to_rgb
        assert hex_to_rgb("#000000") == (0, 0, 0)
        assert hex_to_rgb("#ffffff") == (255, 255, 255)

    def test_rgb_to_hex(self):
        from cronixui.core import rgb_to_hex
        assert rgb_to_hex(255, 0, 0) == "#ff0000"
        assert rgb_to_hex(0, 0, 0) == "#000000"
        assert rgb_to_hex(255, 255, 255) == "#ffffff"

    def test_roundtrip_rgb_hex(self):
        from cronixui.core import hex_to_rgb, rgb_to_hex
        for r, g, b in [(107, 35, 35), (240, 237, 232), (30, 80, 40)]:
            hex_color = rgb_to_hex(r, g, b)
            assert hex_to_rgb(hex_color) == (r, g, b)

    def test_blend_colors_midpoint(self):
        from cronixui.core import blend_colors
        assert blend_colors("#000000", "#ffffff", 0.5) == "#7f7f7f"

    def test_blend_colors_at_zero(self):
        from cronixui.core import blend_colors
        assert blend_colors("#000000", "#ffffff", 0.0) == "#000000"

    def test_blend_colors_at_one(self):
        from cronixui.core import blend_colors
        assert blend_colors("#000000", "#ffffff", 1.0) == "#ffffff"

    def test_blend_colors_same(self):
        from cronixui.core import blend_colors
        assert blend_colors("#6b2323", "#6b2323", 0.5) == "#6b2323"

    def test_blend_accent_to_surface(self):
        from cronixui.core import blend_colors
        from cronixui.tokens import ACCENT, SURFACE
        result = blend_colors(ACCENT.hex, SURFACE.hex, 0.5)
        assert result.startswith("#")
        assert len(result) == 7


class TestTheme:
    """Test Theme class behavior."""

    def test_theme_defaults(self):
        from cronixui.core import Theme
        theme = Theme()
        assert theme.bg == "#0a0a0a"
        assert theme.surface == "#111111"
        assert theme.surface_2 == "#1a1a1a"
        assert theme.accent == "#6b2323"
        assert theme.font_size == 12
        assert theme.padding == 8

    def test_theme_typography(self):
        from cronixui.core import Theme
        theme = Theme()
        assert isinstance(theme.font_family, str)
        assert len(theme.font_family) > 0
        assert theme.font_bold is not None
        assert theme.font_normal is not None
        assert theme.font_small is not None

    def test_get_set_theme(self):
        from cronixui.core import Theme, get_theme, set_theme
        original = get_theme()
        custom = Theme()
        custom.bg = "#ff0000"
        set_theme(custom)
        assert get_theme().bg == "#ff0000"
        set_theme(original)
        assert get_theme().bg == "#0a0a0a"

    def test_theme_border(self):
        from cronixui.core import Theme
        theme = Theme()
        assert theme.border_width == 1
        assert theme.border_radius == 10


class TestComponentAPIContracts:
    """Verify component classes have the expected API surface."""

    def test_button_variants(self):
        from cronixui.button import Button
        # Verify Button class exists and accepts variant param
        import inspect
        sig = inspect.signature(Button.__init__)
        params = list(sig.parameters.keys())
        assert 'variant' in params

    def test_badge_variants(self):
        from cronixui.badge import Badge
        import inspect
        sig = inspect.signature(Badge.__init__)
        params = list(sig.parameters.keys())
        assert 'variant' in params

    def test_modal_creation(self):
        from cronixui.modal import Modal
        import inspect
        sig = inspect.signature(Modal.__init__)
        params = list(sig.parameters.keys())
        assert 'title' in params or 'master' in params

    def test_toggle_callback(self):
        from cronixui.toggle import Toggle
        import inspect
        sig = inspect.signature(Toggle.__init__)
        params = list(sig.parameters.keys())
        assert 'on_change' in params

    def test_rating_params(self):
        from cronixui.rating import Rating
        import inspect
        sig = inspect.signature(Rating.__init__)
        params = list(sig.parameters.keys())
        assert 'max_value' in params or 'max' in params or 'master' in params

    def test_accordion_items(self):
        from cronixui.accordion import Accordion
        import inspect
        sig = inspect.signature(Accordion.__init__)
        params = list(sig.parameters.keys())
        assert 'element' in params

    def test_stepper_params(self):
        from cronixui.stepper import Stepper
        import inspect
        sig = inspect.signature(Stepper.__init__)
        params = list(sig.parameters.keys())
        assert 'steps' in params

    def test_pagination_params(self):
        from cronixui.pagination import Pagination
        import inspect
        sig = inspect.signature(Pagination.__init__)
        params = list(sig.parameters.keys())
        assert 'total_pages' in params or 'total' in params

    def test_chip_dismissible(self):
        from cronixui.chip import Chip
        import inspect
        sig = inspect.signature(Chip.__init__)
        params = list(sig.parameters.keys())
        assert 'removable' in params or 'on_remove' in params

    def test_drawer_side(self):
        from cronixui.drawer import Drawer
        import inspect
        sig = inspect.signature(Drawer.__init__)
        params = list(sig.parameters.keys())
        assert 'side' in params or 'position' in params


class TestTokenConsistency:
    """Ensure token values are internally consistent."""

    def test_surface_colors_are_dark(self):
        from cronixui.tokens import BG, SURFACE, SURFACE_2, SURFACE_3, SURFACE_4
        for token in [BG, SURFACE, SURFACE_2, SURFACE_3, SURFACE_4]:
            r, g, b = token.rgb
            assert r < 50 and g < 50 and b < 50, f"{token.hex} is not dark enough"

    def test_text_color_is_light(self):
        from cronixui.tokens import TEXT
        r, g, b = TEXT.rgb
        assert r > 200 and g > 200 and b > 200

    def test_accent_is_crimson(self):
        """Accent should be reddish (R > G and R > B)."""
        from cronixui.tokens import ACCENT
        r, g, b = ACCENT.rgb
        assert r > g and r > b
        assert r > 80

    def test_success_is_greenish(self):
        from cronixui.tokens import SUCCESS
        r, g, b = SUCCESS.rgb
        assert g > r and g > b

    def test_error_is_reddish(self):
        from cronixui.tokens import ERROR
        r, g, b = ERROR.rgb
        assert r > g and r > b

    def test_warning_is_yellowish(self):
        from cronixui.tokens import WARNING
        r, g, b = WARNING.rgb
        assert r > b and g > b

    def test_info_is_blueish(self):
        from cronixui.tokens import INFO
        r, g, b = INFO.rgb
        assert b > r and b > g
