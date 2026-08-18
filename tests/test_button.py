"""Tests for CronixUI native tkinter button component."""

import sys
import pytest

# Add the python package to the path
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestButtonImport:
    """Test that Button can be imported and has correct attributes."""

    def test_import_button(self):
        from cronixui.button import Button
        assert Button is not None

    def test_button_variants(self):
        from cronixui.button import Button
        assert hasattr(Button, 'VARIANTS')
        assert 'primary' in Button.VARIANTS
        assert 'danger' in Button.VARIANTS
        assert 'success' in Button.VARIANTS
        assert 'ghost' in Button.VARIANTS
        assert 'outline' in Button.VARIANTS

    def test_button_sizes(self):
        from cronixui.button import Button
        assert hasattr(Button, 'SIZES')
        assert 'sm' in Button.SIZES
        assert 'md' in Button.SIZES
        assert 'lg' in Button.SIZES


class TestButtonGroupImport:
    """Test that ButtonGroup can be imported."""

    def test_import_button_group(self):
        from cronixui.button import ButtonGroup
        assert ButtonGroup is not None


class TestButtonCreation:
    """Test Button creation (requires display)."""

    def test_button_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()  # Hide window

        btn = Button(root, text="Click me")
        assert btn is not None
        assert btn.cget('text') == 'Click me'

        root.destroy()

    def test_button_variant(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()

        btn = Button(root, text="Primary", variant="primary")
        assert btn.variant == "primary"

        root.destroy()

    def test_button_size(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()

        btn = Button(root, text="Small", size="sm")
        assert btn.size == "sm"

        root.destroy()

    def test_button_disabled(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()

        btn = Button(root, text="Disabled", disabled=True)
        assert str(btn.cget('state')) == 'disabled'

        root.destroy()

    def test_button_invalid_variant(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()

        with pytest.raises(ValueError, match="Invalid variant"):
            Button(root, text="Bad", variant="invalid")

        root.destroy()

    def test_button_invalid_size(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()

        with pytest.raises(ValueError, match="Invalid size"):
            Button(root, text="Bad", size="xl")

        root.destroy()


class TestButtonMethods:
    """Test Button methods."""

    def test_enable_disable(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()

        btn = Button(root, text="Test")
        btn.disable()
        assert str(btn.cget('state')) == 'disabled'

        btn.enable()
        assert str(btn.cget('state')) == 'normal'

        root.destroy()

    def test_set_text(self, xdisplay):
        import tkinter as tk
        from cronixui.button import Button

        root = tk.Tk()
        root.withdraw()

        btn = Button(root, text="Original")
        btn.set_text("Updated")
        assert btn.cget('text') == 'Updated'

        root.destroy()
