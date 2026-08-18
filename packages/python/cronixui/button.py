"""CronixUI Button Component - Native tkinter implementation.

This module provides native button widgets that render as actual OS buttons.
"""

from __future__ import annotations

import tkinter as tk
from tkinter import ttk
from typing import Callable, Optional

from .core import Frame, get_theme


class Button(ttk.Button):
    """Native button widget with CronixUI theming.
    
    Args:
        parent: Parent widget
        text: Button text
        variant: Button variant (default, primary, ghost, outline, danger, success)
        size: Button size (sm, md, lg)
        icon: Optional icon (text/emoji for now)
        disabled: Whether button is disabled
        command: Click handler callback
        
    Example:
        >>> root = tk.Tk()
        >>> btn = Button(root, "Click me", variant="primary")
        >>> btn.pack()
    """
    
    VARIANTS = ("default", "primary", "ghost", "outline", "danger", "success")
    SIZES = ("sm", "md", "lg")
    
    def __init__(
        self,
        master: tk.Misc,
        text: str = "",
        variant: str = "default",
        size: str = "md",
        icon: str = "",
        disabled: bool = False,
        command: Optional[Callable] = None,
        **kwargs
    ):
        if variant not in self.VARIANTS:
            raise ValueError(f"Invalid variant '{variant}'. Must be one of {self.VARIANTS}")
        if size not in self.SIZES:
            raise ValueError(f"Invalid size '{size}'. Must be one of {self.SIZES}")
        
        self.variant = variant
        self.size = size
        self.icon_text = icon
        
        # Get theme
        theme = get_theme()
        
        # Configure style based on variant
        style = ttk.Style()
        style_name = f"Cronix.{variant}.TButton"
        
        # Determine font size based on size
        if size == "sm":
            font_size = 10
            padding = (8, 4)
        elif size == "lg":
            font_size = 14
            padding = (16, 10)
        else:
            font_size = 12
            padding = (12, 6)
        
        # Set colors based on variant
        if variant == "primary":
            bg = theme.accent
            fg = theme.text
            hover_bg = theme.accent_hover
        elif variant == "danger":
            bg = theme.error
            fg = theme.text
            hover_bg = "#6b1c1c"
        elif variant == "success":
            bg = theme.success
            fg = theme.text
            hover_bg = "#2a6b35"
        elif variant == "ghost":
            bg = theme.surface
            fg = theme.text
            hover_bg = theme.surface_3
        elif variant == "outline":
            bg = theme.surface
            fg = theme.text
            hover_bg = theme.surface_3
        else:
            bg = theme.surface_2
            fg = theme.text
            hover_bg = theme.surface_3
        
        # Configure the style
        style.configure(
            style_name,
            background=bg,
            foreground=fg,
            font=(theme.font_family, font_size),
            padding=padding,
            relief='flat',
        )
        
        style.map(
            style_name,
            background=[('active', hover_bg), ('disabled', theme.surface_3)],
            foreground=[('disabled', theme.text_muted if hasattr(theme, 'text_muted') else theme.text)],
        )
        
        # Build display text
        display_text = f"{icon} {text}" if icon else text
        
        # Initialize button
        super().__init__(master, text=display_text, style=style_name, command=command, **kwargs)
        
        # Store original command for enable/disable
        self._original_command = command
        if disabled:
            self.configure(state='disabled')
    
    def set_variant(self, variant: str) -> None:
        """Change button variant."""
        if variant not in self.VARIANTS:
            raise ValueError(f"Invalid variant '{variant}'")
        self.variant = variant
        # Re-apply style
        style_name = f"Cronix.{variant}.TButton"
        self.configure(style=style_name)
    
    def enable(self) -> None:
        """Enable the button."""
        self.configure(state='normal')
    
    def disable(self) -> None:
        """Disable the button."""
        self.configure(state='disabled')
    
    def set_text(self, text: str) -> None:
        """Update button text."""
        display_text = f"{self.icon_text} {text}" if self.icon_text else text
        self.configure(text=display_text)


class ButtonGroup(Frame):
    """Button group component.
    
    Args:
        parent: Parent widget
        buttons: List of Button widgets to include
        
    Example:
        >>> group = ButtonGroup(root)
        >>> group.add_button(Button(group, "Left"))
        >>> group.add_button(Button(group, "Right"))
        >>> group.pack()
    """
    
    def __init__(self, master: tk.Misc, **kwargs):
        super().__init__(master, **kwargs)
        self.buttons = []
        
    def add_button(self, button: Button) -> None:
        """Add a button to the group."""
        self.buttons.append(button)
        button.pack(side='left', padx=2)
        
    def remove_button(self, button: Button) -> None:
        """Remove a button from the group."""
        if button in self.buttons:
            self.buttons.remove(button)
            button.destroy()
    
    def clear(self) -> None:
        """Remove all buttons."""
        for btn in self.buttons:
            btn.destroy()
        self.buttons.clear()
