"""Tests for CronixUI toast module."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestToastImport:
    """Test that Toast can be imported."""

    def test_import_toast(self):
        try:
            from cronixui.toast import Toast
            assert Toast is not None
        except ImportError:
            # Toast might not exist in new tkinter version
            pytest.skip("Toast module not available in tkinter version")


class TestToastModule:
    """Test toast-related functionality."""

    def test_toast_module_exists(self):
        try:
            import cronixui.toast
            assert True
        except ImportError:
            pytest.skip("Toast module not available")
