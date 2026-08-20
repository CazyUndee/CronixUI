"""CronixUI TreeView Component - Native tkinter implementation."""

from __future__ import annotations
import tkinter as tk
from typing import Callable, Dict, List, Optional
from .core import Frame, get_theme


class TreeView(Frame):
    """Native tree view with expandable/collapsible nodes.

    Args:
        parent: Parent widget
        nodes: List of dicts with 'id', 'label', optional 'children' list
        on_select: Callback when a node is selected

    Example:
        >>> tree = TreeView(root, nodes=[
        ...     {"id": "1", "label": "Folder", "children": [
        ...         {"id": "1-1", "label": "File A"},
        ...         {"id": "1-2", "label": "File B"},
        ...     ]},
        ...     {"id": "2", "label": "Another Folder"},
        ... ])
        >>> tree.pack()
    """

    def __init__(
        self,
        master: tk.Misc,
        nodes: List[Dict] = None,
        on_select: Optional[Callable] = None,
        **kwargs
    ):
        super().__init__(master, bg=get_theme().bg, highlightthickness=0, **kwargs)
        theme = get_theme()
        self.nodes = nodes or []
        self.on_select = on_select
        self._selected = None
        self._build_tree(self.nodes, self, level=0)

    def _build_tree(self, nodes, parent, level):
        theme = get_theme()
        for node in nodes:
            row = Frame(parent, bg=theme.bg)
            row.pack(fill='x', padx=(level * 16, 0))

            children = node.get('children', [])
            has_children = len(children) > 0
            toggle_text = '▼' if has_children else '  '

            toggle = tk.Label(row, text=toggle_text, bg=theme.bg, fg=theme.text_muted,
                              font=(theme.font_family, 9), width=2)
            toggle.pack(side='left')

            lbl = tk.Label(row, text=node['label'], bg=theme.bg, fg=theme.text,
                          font=(theme.font_family, 10), anchor='w', cursor='hand2')
            lbl.pack(side='left', fill='x', expand=True)

            def make_handler(nid=node['id']):
                def handler(e):
                    self._selected = nid
                    if self.on_select:
                        self.on_select(nid)
                return handler

            lbl.bind('<Button-1>', make_handler())
