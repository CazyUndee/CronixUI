#!/usr/bin/env python3
"""CronixUI Native tkinter Demo App.

Run this to see all native components in action:
    python demo.py
"""

import tkinter as tk
from cronixui import (
    Button, ButtonGroup, Card, CardIcon, Modal, Toggle,
    Input, Textarea, Checkbox, Radio, Select, Slider, FileInput,
    Frame, Label, get_theme, set_theme, Theme,
)


class CronixDemo:
    """Demo application showcasing CronixUI native components."""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("CronixUI Native Demo")
        self.root.geometry("800x600")
        self.root.configure(bg=get_theme().bg)
        
        self._build_ui()
    
    def _build_ui(self):
        """Build the demo UI."""
        # Header
        header = Frame(self.root, bg=get_theme().bg)
        header.pack(fill='x', padx=20, pady=(20, 10))
        
        title = Label(
            header,
            text="🎨 CronixUI Native Demo",
            font=(get_theme().font_family, 24, 'bold'),
            bg=get_theme().bg,
            fg=get_theme().text
        )
        title.pack(anchor='w')
        
        subtitle = Label(
            header,
            text="Pure tkinter implementation - No HTML generation!",
            font=(get_theme().font_family, 12),
            bg=get_theme().bg,
            fg=get_theme().text_muted if hasattr(get_theme(), 'text_muted') else get_theme().text
        )
        subtitle.pack(anchor='w')
        
        # Main content area
        main_frame = Frame(self.root, bg=get_theme().bg)
        main_frame.pack(fill='both', expand=True, padx=20, pady=10)
        
        # Left column - Buttons & Forms
        left_frame = Frame(main_frame, bg=get_theme().bg)
        left_frame.pack(side='left', fill='both', expand=True, padx=(0, 10))
        
        self._build_buttons_section(left_frame)
        self._build_forms_section(left_frame)
        
        # Right column - Cards & Others
        right_frame = Frame(main_frame, bg=get_theme().bg)
        right_frame.pack(side='right', fill='both', expand=True, padx=(10, 0))
        
        self._build_cards_section(right_frame)
        self._build_toggle_section(right_frame)
    
    def _build_buttons_section(self, parent):
        """Build buttons demo section."""
        card = Card(parent, title="Buttons")
        card.pack(fill='x', pady=(0, 10))
        
        btn_frame = Frame(card, bg=get_theme().bg)
        btn_frame.pack(fill='x', padx=12, pady=8)
        
        # Row 1 - Variants
        row1 = Frame(btn_frame, bg=get_theme().bg)
        row1.pack(fill='x', pady=(0, 8))
        
        Button(row1, text="Default", command=lambda: print("Default clicked")).pack(side='left', padx=4)
        Button(row1, text="Primary", variant="primary", command=lambda: print("Primary clicked")).pack(side='left', padx=4)
        Button(row1, text="Danger", variant="danger", command=lambda: print("Danger clicked")).pack(side='left', padx=4)
        Button(row1, text="Success", variant="success", command=lambda: print("Success clicked")).pack(side='left', padx=4)
        
        # Row 2 - Sizes
        row2 = Frame(btn_frame, bg=get_theme().bg)
        row2.pack(fill='x')
        
        Button(row2, text="Small", size="sm").pack(side='left', padx=4)
        Button(row2, text="Medium").pack(side='left', padx=4)
        Button(row2, text="Large", size="lg").pack(side='left', padx=4)
        Button(row2, text="Disabled", disabled=True).pack(side='left', padx=4)
    
    def _build_forms_section(self, parent):
        """Build forms demo section."""
        card = Card(parent, title="Form Elements")
        card.pack(fill='x', pady=(0, 10))
        
        form_frame = Frame(card, bg=get_theme().bg)
        form_frame.pack(fill='x', padx=12, pady=8)
        
        Input(form_frame, placeholder="Enter your name...").pack(fill='x', pady=(0, 8))
        Textarea(form_frame, placeholder="Write a message...", height=3).pack(fill='x', pady=(0, 8))
        
        check_frame = Frame(form_frame, bg=get_theme().bg)
        check_frame.pack(fill='x', pady=(0, 8))
        Checkbox(check_frame, label="Accept terms").pack(side='left')
        Checkbox(check_frame, label="Subscribe", initial_state=True).pack(side='left', padx=20)
        
        Select(form_frame, options=["Python", "Rust", "Go", "TypeScript"]).pack(fill='x', pady=(0, 8))
        Slider(form_frame, min_value=0, max_value=100, initial=50).pack(fill='x')
    
    def _build_cards_section(self, parent):
        """Build cards demo section."""
        # Basic card
        Card(parent, title="Basic Card", body="This is a native tkinter card component.").pack(fill='x', pady=(0, 10))
        
        # Card with subtitle
        Card(
            parent,
            title="Feature Card",
            subtitle="With subtitle",
            body="Cards support titles, subtitles, and body content."
        ).pack(fill='x', pady=(0, 10))
        
        # Icon card
        CardIcon(parent, icon_text="🚀", title="Performance", subtitle="Lightning fast").pack(fill='x', pady=(0, 10))
        
        # Clickable card
        card = Card(parent, title="Clickable Card", body="Click me!", clickable=True)
        card.on_click(lambda: print("Card clicked!"))
        card.pack(fill='x', pady=(0, 10))
    
    def _build_toggle_section(self, parent):
        """Build toggle demo section."""
        card = Card(parent, title="Toggle & More")
        card.pack(fill='x', pady=(0, 10))
        
        toggle_frame = Frame(card, bg=get_theme().bg)
        toggle_frame.pack(fill='x', padx=12, pady=8)
        
        Label(toggle_frame, text="Dark Mode:", bg=get_theme().bg, fg=get_theme().text).pack(anchor='w')
        Toggle(toggle_frame, initial_state=True, on_change=lambda s: print(f"Dark mode: {s}")).pack(anchor='w', pady=(0, 8))
        
        Label(toggle_frame, text="Notifications:", bg=get_theme().bg, fg=get_theme().text).pack(anchor='w')
        Toggle(toggle_frame, initial_state=False, on_change=lambda s: print(f"Notifications: {s}")).pack(anchor='w')
        
        # Button to open modal
        def open_modal():
            modal = Modal(self.root, title="Modal Dialog", size=(300, 200))
            modal.add_label("This is a native tkinter modal!")
            modal.add_button("Close", command=modal.close, variant="primary")
            modal.show()
        
        Button(toggle_frame, text="Open Modal", variant="primary", command=open_modal).pack(anchor='w', pady=(8, 0))
    
    def run(self):
        """Run the demo application."""
        self.root.mainloop()


if __name__ == "__main__":
    app = CronixDemo()
    app.run()
