"""Tests for CronixUI native tkinter form components."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestFormImports:
    """Test that form components can be imported."""

    def test_import_input(self):
        from cronixui.form import Input
        assert Input is not None

    def test_import_textarea(self):
        from cronixui.form import Textarea
        assert Textarea is not None

    def test_import_checkbox(self):
        from cronixui.form import Checkbox
        assert Checkbox is not None

    def test_import_radio(self):
        from cronixui.form import Radio
        assert Radio is not None

    def test_import_select(self):
        from cronixui.form import Select
        assert Select is not None

    def test_import_slider(self):
        from cronixui.form import Slider
        assert Slider is not None

    def test_import_file_input(self):
        from cronixui.form import FileInput
        assert FileInput is not None


class TestInputCreation:
    """Test Input creation."""

    def test_input_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Input

        root = tk.Tk()
        root.withdraw()

        entry = Input(root, placeholder="Enter text...")
        assert entry is not None

        root.destroy()

    def test_input_get_value(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Input

        root = tk.Tk()
        root.withdraw()

        entry = Input(root)
        entry.insert(0, "Hello")
        assert entry.get_value() == "Hello"

        root.destroy()


class TestTextareaCreation:
    """Test Textarea creation."""

    def test_textarea_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Textarea

        root = tk.Tk()
        root.withdraw()

        textarea = Textarea(root, placeholder="Enter text...", height=5)
        assert textarea is not None

        root.destroy()

    def test_textarea_get_value(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Textarea

        root = tk.Tk()
        root.withdraw()

        textarea = Textarea(root)
        textarea.text.insert('1.0', "Hello World")
        assert textarea.get_value() == "Hello World"

        root.destroy()


class TestCheckboxCreation:
    """Test Checkbox creation."""

    def test_checkbox_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Checkbox

        root = tk.Tk()
        root.withdraw()

        cb = Checkbox(root, label="Accept terms")
        assert cb is not None

        root.destroy()

    def test_checkbox_get_state(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Checkbox

        root = tk.Tk()
        root.withdraw()

        cb = Checkbox(root, label="Accept terms", initial_state=True)
        assert cb.get_state() is True

        cb.set_state(False)
        assert cb.get_state() is False

        root.destroy()


class TestRadioCreation:
    """Test Radio creation."""

    def test_radio_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Radio

        root = tk.Tk()
        root.withdraw()

        radio = Radio(root, options=["Option 1", "Option 2", "Option 3"])
        assert radio is not None

        root.destroy()

    def test_radio_get_value(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Radio

        root = tk.Tk()
        root.withdraw()

        radio = Radio(root, options=["A", "B", "C"], initial="B")
        assert radio.get_value() == "B"

        radio.set_value("C")
        assert radio.get_value() == "C"

        root.destroy()


class TestSelectCreation:
    """Test Select creation."""

    def test_select_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Select

        root = tk.Tk()
        root.withdraw()

        select = Select(root, options=["Option 1", "Option 2"])
        assert select is not None

        root.destroy()


class TestSliderCreation:
    """Test Slider creation."""

    def test_slider_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Slider

        root = tk.Tk()
        root.withdraw()

        slider = Slider(root, min_value=0, max_value=100, initial=50)
        assert slider is not None

        root.destroy()

    def test_slider_get_value(self, xdisplay):
        import tkinter as tk
        from cronixui.form import Slider

        root = tk.Tk()
        root.withdraw()

        slider = Slider(root, min_value=0, max_value=100, initial=50)
        assert slider.get_value() == 50.0

        slider.set_value(75)
        assert slider.get_value() == 75.0

        root.destroy()
