"""CronixUI ColorPicker Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from tkinter import colorchooser
from typing import Callable, List, Optional
from .core import Frame, get_theme


class ColorPicker(Frame):
    """Native color picker with preset swatches.

    Args:
        parent: Parent widget
        value: Initial hex color string
        presets: List of hex color strings
        on_change: Callback when color changes

    Example:
        >>> picker = ColorPicker(root, value="#6B2323")
        >>> picker.pack()
    """

    DEFAULT_PRESETS = [
        "#6B2323", "#8B3A3A", "#C97A7A", "#1A1A1A", "#2A2A2A",
        "#FFFFFF", "#2A6B23", "#6B5A23", "#23356B",
    ]

    def __init__(
        self,
        master: tk.Misc,
        value: str = "#6B2323",
        presets: List[str] = None,
        on_change: Optional[Callable] = None,
        **kwargs
    ):
        super().__init__(master, bg=get_theme().bg, highlightthickness=0, **kwargs)
        theme = get_theme()
        self.value = value
        self.presets = presets or self.DEFAULT_PRESETS
        self.on_change = on_change
        self._swatches = []

        # Preview
        self.preview = tk.Frame(self, bg=value, height=36, relief='solid', bd=1)
        self.preview.pack(fill='x', pady=(0, 8))

        # Preset swatches row
        swatch_row = Frame(self, bg=theme.bg)
        swatch_row.pack(fill='x')
        for color in self.presets:
            swatch = tk.Canvas(swatch_row, width=24, height=24, bg=color,
                              highlightthickness=1, highlightbackground=theme.border,
                              cursor='hand2')
            swatch.pack(side='left', padx=2)
            swatch.bind('<Button-1>', lambda e, c=color: self._select(c))
            self._swatches.append((swatch, color))

        # Manual entry
        entry_row = Frame(self, bg=theme.bg)
        entry_row.pack(fill='x', pady=(8, 0))
        self.entry = tk.Entry(entry_row, bg=theme.surface_2, fg=theme.text,
                             insertbackground=theme.text, font=(theme.font_family, 11),
                             relief='flat')
        self.entry.insert(0, value)
        self.entry.pack(fill='x')
        self.entry.bind('<Return>', lambda e: self._select(self.entry.get()))

    def _select(self, color: str) -> None:
        self.value = color
        self.preview.configure(bg=color)
        self.entry.delete(0, 'end')
        self.entry.insert(0, color)
        if self.on_change:
            self.on_change(color)

    def get(self) -> str:
        return self.value

    def set(self, color: str) -> None:
        self._select(color)
