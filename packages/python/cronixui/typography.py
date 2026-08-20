"""Typography components - headings H1-H6 and styled Text."""

import tkinter as tk
from .core import Label
from .tokens import TEXT, TEXT_MUTED, TEXT_DIM, ACCENT


class H1(Label):
    """Heading level 1 (32px bold)."""
    def __init__(self, parent, text="", **kwargs):
        super().__init__(parent, text=text, font=("Outfit", 32, "bold"),
                         fg=TEXT, bg=kwargs.pop("bg", "#0a0a0f"), **kwargs)


class H2(Label):
    """Heading level 2 (24px bold)."""
    def __init__(self, parent, text="", **kwargs):
        super().__init__(parent, text=text, font=("Outfit", 24, "bold"),
                         fg=TEXT, bg=kwargs.pop("bg", "#0a0a0f"), **kwargs)


class H3(Label):
    """Heading level 3 (20px semibold)."""
    def __init__(self, parent, text="", **kwargs):
        super().__init__(parent, text=text, font=("Outfit", 20, "bold"),
                         fg=TEXT, bg=kwargs.pop("bg", "#0a0a0f"), **kwargs)


class H4(Label):
    """Heading level 4 (16px semibold)."""
    def __init__(self, parent, text="", **kwargs):
        super().__init__(parent, text=text, font=("Outfit", 16, "bold"),
                         fg=TEXT, bg=kwargs.pop("bg", "#0a0a0f"), **kwargs)


class H5(Label):
    """Heading level 5 (14px semibold)."""
    def __init__(self, parent, text="", **kwargs):
        super().__init__(parent, text=text, font=("Outfit", 14, "bold"),
                         fg=TEXT, bg=kwargs.pop("bg", "#0a0a0f"), **kwargs)


class H6(Label):
    """Heading level 6 (12px semibold)."""
    def __init__(self, parent, text="", **kwargs):
        super().__init__(parent, text=text, font=("Outfit", 12, "bold"),
                         fg=TEXT, bg=kwargs.pop("bg", "#0a0a0f"), **kwargs)


class StyledText(Label):
    """Styled text with variant support.

    Args:
        parent: Parent widget
        text: Text content
        variant: 'default', 'muted', 'dim', 'accent', 'mono'
        font_size: Font size in points (default: 12)
    """
    VARIANT_COLORS = {
        "default": TEXT,
        "muted": TEXT_MUTED,
        "dim": TEXT_DIM,
        "accent": ACCENT,
        "mono": TEXT,
    }

    VARIANT_FONTS = {
        "mono": ("Courier",),
        "default": ("Outfit",),
        "muted": ("Outfit",),
        "dim": ("Outfit",),
        "accent": ("Outfit",),
    }

    def __init__(self, parent, text="", variant="default", font_size=12, **kwargs):
        color = self.VARIANT_COLORS.get(variant, TEXT)
        font_family = self.VARIANT_FONTS.get(variant, ("Outfit",))
        super().__init__(parent, text=text,
                         font=(*font_family, font_size),
                         fg=color,
                         bg=kwargs.pop("bg", "#0a0a0f"),
                         **kwargs)
