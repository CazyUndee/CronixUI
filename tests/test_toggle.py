"""Tests for CronixUI native tkinter toggle component."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestToggleImport:
    """Test that Toggle can be imported."""

    def test_import_toggle(self):
        from cronixui.toggle import Toggle
        assert Toggle is not None


class TestToggleCreation:
    """Test Toggle creation."""

    def test_toggle_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.toggle import Toggle

        root = tk.Tk()
        root.withdraw()

        toggle = Toggle(root)
        assert toggle is not None
        assert toggle.get_state() is False

        root.destroy()

    def test_toggle_initial_state(self, xdisplay):
        import tkinter as tk
        from cronixui.toggle import Toggle

        root = tk.Tk()
        root.withdraw()

        toggle = Toggle(root, initial_state=True)
        assert toggle.get_state() is True

        root.destroy()

    def test_toggle_set_state(self, xdisplay):
        import tkinter as tk
        from cronixui.toggle import Toggle

        root = tk.Tk()
        root.withdraw()

        toggle = Toggle(root)
        toggle.set_state(True)
        assert toggle.get_state() is True

        toggle.set_state(False)
        assert toggle.get_state() is False

        root.destroy()

    def test_toggle_toggle(self, xdisplay):
        import tkinter as tk
        from cronixui.toggle import Toggle

        root = tk.Tk()
        root.withdraw()

        toggle = Toggle(root, initial_state=False)
        toggle.toggle()
        assert toggle.get_state() is True

        toggle.toggle()
        assert toggle.get_state() is False

        root.destroy()

    def test_toggle_callback(self, xdisplay):
        import tkinter as tk
        from cronixui.toggle import Toggle

        root = tk.Tk()
        root.withdraw()

        states = []
        toggle = Toggle(root, on_change=lambda s: states.append(s))

        toggle.toggle()
        assert len(states) == 1
        assert states[0] is True

        toggle.toggle()
        assert len(states) == 2
        assert states[1] is False

        root.destroy()
