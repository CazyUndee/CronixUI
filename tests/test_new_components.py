"""Tests for CronixUI Stepper, Chip, Timeline, Drawer, Popover, TreeView, ColorPicker components."""

import sys
import pytest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / 'packages' / 'python'))


class TestStepperImport:
    def test_import_stepper(self):
        from cronixui.stepper import Stepper
        assert Stepper is not None

    def test_stepper_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.stepper import Stepper
        root = tk.Tk()
        root.withdraw()
        steps = [{"label": "Step 1"}, {"label": "Step 2"}, {"label": "Step 3"}]
        s = Stepper(root, steps=steps, current_step=0)
        assert s is not None
        root.destroy()


class TestChipImport:
    def test_import_chip(self):
        from cronixui.chip import Chip
        assert Chip is not None

    def test_chip_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.chip import Chip
        root = tk.Tk()
        root.withdraw()
        c = Chip(root, text="Label")
        assert c is not None
        root.destroy()


class TestTimelineImport:
    def test_import_timeline(self):
        from cronixui.timeline import Timeline
        assert Timeline is not None

    def test_timeline_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.timeline import Timeline
        root = tk.Tk()
        root.withdraw()
        items = [{"title": "Event 1", "time": "10:00"}, {"title": "Event 2", "time": "11:00"}]
        t = Timeline(root, items=items)
        assert t is not None
        root.destroy()


class TestDrawerImport:
    def test_import_drawer(self):
        from cronixui.drawer import Drawer
        assert Drawer is not None


class TestPopoverImport:
    def test_import_popover(self):
        from cronixui.popover import Popover
        assert Popover is not None


class TestTreeViewImport:
    def test_import_treeview(self):
        from cronixui.treeview import TreeView
        assert TreeView is not None

    def test_treeview_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.treeview import TreeView
        root = tk.Tk()
        root.withdraw()
        nodes = [
            {"id": "1", "label": "Root 1", "children": [{"id": "1-1", "label": "Child 1"}]},
            {"id": "2", "label": "Root 2"},
        ]
        tv = TreeView(root, nodes=nodes)
        assert tv is not None
        root.destroy()


class TestColorPickerImport:
    def test_import_colorpicker(self):
        from cronixui.colorpicker import ColorPicker
        assert ColorPicker is not None

    def test_colorpicker_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.colorpicker import ColorPicker
        root = tk.Tk()
        root.withdraw()
        cp = ColorPicker(root)
        assert cp is not None
        root.destroy()


class TestDatePickerImport:
    def test_import_datepicker(self):
        from cronixui.datepicker import DatePicker
        assert DatePicker is not None


class TestRatingImport:
    def test_import_rating(self):
        from cronixui.rating import Rating
        assert Rating is not None

    def test_rating_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.rating import Rating
        root = tk.Tk()
        root.withdraw()
        r = Rating(root, value=3, max_value=5)
        assert r is not None
        root.destroy()


class TestEmptyStateImport:
    def test_import_empty_state(self):
        from cronixui.empty_state import EmptyState
        assert EmptyState is not None


class TestNotificationImport:
    def test_import_notification(self):
        from cronixui.notification import Notification
        assert Notification is not None


class TestFileUploadImport:
    def test_import_file_upload(self):
        from cronixui.file_upload import FileUpload
        assert FileUpload is not None


class TestStatImport:
    def test_import_stat(self):
        from cronixui.stat import Stat
        assert Stat is not None

    def test_stat_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.stat import Stat
        root = tk.Tk()
        root.withdraw()
        s = Stat(root, value="1,234", label="Users")
        assert s is not None
        root.destroy()


class TestPaginationImport:
    def test_import_pagination(self):
        from cronixui.pagination import Pagination
        assert Pagination is not None


class TestSearchImport:
    def test_import_search(self):
        from cronixui.search import Search
        assert Search is not None


class TestStackImport:
    def test_import_stack(self):
        from cronixui.stack import Stack
        assert Stack is not None


class TestTypographyImport:
    def test_import_typography(self):
        from cronixui.typography import Typography
        assert Typography is not None
