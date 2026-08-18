"""Tests for CronixUI native tkinter modal component."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestModalImport:
    """Test that Modal can be imported."""

    def test_import_modal(self):
        from cronixui.modal import Modal
        assert Modal is not None


class TestModalCreation:
    """Test Modal creation."""

    def test_modal_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.modal import Modal

        root = tk.Tk()
        root.withdraw()

        modal = Modal(root, title="Test Modal")
        assert modal is not None
        assert modal.title_label.cget('text') == "Test Modal"

        modal.destroy()
        root.destroy()

    def test_modal_add_label(self, xdisplay):
        import tkinter as tk
        from cronixui.modal import Modal

        root = tk.Tk()
        root.withdraw()

        modal = Modal(root, title="Test")
        label = modal.add_label("This is a message")
        assert label is not None

        modal.destroy()
        root.destroy()

    def test_modal_add_button(self, xdisplay):
        import tkinter as tk
        from cronixui.modal import Modal

        root = tk.Tk()
        root.withdraw()

        modal = Modal(root, title="Test")
        btn = modal.add_button("OK", variant="primary")
        assert btn is not None

        modal.destroy()
        root.destroy()

    def test_modal_set_title(self, xdisplay):
        import tkinter as tk
        from cronixui.modal import Modal

        root = tk.Tk()
        root.withdraw()

        modal = Modal(root, title="Original")
        modal.set_title("Updated")
        assert modal.title_label.cget('text') == "Updated"

        modal.destroy()
        root.destroy()
