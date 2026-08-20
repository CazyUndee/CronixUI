"""CronixUI Notification Component - Native tkinter implementation."""
import tkinter as tk
from typing import Optional
from .core import Frame, get_theme


class Notification(tk.Toplevel):
    """Auto-dismissing notification toast."""
    VARIANT_COLORS = {"info": "#23356b", "success": "#2a6b23", "warning": "#6b5a23", "error": "#6b2323"}

    def __init__(self, master, message="", title="", variant="info", duration=3000, **kwargs):
        super().__init__(master, **kwargs)
        theme = get_theme()
        self.overrideredirect(True)
        self.configure(bg=theme.surface)
        border_color = self.VARIANT_COLORS.get(variant, theme.accent)

        border = tk.Frame(self, bg=border_color, width=3)
        border.pack(side='left', fill='y')

        content = Frame(self, bg=theme.surface)
        content.pack(side='left', fill='both', expand=True, padx=12, pady=8)

        if title:
            tk.Label(content, text=title, bg=theme.surface, fg=theme.text,
                    font=(theme.font_family, 10, 'bold')).pack(anchor='w')
        tk.Label(content, text=message, bg=theme.surface, fg=theme.text_muted,
                font=(theme.font_family, 10), wraplength=280).pack(anchor='w')

        x = self.winfo_screenwidth() - 340
        self.geometry(f"+{x}+16")
        self.after(duration, self.destroy)
