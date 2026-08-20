"""CronixUI EmptyState Component - Native tkinter implementation."""
import tkinter as tk
from .core import Frame, get_theme


class EmptyState(Frame):
    """Empty state placeholder with icon, title, and description."""
    def __init__(self, master, icon="", title="", description="", **kwargs):
        super().__init__(master, bg=get_theme().bg, highlightthickness=0, **kwargs)
        theme = get_theme()
        if icon:
            tk.Label(self, text=icon, bg=theme.bg, font=(theme.font_family, 28)).pack(pady=(0, 8))
        tk.Label(self, text=title, bg=theme.bg, fg=theme.text,
                font=(theme.font_family, 14, 'bold')).pack()
        if description:
            tk.Label(self, text=description, bg=theme.bg, fg=theme.text_muted,
                    font=(theme.font_family, 10), wraplength=400).pack(pady=(4, 8))
