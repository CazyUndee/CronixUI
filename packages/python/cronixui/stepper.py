"""CronixUI Stepper Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from tkinter import ttk
from typing import Callable, List, Dict, Optional
from .core import Frame, get_theme


class Stepper(Frame):
    """Native step indicator with numbered steps and completion tracking.

    Args:
        parent: Parent widget
        steps: List of dicts with 'label' and optional 'description'
        current_step: Index of the current active step
        on_step_click: Optional callback when a step is clicked

    Example:
        >>> stepper = Stepper(root, steps=[{"label": "Step 1"}, {"label": "Step 2"}], current_step=0)
        >>> stepper.pack()
    """

    def __init__(
        self,
        master: tk.Misc,
        steps: List[Dict[str, str]] = None,
        current_step: int = 0,
        on_step_click: Optional[Callable] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        theme = get_theme()
        self.steps = steps or []
        self.current_step = current_step
        self.on_step_click = on_step_click
        self._step_frames = []
        self._step_labels = []
        self._step_numbers = []
        self._build_ui()

    def _build_ui(self):
        theme = get_theme()
        for i, step in enumerate(self.steps):
            col_frame = Frame(self)
            col_frame.pack(side='left', padx=10)

            # Number indicator
            is_completed = i < self.current_step
            is_active = i == self.current_step
            indicator = tk.Label(
                col_frame,
                text="✓" if is_completed else str(i + 1),
                width=3, height=1,
                bg=theme.success if is_completed else (theme.accent if is_active else theme.surface_3),
                fg=theme.text if is_active or is_completed else theme.text_muted,
                font=(theme.font_family, 11, 'bold'),
                relief='solid', bd=1,
            )
            indicator.pack()
            if self.on_step_click:
                indicator.bind('<Button-1>', lambda e, idx=i: self.on_step_click(idx))
                indicator.configure(cursor='hand2')

            # Label
            label_text = step.get('label', '')
            lbl = tk.Label(
                col_frame, text=label_text,
                bg=theme.bg, fg=theme.text if is_active else theme.text_muted,
                font=(theme.font_family, 10, 'bold' if is_active else 'normal'),
            )
            lbl.pack(pady=(4, 0))

            # Description
            desc = step.get('description', '')
            if desc:
                tk.Label(
                    col_frame, text=desc,
                    bg=theme.bg, fg=theme.text_muted,
                    font=(theme.font_family, 9),
                ).pack()

            self._step_frames.append(col_frame)
            self._step_labels.append(lbl)
            self._step_numbers.append(indicator)

            # Connector line (not after last step)
            if i < len(self.steps) - 1:
                connector = tk.Frame(self, height=2, bg=theme.success if is_completed else theme.surface_3)
                connector.pack(side='left', fill='x', expand=True, pady=18)

    def set_step(self, step: int) -> None:
        """Move to a specific step index."""
        self.current_step = step
        for widget in self.winfo_children():
            widget.destroy()
        self._build_ui()
