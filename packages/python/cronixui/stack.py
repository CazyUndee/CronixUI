"""Stack layout components for vertical and horizontal stacking."""

import tkinter as tk
from .core import Frame
from .tokens import BG


class Stack(Frame):
    """Vertical stack layout with spacing between children.

    Args:
        parent: Parent tkinter widget
        spacing: Space between items in pixels (default: 12)

    Example:
        >>> stack = Stack(root)
        >>> stack.add(Label(root, text="First"))
        >>> stack.add(Label(root, text="Second"))
        >>> stack.pack(padx=10, pady=10)
    """

    def __init__(self, parent, spacing: int = 12, **kwargs):
        super().__init__(parent, bg=BG, highlightthickness=0, **kwargs)
        self._spacing = spacing
        self._children = []

    def add(self, widget, **pack_kwargs):
        """Add a widget to the stack."""
        if self._children:
            spacer = Frame(self, height=self._spacing, bg=BG)
            spacer.pack(fill="x")
            self._children.append(spacer)
        widget.pack(fill="x", **pack_kwargs)
        self._children.append(widget)

    def clear(self):
        """Remove all children."""
        for child in self._children:
            child.destroy()
        self._children.clear()


class HStack(Frame):
    """Horizontal stack layout with spacing between children.

    Args:
        parent: Parent tkinter widget
        spacing: Space between items in pixels (default: 12)

    Example:
        >>> hstack = HStack(root)
        >>> hstack.add(Button(root, text="Cancel"))
        >>> hstack.add(Button(root, text="Save"))
        >>> hstack.pack(padx=10, pady=10)
    """

    def __init__(self, parent, spacing: int = 12, **kwargs):
        super().__init__(parent, bg=BG, highlightthickness=0, **kwargs)
        self._spacing = spacing
        self._children = []

    def add(self, widget, **pack_kwargs):
        """Add a widget to the horizontal stack."""
        if self._children:
            spacer = Frame(self, width=self._spacing, bg=BG)
            spacer.pack(side="left")
            self._children.append(spacer)
        widget.pack(side="left", **pack_kwargs)
        self._children.append(widget)

    def clear(self):
        """Remove all children."""
        for child in self._children:
            child.destroy()
        self._children.clear()
