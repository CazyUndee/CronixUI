"""CronixUI Rating Component - Native tkinter implementation.

This module provides a native star rating widget.
"""

from __future__ import annotations

import tkinter as tk
from typing import Callable, Optional

from .core import Frame, Label, get_theme


class Rating(Frame):
    """Native star rating widget.

    Args:
        parent: Parent widget
        value: Initial rating value
        max_value: Number of stars
        size: Star font size in points
        on_change: Callback when rating changes

    Example:
        >>> root = tk.Tk()
        >>> rating = Rating(root, value=3, max_value=5, on_change=lambda v: print(v))
        >>> rating.pack()
    """

    FILLED_STAR = "\u2605"  # ★
    EMPTY_STAR = "\u2606"   # ☆

    def __init__(
        self,
        master: tk.Misc,
        value: int = 0,
        max_value: int = 5,
        size: int = 18,
        on_change: Optional[Callable[[int], None]] = None,
        **kwargs
    ):
        theme = get_theme()
        kwargs.setdefault('bg', theme.surface)
        kwargs.setdefault('font', (theme.font_family, size))
        super().__init__(master, **kwargs)

        self.max_value = max(1, max_value)
        self.on_change = on_change
        self._value = 0

        # Build star labels
        self.stars = []
        for i in range(1, self.max_value + 1):
            star = Label(
                self,
                text=self.EMPTY_STAR,
                font=(theme.font_family, size),
                bg=theme.surface,
                fg=theme.surface_4,
                cursor="hand2",
            )
            star.pack(side='left', padx=1)
            star.bind('<Button-1>', lambda e, v=i: self.set_value(v))
            self.stars.append(star)

        # Initialize with given value
        self.set_value(value, notify=False)

    def _redraw(self) -> None:
        """Update star colors based on current value."""
        theme = get_theme()
        for i, star in enumerate(self.stars):
            if i < self._value:
                star.configure(text=self.FILLED_STAR, fg=theme.accent)
            else:
                star.configure(text=self.EMPTY_STAR, fg=theme.surface_4)

    def set_value(self, value: int, notify: bool = True) -> None:
        """Set the rating value programmatically."""
        clamped = max(0, min(int(value), self.max_value))
        if clamped != self._value:
            self._value = clamped
            self._redraw()
        if notify and self.on_change:
            self.on_change(self._value)

    def get_value(self) -> int:
        """Get the current rating value."""
        return self._value

    def clear(self) -> None:
        """Reset the rating to zero."""
        self.set_value(0)
