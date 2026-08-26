"""Tests for CronixUI Stepper component."""
import sys
import os
from unittest.mock import MagicMock, patch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'packages', 'python'))


def make_master():
    """Create a mock tkinter master for headless testing."""
    master = MagicMock()
    master.winfo_children.return_value = []
    return master


def test_stepper_creation():
    """Test basic Stepper creation."""
    from cronixui.stepper import Stepper
    with patch('cronixui.stepper.get_theme') as mock_theme, \
         patch('cronixui.core.get_theme') as mock_core_theme, \
         patch('tkinter.Label') as mock_label, \
         patch('tkinter.Frame') as mock_frame:
        mock_theme.return_value = MagicMock(font_family='Arial', text='#fff', text_muted='#aaa',
                                            bg='#111', accent='#6b2323', success='#1e5028',
                                            surface_3='#222')
        mock_core_theme.return_value = mock_theme.return_value
        steps = [
            {"label": "Step 1", "description": "First step"},
            {"label": "Step 2", "description": "Second step"},
            {"label": "Step 3", "description": "Third step"},
        ]
        stepper = Stepper(master=make_master(), steps=steps, current_step=0)
        assert stepper is not None


def test_stepper_default_step():
    """Test Stepper default current step."""
    from cronixui.stepper import Stepper
    with patch('cronixui.stepper.get_theme') as mock_theme, \
         patch('cronixui.core.get_theme') as mock_core_theme, \
         patch('tkinter.Label'), \
         patch('tkinter.Frame'):
        mock_theme.return_value = MagicMock(font_family='Arial', text='#fff', text_muted='#aaa',
                                            bg='#111', accent='#6b2323', success='#1e5028',
                                            surface_3='#222')
        mock_core_theme.return_value = mock_theme.return_value
        stepper = Stepper(master=make_master(), steps=[{"label": "A"}, {"label": "B"}])
        assert stepper.current_step == 0


def test_stepper_step_count():
    """Test Stepper tracks step count."""
    from cronixui.stepper import Stepper
    with patch('cronixui.stepper.get_theme') as mock_theme, \
         patch('cronixui.core.get_theme') as mock_core_theme, \
         patch('tkinter.Label'), \
         patch('tkinter.Frame'):
        mock_theme.return_value = MagicMock(font_family='Arial', text='#fff', text_muted='#aaa',
                                            bg='#111', accent='#6b2323', success='#1e5028',
                                            surface_3='#222')
        mock_core_theme.return_value = mock_theme.return_value
        stepper = Stepper(master=make_master(), steps=[{"label": "X"}, {"label": "Y"}, {"label": "Z"}], current_step=1)
        assert len(stepper.steps) == 3
        assert stepper.current_step == 1
