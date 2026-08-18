"""CronixUI Modal Component - Native tkinter implementation.

This module provides native modal dialogs using tkinter.Toplevel.
"""

from __future__ import annotations

import tkinter as tk
from typing import Optional, Callable

from .core import Frame, Label, Button, get_theme


class Modal(tk.Toplevel):
    """Native modal dialog window.
    
    Args:
        parent: Parent window
        title: Modal title
        size: Tuple of (width, height)
        on_close: Optional callback when modal is closed
        
    Example:
        >>> root = tk.Tk()
        >>> modal = Modal(root, title="Confirm Action")
        >>> modal.add_label("Are you sure?")
        >>> modal.add_button("OK", command=modal.close)
        >>> modal.show()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        title: str = "Modal",
        size: tuple = (400, 300),
        on_close: Optional[Callable] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        
        theme = get_theme()
        
        # Configure modal window
        self.title(title)
        self.geometry(f"{size[0]}x{size[1]}")
        self.configure(bg=theme.bg)
        self.resizable(False, False)
        self.transient(master)
        self.grab_set()
        
        # Center on parent
        self.update_idletasks()
        x = master.winfo_x() + (master.winfo_width() - size[0]) // 2
        y = master.winfo_y() + (master.winfo_height() - size[1]) // 2
        self.geometry(f"+{x}+{y}")
        
        self.on_close = on_close
        
        # Main content frame
        self.content_frame = Frame(self, bg=theme.bg)
        self.content_frame.pack(fill='both', expand=True, padx=20, pady=20)
        
        # Title
        self.title_label = Label(
            self.content_frame,
            text=title,
            font=(theme.font_family, 16, 'bold'),
            bg=theme.bg,
            fg=theme.text
        )
        self.title_label.pack(pady=(0, 16))
        
        # Button frame
        self.button_frame = Frame(self.content_frame, bg=theme.bg)
        self.button_frame.pack(side='bottom', fill='x')
        
        # Bind close
        self.protocol("WM_DELETE_WINDOW", self.close)
    
    def add_label(self, text: str, **kwargs) -> Label:
        """Add a label to the modal."""
        theme = get_theme()
        label = Label(
            self.content_frame,
            text=text,
            font=kwargs.get('font', (theme.font_family, 12)),
            bg=kwargs.get('bg', theme.bg),
            fg=kwargs.get('fg', theme.text),
            wraplength=kwargs.get('wraplength', 350),
            justify=kwargs.get('justify', 'center')
        )
        label.pack(pady=8)
        return label
    
    def add_button(
        self,
        text: str,
        command: Optional[Callable] = None,
        variant: str = "default",
        side: str = 'right'
    ) -> Button:
        """Add a button to the modal footer."""
        btn = Button(
            self.button_frame,
            text=text,
            command=command,
            variant=variant
        )
        btn.pack(side=side, padx=4)
        return btn
    
    def show(self) -> None:
        """Show the modal."""
        self.deiconify()
        self.wait_window()
    
    def close(self) -> None:
        """Close the modal."""
        if self.on_close:
            self.on_close()
        self.grab_release()
        self.destroy()
    
    def set_title(self, title: str) -> None:
        """Update modal title."""
        self.title_label.configure(text=title)
        self.title(title)
