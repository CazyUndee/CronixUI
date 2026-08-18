"""CronixUI Card Component - Native tkinter implementation.

This module provides native card widgets that render as actual OS frames.
"""

from __future__ import annotations

import tkinter as tk
from tkinter import ttk
from typing import Optional

from .core import Frame, Label, get_theme


class Card(Frame):
    """Native card component with optional header, body, and footer sections.
    
    Args:
        parent: Parent widget
        title: Optional card title
        subtitle: Optional card subtitle
        clickable: Whether card should appear clickable
        body: Optional card body content (string)
        footer: Optional card footer content (string)
        
    Example:
        >>> root = tk.Tk()
        >>> card = Card(root, title="Welcome", subtitle="Getting started")
        >>> card.pack(padx=10, pady=10)
    """
    
    def __init__(
        self,
        master: tk.Misc,
        title: Optional[str] = None,
        subtitle: Optional[str] = None,
        clickable: bool = False,
        body: Optional[str] = None,
        footer: Optional[str] = None,
        **kwargs
    ):
        theme = get_theme()
        
        # Configure frame
        kwargs.setdefault('bg', theme.surface)
        kwargs.setdefault('highlightbackground', theme.surface_3)
        kwargs.setdefault('highlightthickness', 1)
        super().__init__(master, **kwargs)
        
        self.title = title
        self.subtitle = subtitle
        self.clickable = clickable
        self._on_click_callback = None
        
        # Build card layout
        self._build_layout(body, footer)
        
        # Bind click events if clickable
        if clickable:
            self.bind('<Button-1>', self._on_click)
            self.bind('<Enter>', self._on_enter)
            self.bind('<Leave>', self._on_leave)
            self.configure(cursor='hand2')
    
    def _build_layout(self, body: Optional[str], footer: Optional[str]) -> None:
        """Build the card layout."""
        # Header
        if self.title or self.subtitle:
            header = Frame(self, bg=self.cget('bg'))
            header.pack(fill='x', padx=12, pady=(12, 0))
            
            if self.title:
                title_label = Label(
                    header,
                    text=self.title,
                    font=(get_theme().font_family, 14, 'bold'),
                    bg=self.cget('bg'),
                    fg=get_theme().text
                )
                title_label.pack(anchor='w')
            
            if self.subtitle:
                subtitle_label = Label(
                    header,
                    text=self.subtitle,
                    font=(get_theme().font_family, 11),
                    bg=self.cget('bg'),
                    fg=get_theme().text_muted if hasattr(get_theme(), 'text_muted') else get_theme().text
                )
                subtitle_label.pack(anchor='w')
        
        # Body
        if body:
            body_frame = Frame(self, bg=self.cget('bg'))
            body_frame.pack(fill='both', expand=True, padx=12, pady=8)
            
            body_label = Label(
                body_frame,
                text=body,
                font=(get_theme().font_family, 12),
                bg=self.cget('bg'),
                fg=get_theme().text,
                wraplength=280,
                justify='left'
            )
            body_label.pack(fill='both', expand=True)
        
        # Footer
        if footer:
            footer_frame = Frame(self, bg=self.cget('bg'))
            footer_frame.pack(fill='x', padx=12, pady=(0, 12))
            
            footer_label = Label(
                footer_frame,
                text=footer,
                font=(get_theme().font_family, 11),
                bg=self.cget('bg'),
                fg=get_theme().text_muted if hasattr(get_theme(), 'text_muted') else get_theme().text
            )
            footer_label.pack(anchor='e')
    
    def on_click(self, callback) -> None:
        """Set click handler for clickable cards."""
        self._on_click_callback = callback
    
    def _on_click(self, event) -> None:
        if self._on_click_callback:
            self._on_click_callback()
    
    def _on_enter(self, event) -> None:
        if self.clickable:
            theme = get_theme()
            self.configure(highlightbackground=theme.accent)
    
    def _on_leave(self, event) -> None:
        if self.clickable:
            theme = get_theme()
            self.configure(highlightbackground=theme.surface_3)
    
    def set_title(self, title: str) -> None:
        """Update card title."""
        self.title = title
        # Would need to rebuild layout for dynamic updates
    
    def set_subtitle(self, subtitle: str) -> None:
        """Update card subtitle."""
        self.subtitle = subtitle
    
    def set_body(self, body: str) -> None:
        """Update card body."""
        # Would need to rebuild layout for dynamic updates
        pass


class CardIcon(Frame):
    """Card variant with an icon display.
    
    Args:
        parent: Parent widget
        icon_text: Icon text/emoji (for now)
        title: Optional card title
        subtitle: Optional card subtitle
        
    Example:
        >>> root = tk.Tk()
        >>> card = CardIcon(root, icon_text="⚙️", title="Settings")
        >>> card.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        icon_text: str,
        title: Optional[str] = None,
        subtitle: Optional[str] = None,
        **kwargs
    ):
        theme = get_theme()
        
        kwargs.setdefault('bg', theme.surface)
        kwargs.setdefault('highlightbackground', theme.surface_3)
        kwargs.setdefault('highlightthickness', 1)
        super().__init__(master, **kwargs)
        
        if not icon_text:
            raise ValueError("icon_text cannot be empty")
        
        self.icon_text = icon_text
        self.title = title
        self.subtitle = subtitle
        
        self._build_layout()
    
    def _build_layout(self) -> None:
        """Build the icon card layout."""
        # Icon
        icon_label = Label(
            self,
            text=self.icon_text,
            font=(get_theme().font_family, 24),
            bg=self.cget('bg'),
            fg=get_theme().accent
        )
        icon_label.pack(pady=(16, 8))
        
        # Title
        if self.title:
            title_label = Label(
                self,
                text=self.title,
                font=(get_theme().font_family, 14, 'bold'),
                bg=self.cget('bg'),
                fg=get_theme().text
            )
            title_label.pack()
        
        # Subtitle
        if self.subtitle:
            subtitle_label = Label(
                self,
                text=self.subtitle,
                font=(get_theme().font_family, 11),
                bg=self.cget('bg'),
                fg=get_theme().text_muted if hasattr(get_theme(), 'text_muted') else get_theme().text
            )
            subtitle_label.pack(pady=(0, 16))
