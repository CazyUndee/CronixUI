"""
CronixUI - A dark-themed UI toolkit with crimson accents and Outfit typography.

Native tkinter implementation for cross-platform desktop applications.
"""

from .button import Button, ButtonGroup
from .card import Card, CardIcon
from .modal import Modal
from .toggle import Toggle
from .rating import Rating
from .form import (
    Input, Textarea, Checkbox, Radio, Select, Slider, FileInput, FormGroup
)
from .stat import Stat
from .tag import Tag
from .stack import Stack, HStack
from .typography import H1, H2, H3, H4, H5, H6, StyledText
from .stepper import Stepper
from .datepicker import DatePicker
from .chip import Chip
from .timeline import Timeline
from .drawer import Drawer
from .popover import Popover
from .treeview import TreeView
from .colorpicker import ColorPicker
from .empty_state import EmptyState
from .notification import Notification
from .file_upload import FileUpload
from .accordion import Accordion
from .alert import Alert
from .avatar import Avatar, AvatarGroup
from .badge import Badge
from .breadcrumb import Breadcrumb, BreadcrumbItem
from .command_palette import CommandPalette, CommandPaletteItem
from .dropdown import Dropdown
from .list import CronixList
from .loading import Spinner, Skeleton
from .nav import Nav
from .pagination import Pagination
from .progress import Progress
from .search import Search, SearchItem
from .table import Table
from .tabs import Tabs
from .toast import Toast, ToastType
from .tooltip import Tooltip
from .layout import (
    Header, Sidebar, Footer, Container, Divider, Section, NavItem
)
from .core import (
    Frame, Label, Entry, Text, Scrollbar,
    Theme, get_theme, set_theme,
    CronixWidget, hex_to_rgb, rgb_to_hex, blend_colors,
)
from .ai import (
    MessageRole, AIStatusType, ChatMessage, AIModel,
    CnChatInterface, CnTokenCounter, CnCodeBlock, CnModelSelector, CnAIStatus,
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

__version__ = "1.1.5"

__all__ = [
    # Widgets
    "Button",
    "ButtonGroup",
    "Card",
    "CardIcon",
    "Modal",
    "Toggle",
    "Rating",
    "Input",
    "Textarea",
    "Checkbox",
    "Radio",
    "Select",
    "Slider",
    "FileInput",
    "FormGroup",
    "Stat",
    "Tag",
    "Stack",
    "HStack",
    "H1", "H2", "H3", "H4", "H5", "H6",
    "StyledText",
    "Stepper",
    "DatePicker",
    "Chip",
    "Timeline",
    "Drawer",
    "Popover",
    "TreeView",
    "ColorPicker",
    "EmptyState",
    "Notification",
    "FileUpload",
    "Accordion",
    "Alert",
    "Avatar",
    "AvatarGroup",
    "Badge",
    "Breadcrumb",
    "BreadcrumbItem",
    "CommandPalette",
    "CommandPaletteItem",
    "Dropdown",
    "CronixList",
    "Spinner",
    "Skeleton",
    "Nav",
    "Pagination",
    "Progress",
    "Search",
    "SearchItem",
    "Table",
    "Tabs",
    "Toast",
    "ToastType",
    "Tooltip",
    "Header",
    "Sidebar",
    "Footer",
    "Container",
    "Divider",
    "Section",
    "NavItem",
    
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
    
    # AI Components
    "MessageRole",
    "AIStatusType",
    "ChatMessage",
    "AIModel",
    "CnChatInterface",
    "CnTokenCounter",
    "CnCodeBlock",
    "CnModelSelector",
    "CnAIStatus",
]
