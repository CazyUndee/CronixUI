"""CronixUI Timeline Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from typing import Callable, Dict, List, Optional
from .core import Frame, get_theme


class Timeline(Frame):
    """Native vertical timeline with dots, lines, and content.

    Args:
        parent: Parent widget
        items: List of dicts with 'title', optional 'description', 'timestamp', 'variant'

    Example:
        >>> timeline = Timeline(root, items=[
        ...     {"title": "Created", "description": "Issue opened", "timestamp": "2h ago"},
        ...     {"title": "Assigned", "timestamp": "1h ago", "variant": "success"},
        ... ])
        >>> timeline.pack()
    """

    VARIANT_COLORS = {
        "success": "#2a6b23",
        "warning": "#6b5a23",
        "error": "#6b2323",
        "info": "#23356b",
        "default": "#6b2323",
    }

    def __init__(
        self,
        master: tk.Misc,
        items: List[Dict] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        theme = get_theme()
        self.items = items or []

        for i, item in enumerate(self.items):
            row = Frame(self)
            row.pack(fill='x', pady=(0, 16))

            # Left column: dot + line
            left = Frame(row, width=24)
            left.pack(side='left', fill='y')
            left.pack_propagate(False)

            variant = item.get('variant', 'default')
            dot_color = self.VARIANT_COLORS.get(variant, theme.accent)

            dot = tk.Canvas(left, width=12, height=12, bg=theme.bg, highlightthickness=0)
            dot.create_oval(0, 0, 12, 12, fill=dot_color, outline='')
            dot.pack(pady=(4, 0))

            if i < len(self.items) - 1:
                line = tk.Frame(left, width=2, bg=theme.surface_3)
                line.pack(fill='y', expand=True, pady=(2, 0))

            # Right column: content
            right = Frame(row)
            right.pack(side='left', fill='x', expand=True)

            header = Frame(right)
            header.pack(fill='x')

            tk.Label(
                header, text=item.get('title', ''),
                bg=theme.bg, fg=theme.text,
                font=(theme.font_family, 11, 'bold'),
            ).pack(side='left')

            timestamp = item.get('timestamp', '')
            if timestamp:
                tk.Label(
                    header, text=timestamp,
                    bg=theme.bg, fg=theme.text_muted,
                    font=(theme.font_family, 9),
                ).pack(side='right')

            desc = item.get('description', '')
            if desc:
                tk.Label(
                    right, text=desc,
                    bg=theme.bg, fg=theme.text_muted,
                    font=(theme.font_family, 10),
                    wraplength=400, justify='left',
                ).pack(anchor='w', pady=(2, 0))
