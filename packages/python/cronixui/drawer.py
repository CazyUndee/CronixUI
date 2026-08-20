"""CronixUI Drawer Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from typing import Callable, Optional
from .core import Frame, get_theme


class Drawer(tk.Toplevel):
    """Native drawer/panel that slides in from a side.

    This creates a toplevel window positioned to simulate a slide-in drawer.

    Args:
        parent: Parent widget
        title: Drawer title
        side: Which side to appear from (right, left, top, bottom)
        size: Drawer width in pixels

    Example:
        >>> drawer = Drawer(root, title="Settings")
        >>> tk.Label(drawer.content, text="Hello!").pack()
        >>> drawer.open()
    """

    def __init__(
        self,
        master: tk.Misc,
        title: str = "",
        side: str = "right",
        size: int = 400,
        on_close: Optional[Callable] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        theme = get_theme()
        self.title("")
        self.configure(bg=theme.surface)
        self.overrideredirect(True)
        self.withdraw()
        self.side = side
        self.size = size
        self.on_close = on_close
        self._is_open = False

        # Header
        header = Frame(self, bg=theme.surface)
        header.pack(fill='x', padx=16, pady=(12, 8))

        if title:
            tk.Label(
                header, text=title, bg=theme.surface, fg=theme.text,
                font=(theme.font_family, 14, 'bold'),
            ).pack(side='left')

        close_btn = tk.Label(
            header, text="✕", bg=theme.surface, fg=theme.text_muted,
            font=(theme.font_family, 14), cursor='hand2',
        )
        close_btn.pack(side='right')
        close_btn.bind('<Button-1>', lambda e: self.close())

        # Separator
        tk.Frame(self, height=1, bg=theme.border).pack(fill='x')

        # Content area
        self.content = Frame(self, bg=theme.surface)
        self.content.pack(fill='both', expand=True, padx=16, pady=8)

    def open(self) -> None:
        """Show the drawer."""
        self.update_idletasks()
        w = self.winfo_screenwidth()
        h = self.winfo_screenheight()
        if self.side == 'right':
            x = w - self.size
            self.geometry(f"{self.size}x{h}+{x}+0")
        elif self.side == 'left':
            self.geometry(f"{self.size}x{h}+0+0")
        self.deiconify()
        self._is_open = True
        self.grab_set()

    def close(self) -> None:
        """Hide the drawer."""
        self.withdraw()
        self._is_open = False
        self.grab_release()
        if self.on_close:
            self.on_close()

    def toggle(self) -> None:
        """Toggle the drawer open/closed."""
        if self._is_open:
            self.close()
        else:
            self.open()
