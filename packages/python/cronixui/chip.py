"""CronixUI Chip Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from tkinter import ttk
from typing import Callable, Optional
from .core import Frame, get_theme


class Chip(ttk.Label):
    """Native chip/tag element with optional remove button.

    Args:
        parent: Parent widget
        text: Chip text
        variant: Chip variant (default, accent, success, warning, error, info)
        size: Chip size (sm, md, lg)
        selected: Whether chip is selected
        removable: Show remove button
        on_click: Click handler
        on_remove: Remove handler

    Example:
        >>> chip = Chip(root, "Option A", variant="accent", selected=True)
        >>> chip.pack()
    """

    VARIANTS = ("default", "accent", "success", "warning", "error", "info")

    def __init__(
        self,
        master: tk.Misc,
        text: str = "",
        variant: str = "default",
        size: str = "md",
        selected: bool = False,
        removable: bool = False,
        on_click: Optional[Callable] = None,
        on_remove: Optional[Callable] = None,
        **kwargs
    ):
        self.variant = variant
        self.selected = selected
        theme = get_theme()

        # Determine colors
        if selected:
            bg, fg = theme.accent, theme.text
        elif variant == "success":
            bg, fg = "#1a3a1a", "#4a8b4a"
        elif variant == "warning":
            bg, fg = "#3a2a0a", "#8b7a4a"
        elif variant == "error":
            bg, fg = "#3a1a1a", theme.error
        elif variant == "info":
            bg, fg = "#1a2a3a", "#4a6a8b"
        elif variant == "accent":
            bg, fg = theme.accent_light, theme.accent
        else:
            bg, fg = theme.surface_2, theme.text

        font_size = {"sm": 9, "md": 10, "lg": 12}.get(size, 10)

        display_text = f" {text} ✕" if removable else text
        super().__init__(master, text=display_text, background=bg, foreground=fg,
                         font=(theme.font_family, font_size), padding=(8, 2), **kwargs)

        if on_click:
            self.bind('<Button-1>', lambda e: on_click())
            self.configure(cursor='hand2')
        if on_remove and removable:
            self.bind('<Button-1>', lambda e: on_remove())

    def set_selected(self, selected: bool) -> None:
        """Update selected state."""
        self.selected = selected
        theme = get_theme()
        if selected:
            self.configure(background=theme.accent, foreground=theme.text)
        else:
            self.configure(background=theme.surface_2, foreground=theme.text)
