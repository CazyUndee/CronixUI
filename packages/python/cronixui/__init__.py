"""
CronixUI - A dark-themed UI toolkit with crimson accents and Outfit typography.

Native tkinter implementation for cross-platform desktop applications.
"""

from .button import Button, ButtonGroup
from .card import Card, CardIcon
from .modal import Modal
from .toggle import Toggle
from .form import (
    Input, Textarea, Checkbox, Radio, Select, Slider, FileInput
)
from .core import (
    Frame, Label, Entry, Text, Scrollbar,
    Theme, get_theme, set_theme,
    CronixWidget, hex_to_rgb, rgb_to_hex, blend_colors,
)
from .tokens import (
    BG, SURFACE, SURFACE_2, SURFACE_3, SURFACE_4,
    TEXT, TEXT_MUTED, TEXT_DIM,
    ACCENT, ACCENT_HOVER, ACCENT_LIGHT, ACCENT_GLOW, ACCENT_TEXT,
    SUCCESS, SUCCESS_BORDER, SUCCESS_TEXT,
    WARNING, WARNING_BORDER, WARNING_TEXT,
    ERROR, ERROR_BORDER, ERROR_TEXT,
    INFO, INFO_BORDER, INFO_TEXT,
    BORDER, BORDER_HOVER, BORDER_FOCUS,
    Color, Typography, Spacing, Radius, Shadow, Transition, ZIndex, Layout,
    typography, spacing, radius, shadow, transition, z_index, layout,
)

__version__ = "1.2.0"

__all__ = [
    # Widgets
    "Button",
    "ButtonGroup",
    "Card",
    "CardIcon",
    "Modal",
    "Toggle",
    "Input",
    "Textarea",
    "Checkbox",
    "Radio",
    "Select",
    "Slider",
    "FileInput",
    
    # Core
    "Frame",
    "Label",
    "Entry",
    "Text",
    "Scrollbar",
    "CronixWidget",
    
    # Theme
    "Theme",
    "get_theme",
    "set_theme",
    
    # Utilities
    "hex_to_rgb",
    "rgb_to_hex",
    "blend_colors",
    
    # Tokens
    "BG", "SURFACE", "SURFACE_2", "SURFACE_3", "SURFACE_4",
    "TEXT", "TEXT_MUTED", "TEXT_DIM",
    "ACCENT", "ACCENT_HOVER", "ACCENT_LIGHT", "ACCENT_GLOW", "ACCENT_TEXT",
    "SUCCESS", "SUCCESS_BORDER", "SUCCESS_TEXT",
    "WARNING", "WARNING_BORDER", "WARNING_TEXT",
    "ERROR", "ERROR_BORDER", "ERROR_TEXT",
    "INFO", "INFO_BORDER", "INFO_TEXT",
    "BORDER", "BORDER_HOVER", "BORDER_FOCUS",
    "Color", "Typography", "Spacing", "Radius", "Shadow", "Transition", "ZIndex", "Layout",
    "typography", "spacing", "radius", "shadow", "transition", "z_index", "layout",
]
