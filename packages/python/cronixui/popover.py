"""CronixUI Popover Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from typing import Callable, Optional
from .core import Frame, get_theme


class Popover(tk.Toplevel):
    """Native popover that appears near a trigger widget.

    Creates a small toplevel window positioned near the trigger.

    Args:
        parent: Parent widget
        placement: Where to position (top, bottom, left, right)

    Example:
        >>> pop = Popover(root)
        >>> tk.Label(pop.content, text="Popover content").pack()
        >>> pop.show_near(widget)
    """

    def __init__(
        self,
        master: tk.Misc,
        placement: str = "bottom",
        **kwargs
    ):
        super().__init__(master, **kwargs)
        theme = get_theme()
        self.configure(bg=theme.surface)
        self.overrideredirect(True)
        self.withdraw()
        self.placement = placement
        self._is_open = False

        # Content frame
        self.content = Frame(self, bg=theme.surface)
        self.content.pack(fill='both', expand=True, padx=8, pady=8)

    def show_near(self, widget: tk.Widget) -> None:
        """Show the popover near the specified widget."""
        x = widget.winfo_rootx()
        y = widget.winfo_rooty()
        w = widget.winfo_width()
        h = widget.winfo_height()
        self.update_idletasks()
        pw = self.winfo_reqwidth()
        ph = self.winfo_reqheight()

        if self.placement == 'bottom':
            self.geometry(f"+{x}+{y + h + 4}")
        elif self.placement == 'top':
            self.geometry(f"+{x}+{y - ph - 4}")
        elif self.placement == 'left':
            self.geometry(f"+{x - pw - 4}+{y}")
        elif self.placement == 'right':
            self.geometry(f"+{x + w + 4}+{y}")

        self.deiconify()
        self._is_open = True
        self.grab_set()

    def hide(self) -> None:
        """Hide the popover."""
        self.withdraw()
        self._is_open = False
        try:
            self.grab_release()
        except tk.TclError:
            pass

    def toggle(self, widget: tk.Widget) -> None:
        """Toggle visibility near a widget."""
        if self._is_open:
            self.hide()
        else:
            self.show_near(widget)
