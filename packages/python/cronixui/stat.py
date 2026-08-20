"""Stat component - displays a numeric value with label and optional delta."""

import tkinter as tk
from .core import Frame, Label
from .tokens import BG, SURFACE, TEXT, TEXT_MUTED, ACCENT, SUCCESS, ERROR, BORDER


class Stat(Frame):
    """Stat widget for displaying numeric metrics.

    Args:
        parent: Parent tkinter widget
        value: The stat value to display
        label: Label text below the value
        delta: Optional delta/change indicator (e.g. "+12%")
        delta_type: Type of delta - 'positive', 'negative', 'neutral' (default: neutral)

    Example:
        >>> stat = Stat(root, value="1,234", label="Active Users", delta="+12%", delta_type="positive")
        >>> stat.pack(padx=10, pady=5)
    """

    def __init__(self, parent, value: str = "", label: str = "", delta: str = "", delta_type: str = "neutral"):
        super().__init__(parent, bg=BG, highlightthickness=1, highlightbackground=BORDER)

        self.config(padx=16, pady=12)

        # Value
        self.value_label = Label(
            self, text=value, bg=BG, fg=TEXT,
            font=("Outfit", 28, "bold")
        )
        self.value_label.pack(anchor="w")

        # Label
        if label:
            self.label_label = Label(
                self, text=label, bg=BG, fg=TEXT_MUTED,
                font=("Outfit", 12)
            )
            self.label_label.pack(anchor="w", pady=(4, 0))

        # Delta
        if delta:
            delta_colors = {"positive": SUCCESS, "negative": ERROR, "neutral": TEXT_MUTED}
            delta_color = delta_colors.get(delta_type, TEXT_MUTED)
            self.delta_label = Label(
                self, text=delta, bg=BG, fg=delta_color,
                font=("Outfit", 11)
            )
            self.delta_label.pack(anchor="w", pady=(2, 0))

    def set_value(self, value: str):
        """Update the displayed value."""
        self.value_label.config(text=value)

    def set_delta(self, delta: str, delta_type: str = "neutral"):
        """Update the delta indicator."""
        delta_colors = {"positive": SUCCESS, "negative": ERROR, "neutral": TEXT_MUTED}
        delta_color = delta_colors.get(delta_type, TEXT_MUTED)
        if hasattr(self, 'delta_label'):
            self.delta_label.config(text=delta, fg=delta_color)
