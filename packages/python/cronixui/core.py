"""Core CronixUI functions - Native tkinter GUI utilities.

This module provides the foundation for native GUI components using tkinter.
All components render actual native widgets, not HTML.
"""

from __future__ import annotations

import tkinter as tk
from tkinter import ttk, font
from typing import Any, Callable, Dict, List, Optional, Tuple, Union

from .tokens import (
    BG, SURFACE, SURFACE_2, SURFACE_3, SURFACE_4,
    TEXT, TEXT_MUTED, ACCENT, ACCENT_HOVER, SUCCESS, ERROR, WARNING, INFO,
)


def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Convert hex color string to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB values to hex color string."""
    return f"#{r:02x}{g:02x}{b:02x}"


def blend_colors(color1: str, color2: str, factor: float) -> str:
    """Blend two hex colors together."""
    r1, g1, b1 = hex_to_rgb(color1)
    r2, g2, b2 = hex_to_rgb(color2)
    r = int(r1 + (r2 - r1) * factor)
    g = int(g1 + (g2 - g1) * factor)
    b = int(b1 + (b2 - b1) * factor)
    return rgb_to_hex(r, g, b)


class Theme:
    """CronixUI theme configuration for tkinter."""
    
    def __init__(self):
        # Colors from tokens
        self.bg = BG.hex
        self.surface = SURFACE.hex
        self.surface_2 = SURFACE_2.hex
        self.surface_3 = SURFACE_3.hex
        self.surface_4 = SURFACE_4.hex
        self.text = TEXT.hex
        self.accent = ACCENT.hex
        self.accent_hover = ACCENT_HOVER.hex
        self.success = SUCCESS.hex
        self.error = ERROR.hex
        self.warning = WARNING.hex
        self.info = INFO.hex
        
        # Typography
        self.font_family = "Segoe UI"
        self.font_size = 12
        self.font_bold = (self.font_family, self.font_size, "bold")
        self.font_normal = (self.font_family, self.font_size)
        self.font_small = (self.font_family, 10)
        
        # Spacing
        self.padding = 8
        self.padding_large = 16
        
        # Border radius (approximated for tkinter)
        self.border_width = 1
        self.border_radius = 10


# Global theme instance
_theme = Theme()


def get_theme() -> Theme:
    """Get the current theme."""
    return _theme


def set_theme(theme: Theme) -> None:
    """Set a custom theme."""
    global _theme
    _theme = theme


class CronixWidget:
    """Base class for all CronixUI widgets."""
    
    def __init__(self, master: tk.Misc, **kwargs):
        self.master = master
        self.theme = get_theme()
        self._widget: Optional[tk.Widget] = None
        
    def pack(self, **kwargs):
        """Pack the widget."""
        if self._widget:
            self._widget.pack(**kwargs)
            
    def grid(self, **kwargs):
        """Grid the widget."""
        if self._widget:
            self._widget.grid(**kwargs)
            
    def place(self, **kwargs):
        """Place the widget."""
        if self._widget:
            self._widget.place(**kwargs)
            
    def destroy(self):
        """Destroy the widget."""
        if self._widget:
            self._widget.destroy()


class Frame(tk.Frame):
    """Themed frame widget."""
    
    def __init__(self, master=None, **kwargs):
        theme = get_theme()
        kwargs.setdefault('bg', theme.surface)
        kwargs.setdefault('highlightthickness', 0)
        super().__init__(master, **kwargs)


class Label(tk.Label):
    """Themed label widget."""
    
    def __init__(self, master=None, **kwargs):
        theme = get_theme()
        kwargs.setdefault('bg', theme.surface)
        kwargs.setdefault('fg', theme.text)
        kwargs.setdefault('font', theme.font_normal)
        super().__init__(master, **kwargs)


class Button(tk.Button):
    """Themed button widget."""
    
    def __init__(self, master=None, variant: str = "default", **kwargs):
        theme = get_theme()
        
        # Set colors based on variant
        if variant == "primary":
            bg = theme.accent
            fg = theme.text
        elif variant == "danger":
            bg = theme.error
            fg = theme.text
        elif variant == "success":
            bg = theme.success
            fg = theme.text
        elif variant == "ghost":
            bg = theme.surface
            fg = theme.text
        else:
            bg = theme.surface_2
            fg = theme.text
            
        kwargs.setdefault('bg', bg)
        kwargs.setdefault('fg', fg)
        kwargs.setdefault('activebackground', theme.accent_hover)
        kwargs.setdefault('activeforeground', theme.text)
        kwargs.setdefault('font', theme.font_normal)
        kwargs.setdefault('relief', 'flat')
        kwargs.setdefault('borderwidth', 0)
        kwargs.setdefault('padx', theme.padding)
        kwargs.setdefault('pady', theme.padding // 2)
        
        super().__init__(master, **kwargs)
        self.variant = variant
        
        # Bind hover effects
        self.bind('<Enter>', self._on_enter)
        self.bind('<Leave>', self._on_leave)
        
    def _on_enter(self, e):
        theme = get_theme()
        if self.variant == "primary":
            self.configure(bg=theme.accent_hover)
        elif self.variant == "ghost":
            self.configure(bg=theme.surface_3)
        else:
            self.configure(bg=theme.surface_3)
            
    def _on_leave(self, e):
        theme = get_theme()
        if self.variant == "primary":
            self.configure(bg=theme.accent)
        elif self.variant == "danger":
            self.configure(bg=theme.error)
        elif self.variant == "success":
            self.configure(bg=theme.success)
        elif self.variant == "ghost":
            self.configure(bg=theme.surface)
        else:
            self.configure(bg=theme.surface_2)


class Entry(tk.Entry):
    """Themed entry widget."""
    
    def __init__(self, master=None, **kwargs):
        theme = get_theme()
        kwargs.setdefault('bg', theme.surface_2)
        kwargs.setdefault('fg', theme.text)
        kwargs.setdefault('insertbackground', theme.text)
        kwargs.setdefault('font', theme.font_normal)
        kwargs.setdefault('relief', 'flat')
        kwargs.setdefault('borderwidth', 1)
        super().__init__(master, **kwargs)


class Text(tk.Text):
    """Themed text widget."""
    
    def __init__(self, master=None, **kwargs):
        theme = get_theme()
        kwargs.setdefault('bg', theme.surface_2)
        kwargs.setdefault('fg', theme.text)
        kwargs.setdefault('insertbackground', theme.text)
        kwargs.setdefault('font', theme.font_normal)
        kwargs.setdefault('relief', 'flat')
        kwargs.setdefault('borderwidth', 1)
        super().__init__(master, **kwargs)


class Scrollbar(tk.Scrollbar):
    """Themed scrollbar widget."""
    
    def __init__(self, master=None, **kwargs):
        theme = get_theme()
        kwargs.setdefault('bg', theme.surface_3)
        kwargs.setdefault('troughcolor', theme.surface)
        super().__init__(master, **kwargs)


__all__ = [
    'CronixWidget',
    'Frame',
    'Label',
    'Button',
    'Entry',
    'Text',
    'Scrollbar',
    'get_theme',
    'set_theme',
    'Theme',
    'hex_to_rgb',
    'rgb_to_hex',
    'blend_colors',
]
