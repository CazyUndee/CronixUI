"""CronixUI Toggle Component - Native tkinter implementation.

This module provides native toggle/switch widgets.
"""

from __future__ import annotations

import tkinter as tk
from typing import Callable, Optional

from .core import Frame, get_theme


class Toggle(tk.Canvas):
    """Native toggle switch widget.
    
    Args:
        parent: Parent widget
        initial_state: Initial state (True/False)
        on_change: Callback when state changes
        
    Example:
        >>> root = tk.Tk()
        >>> toggle = Toggle(root, initial_state=True, on_change=lambda s: print(s))
        >>> toggle.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        initial_state: bool = False,
        on_change: Optional[Callable[[bool], None]] = None,
        **kwargs
    ):
        theme = get_theme()
        
        # Dimensions
        self.width = 44
        self.height = 24
        self.knob_radius = 8
        self.padding = 3
        
        kwargs.setdefault('width', self.width)
        kwargs.setdefault('height', self.height)
        kwargs.setdefault('bg', theme.surface_2)
        kwargs.setdefault('highlightthickness', 0)
        super().__init__(master, **kwargs)
        
        self.state = initial_state
        self.on_change = on_change
        
        # Draw initial state
        self._draw()
        
        # Bind click
        self.bind('<Button-1>', self._toggle)
    
    def _draw(self) -> None:
        """Draw the toggle switch."""
        self.delete('all')
        theme = get_theme()
        
        # Background track
        if self.state:
            bg_color = theme.accent
        else:
            bg_color = theme.surface_4
        
        # Draw rounded rectangle (simplified - using oval for smooth look)
        self.create_oval(
            self.padding, self.padding,
            self.height - self.padding, self.height - self.padding,
            fill=bg_color, outline=''
        )
        self.create_oval(
            self.width - self.height + self.padding, self.padding,
            self.width - self.padding, self.height - self.padding,
            fill=bg_color, outline=''
        )
        self.create_rectangle(
            self.height // 2, self.padding,
            self.width - self.height // 2, self.height - self.padding,
            fill=bg_color, outline=''
        )
        
        # Knob
        if self.state:
            knob_x = self.width - self.height // 2
        else:
            knob_x = self.height // 2
        
        knob_color = theme.text
        self.create_oval(
            knob_x - self.knob_radius, self.height // 2 - self.knob_radius,
            knob_x + self.knob_radius, self.height // 2 + self.knob_radius,
            fill=knob_color, outline=''
        )
    
    def _toggle(self, event=None) -> None:
        """Toggle the switch state."""
        self.state = not self.state
        self._draw()
        
        if self.on_change:
            self.on_change(self.state)
    
    def get_state(self) -> bool:
        """Get current state."""
        return self.state
    
    def set_state(self, state: bool) -> None:
        """Set state programmatically."""
        if self.state != state:
            self.state = state
            self._draw()
    
    def toggle(self) -> None:
        """Toggle the switch."""
        self._toggle()
