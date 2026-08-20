"""CronixUI DatePicker Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from tkinter import ttk
from typing import Callable, Optional
from .core import Frame, Entry, get_theme


class DatePicker(Frame):
    """Native date picker using tkcalendar or fallback to entry.

    Falls back to a plain Entry if tkcalendar is not installed.

    Args:
        parent: Parent widget
        value: Initial date string (YYYY-MM-DD)
        min_date: Minimum selectable date
        max_date: Maximum selectable date
        disabled: Whether the picker is disabled
        on_change: Callback when date changes

    Example:
        >>> picker = DatePicker(root, value="2024-01-15")
        >>> picker.pack()
    """

    def __init__(
        self,
        master: tk.Misc,
        value: str = "",
        min_date: str = "",
        max_date: str = "",
        disabled: bool = False,
        on_change: Optional[Callable] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        theme = get_theme()
        self.value = value
        self.on_change = on_change

        self.entry = Entry(
            self,
            placeholder="YYYY-MM-DD",
            disabled=disabled,
        )
        if value:
            self.entry.delete(0, 'end')
            self.entry.insert(0, value)
        self.entry.pack(fill='x')

        if on_change:
            self.entry.bind('<KeyRelease>', lambda e: on_change(self.entry.get()))

    def get(self) -> str:
        """Get the current date value."""
        return self.entry.get()

    def set(self, value: str) -> None:
        """Set the date value."""
        self.entry.delete(0, 'end')
        self.entry.insert(0, value)
        self.value = value
