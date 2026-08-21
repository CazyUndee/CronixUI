"""Tests for all CronixUI Python components.

These tests verify that components can be imported and instantiated
without requiring a display (no tkinter widget creation).
"""
import sys
import os
from pathlib import Path

# Add the python package to the path
PYTHON_PACKAGE_PATH = Path(__file__).parent.parent / "packages" / "python"
sys.path.insert(0, str(PYTHON_PACKAGE_PATH))


class TestImports:
    """Verify all components can be imported."""

    def test_import_core(self):
        from cronixui.core import Frame, Label, Entry, CronixWidget
        assert Frame is not None
        assert Label is not None

    def test_import_tokens(self):
        from cronixui.tokens import BG, TEXT, ACCENT, BORDER
        assert BG is not None
        assert TEXT is not None

    def test_import_button(self):
        from cronixui.button import Button, ButtonGroup
        assert Button is not None
        assert ButtonGroup is not None

    def test_import_card(self):
        from cronixui.card import Card, CardIcon
        assert Card is not None

    def test_import_modal(self):
        from cronixui.modal import Modal
        assert Modal is not None

    def test_import_toggle(self):
        from cronixui.toggle import Toggle
        assert Toggle is not None

    def test_import_rating(self):
        from cronixui.rating import Rating
        assert Rating is not None

    def test_import_form(self):
        from cronixui.form import Input, Textarea, Checkbox, Radio, Select, Slider, FileInput
        assert Input is not None
        assert Textarea is not None
        assert Checkbox is not None

    def test_import_stat(self):
        from cronixui.stat import Stat
        assert Stat is not None

    def test_import_tag(self):
        from cronixui.tag import Tag
        assert Tag is not None

    def test_import_stack(self):
        from cronixui.stack import Stack, HStack
        assert Stack is not None
        assert HStack is not None

    def test_import_typography(self):
        from cronixui.typography import H1, H2, H3, H4, H5, H6, StyledText
        assert H1 is not None
        assert H2 is not None
        assert H6 is not None

    def test_import_stepper(self):
        from cronixui.stepper import Stepper
        assert Stepper is not None

    def test_import_datepicker(self):
        from cronixui.datepicker import DatePicker
        assert DatePicker is not None

    def test_import_chip(self):
        from cronixui.chip import Chip
        assert Chip is not None

    def test_import_timeline(self):
        from cronixui.timeline import Timeline
        assert Timeline is not None

    def test_import_drawer(self):
        from cronixui.drawer import Drawer
        assert Drawer is not None

    def test_import_popover(self):
        from cronixui.popover import Popover
        assert Popover is not None

    def test_import_treeview(self):
        from cronixui.treeview import TreeView
        assert TreeView is not None

    def test_import_colorpicker(self):
        from cronixui.colorpicker import ColorPicker
        assert ColorPicker is not None

    def test_import_empty_state(self):
        from cronixui.empty_state import EmptyState
        assert EmptyState is not None

    def test_import_notification(self):
        from cronixui.notification import Notification
        assert Notification is not None

    def test_import_file_upload(self):
        from cronixui.file_upload import FileUpload
        assert FileUpload is not None

    def test_import_accordion(self):
        from cronixui.accordion import Accordion
        assert Accordion is not None

    def test_import_alert(self):
        from cronixui.alert import Alert
        assert Alert is not None

    def test_import_avatar(self):
        from cronixui.avatar import Avatar, AvatarGroup
        assert Avatar is not None
        assert AvatarGroup is not None

    def test_import_badge(self):
        from cronixui.badge import Badge
        assert Badge is not None

    def test_import_breadcrumb(self):
        from cronixui.breadcrumb import Breadcrumb, BreadcrumbItem
        assert Breadcrumb is not None

    def test_import_command_palette(self):
        from cronixui.command_palette import CommandPalette
        assert CommandPalette is not None

    def test_import_dropdown(self):
        from cronixui.dropdown import Dropdown
        assert Dropdown is not None

    def test_import_list(self):
        from cronixui.list import CronixList
        assert CronixList is not None

    def test_import_loading(self):
        from cronixui.loading import Spinner, Skeleton
        assert Spinner is not None
        assert Skeleton is not None

    def test_import_nav(self):
        from cronixui.nav import Nav
        assert Nav is not None

    def test_import_pagination(self):
        from cronixui.pagination import Pagination
        assert Pagination is not None

    def test_import_progress(self):
        from cronixui.progress import Progress
        assert Progress is not None

    def test_import_search(self):
        from cronixui.search import Search
        assert Search is not None

    def test_import_table(self):
        from cronixui.table import Table
        assert Table is not None

    def test_import_tabs(self):
        from cronixui.tabs import Tabs
        assert Tabs is not None

    def test_import_toast(self):
        from cronixui.toast import Toast, ToastType
        assert Toast is not None
        assert ToastType is not None

    def test_import_tooltip(self):
        from cronixui.tooltip import Tooltip
        assert Tooltip is not None


class TestTopLevelImports:
    """Verify all components are accessible from top-level cronixui import."""

    def test_import_all_widgets(self):
        import cronixui

        expected = [
            'Button', 'ButtonGroup', 'Card', 'CardIcon', 'Modal', 'Toggle',
            'Rating', 'Input', 'Textarea', 'Checkbox', 'Radio', 'Select',
            'Slider', 'FileInput', 'Stat', 'Tag', 'Stack', 'HStack',
            'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'StyledText',
            'Stepper', 'DatePicker', 'Chip', 'Timeline', 'Drawer', 'Popover',
            'TreeView', 'ColorPicker', 'EmptyState', 'Notification', 'FileUpload',
            'Accordion', 'Alert', 'Avatar', 'AvatarGroup', 'Badge',
            'Breadcrumb', 'BreadcrumbItem', 'CommandPalette', 'CommandPaletteItem',
            'Dropdown', 'CronixList', 'Spinner', 'Skeleton', 'Nav',
            'Pagination', 'Progress', 'Search', 'SearchItem', 'Table',
            'Tabs', 'Toast', 'ToastType', 'Tooltip',
        ]

        for name in expected:
            assert hasattr(cronixui, name), f"Missing: {name}"


class TestTokens:
    """Verify token values."""

    def test_color_values(self):
        from cronixui.tokens import BG, TEXT, ACCENT, BORDER
        assert BG.hex == '#0a0a0a'
        assert TEXT.hex == '#f0ede8'
        assert ACCENT.hex == '#6b2323'
        assert BORDER is not None

    def test_token_objects(self):
        from cronixui.tokens import typography, spacing, radius
        assert hasattr(typography, 'font_family') or hasattr(typography, 'FONT_FAMILY')
        assert hasattr(spacing, 'space_1') or hasattr(spacing, 'SPACE_1')


class TestCore:
    """Verify core utilities."""

    def test_hex_to_rgb(self):
        from cronixui.core import hex_to_rgb
        r, g, b = hex_to_rgb('#ff0000')
        assert r == 255
        assert g == 0
        assert b == 0

    def test_rgb_to_hex(self):
        from cronixui.core import rgb_to_hex
        hex_color = rgb_to_hex(255, 0, 0)
        assert hex_color == '#ff0000'

    def test_blend_colors(self):
        from cronixui.core import blend_colors
        result = blend_colors('#000000', '#ffffff', 0.5)
        assert result is not None
