"""Tag component - native tkinter label with optional remove button."""

import tkinter as tk
from .core import Frame, Label
from .tokens import BG, SURFACE_2, TEXT, TEXT_MUTED, ACCENT, BORDER


class Tag(Frame):
    """Native tkinter Tag widget for labels with optional removal.

    Args:
        parent: Parent tkinter widget
        text: Tag text content
        on_remove: Optional callback when remove is clicked
        bg_color: Optional background color override
        fg_color: Optional text color override

    Example:
        >>> tag = Tag(root, text="Python")
        >>> tag.pack(padx=4, pady=2, side="left")

        >>> removable = Tag(root, text="JavaScript", on_remove=lambda: print("removed"))
        >>> removable.pack(padx=4, pady=2, side="left")
    """

    def __init__(self, parent, text: str = "", on_remove=None,
                 bg_color=None, fg_color=None, **kwargs):
        super().__init__(parent, bg=bg_color or SURFACE_2, highlightthickness=0, **kwargs)

        self._on_remove = on_remove

        self.config(padx=8, pady=2)

        # Text
        self.text_label = Label(
            self, text=text, bg=bg_color or SURFACE_2, fg=fg_color or TEXT,
            font=("Outfit", 10)
        )
        self.text_label.pack(side="left")

        # Remove button
        if on_remove:
            self.remove_btn = Label(
                self, text="✕", bg=bg_color or SURFACE_2, fg=TEXT_MUTED,
                font=("Outfit", 10), cursor="hand2"
            )
            self.remove_btn.pack(side="left", padx=(6, 0))
            self.remove_btn.bind("<Button-1>", lambda e: on_remove())

    def set_text(self, text: str):
        """Update the tag text."""
        self.text_label.config(text=text)
