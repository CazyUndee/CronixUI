"""Tests for CronixUI native tkinter rating component."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestRatingImports:
    """Test that Rating can be imported."""

    def test_import_rating(self):
        from cronixui.rating import Rating
        assert Rating is not None

    def test_import_from_package(self):
        import cronixui
        assert cronixui.Rating is not None


class TestRatingCreation:
    """Test Rating creation and value handling."""

    def test_rating_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.rating import Rating

        root = tk.Tk()
        root.withdraw()

        rating = Rating(root, value=3, max_value=5)
        assert rating is not None
        assert rating.get_value() == 3
        assert len(rating.stars) == 5

        root.destroy()

    def test_rating_default_value(self, xdisplay):
        import tkinter as tk
        from cronixui.rating import Rating

        root = tk.Tk()
        root.withdraw()

        rating = Rating(root)
        assert rating.get_value() == 0

        root.destroy()

    def test_set_value(self, xdisplay):
        import tkinter as tk
        from cronixui.rating import Rating

        root = tk.Tk()
        root.withdraw()

        rating = Rating(root, max_value=5)
        rating.set_value(4)
        assert rating.get_value() == 4

        rating.set_value(10)  # clamps to max
        assert rating.get_value() == 5

        rating.set_value(-1)  # clamps to min
        assert rating.get_value() == 0

        root.destroy()

    def test_on_change_callback(self, xdisplay):
        import tkinter as tk
        from cronixui.rating import Rating

        root = tk.Tk()
        root.withdraw()

        received = []
        rating = Rating(root, max_value=5, on_change=lambda v: received.append(v))
        rating.set_value(2)
        assert received == [2]

        root.destroy()

    def test_clear(self, xdisplay):
        import tkinter as tk
        from cronixui.rating import Rating

        root = tk.Tk()
        root.withdraw()

        rating = Rating(root, value=4)
        rating.clear()
        assert rating.get_value() == 0

        root.destroy()
