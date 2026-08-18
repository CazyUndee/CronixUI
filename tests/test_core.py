"""Tests for CronixUI core tkinter utilities."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestColorUtilities:
    """Test color utility functions."""

    def test_hex_to_rgb(self):
        from cronixui.core import hex_to_rgb
        assert hex_to_rgb("#ff0000") == (255, 0, 0)
        assert hex_to_rgb("#00ff00") == (0, 255, 0)
        assert hex_to_rgb("#0000ff") == (0, 0, 255)
        assert hex_to_rgb("ff0000") == (255, 0, 0)

    def test_rgb_to_hex(self):
        from cronixui.core import rgb_to_hex
        assert rgb_to_hex(255, 0, 0) == "#ff0000"
        assert rgb_to_hex(0, 255, 0) == "#00ff00"
        assert rgb_to_hex(0, 0, 255) == "#0000ff"

    def test_blend_colors(self):
        from cronixui.core import blend_colors
        result = blend_colors("#000000", "#ffffff", 0.5)
        assert result == "#7f7f7f"

    def test_blend_colors_edges(self):
        from cronixui.core import blend_colors
        assert blend_colors("#000000", "#ffffff", 0.0) == "#000000"
        assert blend_colors("#000000", "#ffffff", 1.0) == "#ffffff"


class TestTheme:
    """Test Theme class."""

    def test_theme_creation(self):
        from cronixui.core import Theme
        theme = Theme()
        assert theme.bg == "#0a0a0a"
        assert theme.surface == "#111111"
        assert theme.accent == "#6b2323"

    def test_get_theme(self):
        from cronixui.core import get_theme
        theme = get_theme()
        assert theme is not None
        assert hasattr(theme, 'bg')
        assert hasattr(theme, 'surface')
        assert hasattr(theme, 'accent')

    def test_set_theme(self):
        from cronixui.core import Theme, get_theme, set_theme
        original_theme = get_theme()
        new_theme = Theme()
        new_theme.bg = "#ffffff"
        set_theme(new_theme)

        assert get_theme().bg == "#ffffff"

        # Restore original
        set_theme(original_theme)


class TestTkinterWidgets:
    """Test tkinter widget wrappers."""

    def test_frame_import(self):
        from cronixui.core import Frame
        assert Frame is not None

    def test_label_import(self):
        from cronixui.core import Label
        assert Label is not None

    def test_button_import(self):
        from cronixui.core import Button
        assert Button is not None

    def test_entry_import(self):
        from cronixui.core import Entry
        assert Entry is not None

    def test_text_import(self):
        from cronixui.core import Text
        assert Text is not None

    def test_scrollbar_import(self):
        from cronixui.core import Scrollbar
        assert Scrollbar is not None


class TestFrameCreation:
    """Test Frame creation."""

    def test_frame_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.core import Frame

        root = tk.Tk()
        root.withdraw()

        frame = Frame(root)
        assert frame is not None

        root.destroy()


class TestLabelCreation:
    """Test Label creation."""

    def test_label_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.core import Label

        root = tk.Tk()
        root.withdraw()

        label = Label(root, text="Hello")
        assert label is not None
        assert label.cget('text') == 'Hello'

        root.destroy()


class TestButtonCreation:
    """Test Button creation."""

    def test_button_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.core import Button

        root = tk.Tk()
        root.withdraw()

        btn = Button(root, text="Click")
        assert btn is not None
        assert btn.cget('text') == 'Click'

        root.destroy()
