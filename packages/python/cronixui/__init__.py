"""
CronixUI - A dark-themed UI toolkit with crimson accents and Outfit typography
"""

from .toast import Toast
from .toggle import Toggle
from .modal import Modal
from .dropdown import Dropdown
from .tabs import Tabs
from .accordion import Accordion
from .pagination import Pagination
from .command_palette import CommandPalette, CommandPaletteItem
from .search import Search, SearchItem
from .nav import Nav
from .core import init, query, query_all, create_el
from .tokens import (
    BG,
    SURFACE,
    SURFACE_2,
    SURFACE_3,
    SURFACE_4,
    TEXT,
    TEXT_MUTED,
    TEXT_DIM,
    ACCENT,
    ACCENT_HOVER,
    ACCENT_LIGHT,
    ACCENT_GLOW,
    ACCENT_TEXT,
    SUCCESS,
    SUCCESS_BORDER,
    SUCCESS_TEXT,
    WARNING,
    WARNING_BORDER,
    WARNING_TEXT,
    ERROR,
    ERROR_BORDER,
    ERROR_TEXT,
    INFO,
    INFO_BORDER,
    INFO_TEXT,
    BORDER,
    BORDER_HOVER,
    BORDER_FOCUS,
    typography,
    spacing,
    radius,
    shadow,
    transition,
    z_index,
    layout,
)

__version__ = "1.0.5"
__all__ = [
    "Toast",
    "Toggle",
    "Modal",
    "Dropdown",
    "Tabs",
    "Accordion",
    "Pagination",
    "CommandPalette",
    "CommandPaletteItem",
    "Search",
    "SearchItem",
    "Nav",
    "init",
    "query",
    "query_all",
    "create_el",
    # Colors
    "BG",
    "SURFACE",
    "SURFACE_2",
    "SURFACE_3",
    "SURFACE_4",
    "TEXT",
    "TEXT_MUTED",
    "TEXT_DIM",
    "ACCENT",
    "ACCENT_HOVER",
    "ACCENT_LIGHT",
    "ACCENT_GLOW",
    "ACCENT_TEXT",
    "SUCCESS",
    "SUCCESS_BORDER",
    "SUCCESS_TEXT",
    "WARNING",
    "WARNING_BORDER",
    "WARNING_TEXT",
    "ERROR",
    "ERROR_BORDER",
    "ERROR_TEXT",
    "INFO",
    "INFO_BORDER",
    "INFO_TEXT",
    "BORDER",
    "BORDER_HOVER",
    "BORDER_FOCUS",
    # Token objects
    "typography",
    "spacing",
    "radius",
    "shadow",
    "transition",
    "z_index",
    "layout",
]
