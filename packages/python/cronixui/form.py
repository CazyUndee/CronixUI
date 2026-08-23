"""CronixUI Form Components - Native tkinter implementation.

This module provides native form widgets (Input, Textarea, Checkbox, Radio, Select, Slider).
"""

from __future__ import annotations

import tkinter as tk
from tkinter import ttk
from typing import Callable, List, Optional

from .core import Frame, Label, Entry, get_theme


class Input(Entry):
    """Native text input field.
    
    Args:
        parent: Parent widget
        placeholder: Placeholder text
        **kwargs: Additional entry options
        
    Example:
        >>> root = tk.Tk()
        >>> entry = Input(root, placeholder="Enter your name...")
        >>> entry.pack()
    """
    
    def __init__(self, master: tk.Misc, placeholder: str = "", **kwargs):
        theme = get_theme()
        self.placeholder = placeholder
        self.placeholder_active = False
        
        # Configure entry
        kwargs.setdefault('bg', theme.surface_2)
        kwargs.setdefault('fg', theme.text)
        kwargs.setdefault('insertbackground', theme.text)
        kwargs.setdefault('font', (theme.font_family, 12))
        kwargs.setdefault('relief', 'flat')
        kwargs.setdefault('borderwidth', 1)
        kwargs.setdefault('highlightbackground', theme.surface_3)
        kwargs.setdefault('highlightthickness', 1)
        
        super().__init__(master, **kwargs)
        
        # Show placeholder if empty
        if placeholder:
            self._show_placeholder()
            self.bind('<FocusIn>', self._on_focus_in)
            self.bind('<FocusOut>', self._on_focus_out)
    
    def _show_placeholder(self) -> None:
        """Show placeholder text."""
        if not self.get():
            self.placeholder_active = True
            self.configure(fg='#666666')
            self.insert(0, self.placeholder)
            self.icursor(0)
    
    def _hide_placeholder(self) -> None:
        """Hide placeholder text."""
        if self.placeholder_active:
            self.placeholder_active = False
            self.delete(0, 'end')
            self.configure(fg=get_theme().text)
    
    def _on_focus_in(self, event) -> None:
        self._hide_placeholder()
    
    def _on_focus_out(self, event) -> None:
        self._show_placeholder()
    
    def get_value(self) -> str:
        """Get current value (excluding placeholder)."""
        if self.placeholder_active:
            return ""
        return self.get()


class Textarea(Frame):
    """Native multiline text input.
    
    Args:
        parent: Parent widget
        placeholder: Placeholder text
        height: Number of lines high
        **kwargs: Additional options
        
    Example:
        >>> root = tk.Tk()
        >>> textarea = Textarea(root, placeholder="Enter text...", height=5)
        >>> textarea.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        placeholder: str = "",
        height: int = 4,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        
        theme = get_theme()
        self.placeholder = placeholder
        self.placeholder_active = False
        
        # Text widget with scrollbar
        self.text = tk.Text(
            self,
            bg=theme.surface_2,
            fg=theme.text,
            insertbackground=theme.text,
            font=(theme.font_family, 12),
            relief='flat',
            borderwidth=1,
            highlightbackground=theme.surface_3,
            highlightthickness=1,
            height=height,
            wrap='word'
        )
        
        self.scrollbar = tk.Scrollbar(self, command=self.text.yview)
        self.text.configure(yscrollcommand=self.scrollbar.set)
        
        self.text.pack(side='left', fill='both', expand=True)
        self.scrollbar.pack(side='right', fill='y')
        
        # Show placeholder
        if placeholder:
            self._show_placeholder()
            self.text.bind('<FocusIn>', self._on_focus_in)
            self.text.bind('<FocusOut>', self._on_focus_out)
    
    def _show_placeholder(self) -> None:
        """Show placeholder text."""
        if not self.text.get('1.0', 'end-1c').strip():
            self.placeholder_active = True
            self.text.configure(fg='#666666')
            self.text.insert('1.0', self.placeholder)
            self.text.tag_add('placeholder', '1.0', 'end')
    
    def _hide_placeholder(self) -> None:
        """Hide placeholder text."""
        if self.placeholder_active:
            self.placeholder_active = False
            self.text.delete('1.0', 'end')
            self.text.configure(fg=get_theme().text)
    
    def _on_focus_in(self, event) -> None:
        self._hide_placeholder()
    
    def _on_focus_out(self, event) -> None:
        self._show_placeholder()
    
    def get_value(self) -> str:
        """Get current value."""
        if self.placeholder_active:
            return ""
        return self.text.get('1.0', 'end-1c')


class Checkbox(Frame):
    """Native checkbox widget.
    
    Args:
        parent: Parent widget
        label: Checkbox label
        initial_state: Initial state (True/False)
        on_change: Callback when state changes
        
    Example:
        >>> root = tk.Tk()
        >>> cb = Checkbox(root, label="Accept terms", on_change=lambda s: print(s))
        >>> cb.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        label: str = "",
        initial_state: bool = False,
        on_change: Optional[Callable[[bool], None]] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        
        self.var = tk.BooleanVar(value=initial_state)
        self.on_change = on_change
        
        theme = get_theme()
        
        self.checkbutton = tk.Checkbutton(
            self,
            text=label,
            variable=self.var,
            command=self._on_change,
            bg=theme.surface,
            fg=theme.text,
            selectcolor=theme.surface_3,
            activebackground=theme.surface,
            activeforeground=theme.text,
            font=(theme.font_family, 12),
            relief='flat',
            highlightthickness=0
        )
        self.checkbutton.pack(anchor='w')
    
    def _on_change(self) -> None:
        if self.on_change:
            self.on_change(self.var.get())
    
    def get_state(self) -> bool:
        return self.var.get()
    
    def set_state(self, state: bool) -> None:
        self.var.set(state)


class Radio(Frame):
    """Native radio button group.
    
    Args:
        parent: Parent widget
        options: List of option strings
        initial: Initial selection
        on_change: Callback when selection changes
        
    Example:
        >>> root = tk.Tk()
        >>> radio = Radio(root, options=["A", "B", "C"], on_change=lambda s: print(s))
        >>> radio.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        options: List[str] = None,
        initial: str = "",
        on_change: Optional[Callable[[str], None]] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        
        self.options = options or []
        self.var = tk.StringVar(value=initial)
        self.on_change = on_change
        
        theme = get_theme()
        
        for option in self.options:
            rb = tk.Radiobutton(
                self,
                text=option,
                variable=self.var,
                value=option,
                command=self._on_change,
                bg=theme.surface,
                fg=theme.text,
                selectcolor=theme.surface_3,
                activebackground=theme.surface,
                activeforeground=theme.text,
                font=(theme.font_family, 12),
                relief='flat',
                highlightthickness=0
            )
            rb.pack(anchor='w')
    
    def _on_change(self) -> None:
        if self.on_change:
            self.on_change(self.var.get())
    
    def get_value(self) -> str:
        return self.var.get()
    
    def set_value(self, value: str) -> None:
        self.var.set(value)


class Select(Frame):
    """Native dropdown select.
    
    Args:
        parent: Parent widget
        options: List of option strings
        placeholder: Placeholder text
        on_change: Callback when selection changes
        
    Example:
        >>> root = tk.Tk()
        >>> select = Select(root, options=["Option 1", "Option 2"], on_change=lambda s: print(s))
        >>> select.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        options: List[str] = None,
        placeholder: str = "Select...",
        on_change: Optional[Callable[[str], None]] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        
        self.options = options or []
        self.placeholder = placeholder
        self.on_change = on_change
        
        theme = get_theme()
        
        self.var = tk.StringVar()
        self.combobox = ttk.Combobox(
            self,
            textvariable=self.var,
            values=self.options,
            state='readonly',
            font=(theme.font_family, 12)
        )
        self.combobox.pack(fill='x')
        
        # Set placeholder
        if placeholder:
            self.var.set(placeholder)
        
        # Bind selection
        self.combobox.bind('<<ComboboxSelected>>', self._on_change)
    
    def _on_change(self, event) -> None:
        if self.on_change:
            value = self.var.get()
            if value != self.placeholder:
                self.on_change(value)
    
    def get_value(self) -> str:
        value = self.var.get()
        if value == self.placeholder:
            return ""
        return value
    
    def set_value(self, value: str) -> None:
        self.var.set(value)


class Slider(Frame):
    """Native slider widget.
    
    Args:
        parent: Parent widget
        min_value: Minimum value
        max_value: Maximum value
        initial: Initial value
        on_change: Callback when value changes
        
    Example:
        >>> root = tk.Tk()
        >>> slider = Slider(root, min_value=0, max_value=100, on_change=lambda v: print(v))
        >>> slider.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        min_value: float = 0,
        max_value: float = 100,
        initial: float = 50,
        on_change: Optional[Callable[[float], None]] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        
        self.min_value = min_value
        self.max_value = max_value
        self.on_change = on_change
        
        theme = get_theme()
        
        self.var = tk.DoubleVar(value=initial)
        
        self.scale = tk.Scale(
            self,
            from_=min_value,
            to=max_value,
            variable=self.var,
            orient='horizontal',
            command=self._on_change,
            bg=theme.surface,
            fg=theme.text,
            troughcolor=theme.surface_3,
            highlightthickness=0,
            font=(theme.font_family, 10)
        )
        self.scale.pack(fill='x')
    
    def _on_change(self, value) -> None:
        if self.on_change:
            self.on_change(float(value))
    
    def get_value(self) -> float:
        return self.var.get()
    
    def set_value(self, value: float) -> None:
        self.var.set(value)


class FormGroup(Frame):
    """Form group with label, help text, and error display.

    Args:
        parent: Parent widget
        label: Label text
        help_text: Optional help text
        required: Whether the field is required

    Example:
        >>> root = tk.Tk()
        >>> group = FormGroup(root, label="Email", required=True)
        >>> entry = Input(group, placeholder="you@example.com")
        >>> group.pack()
    """

    def __init__(
        self,
        master: tk.Misc,
        label: str = "",
        help_text: str = "",
        required: bool = False,
        **kwargs
    ):
        super().__init__(master, **kwargs)

        theme = get_theme()
        self.label_text = label
        self.help_text = help_text
        self.required = required

        # Label
        if label:
            label_display = f"{label} *" if required else label
            self._label = Label(
                self,
                text=label_display,
                font=(theme.font_family, 12, 'bold'),
                bg=theme.surface,
                fg=theme.text,
            )
            self._label.pack(anchor='w', pady=(0, 4))

        # Content container
        self.content_frame = Frame(self, bg=theme.surface)
        self.content_frame.pack(fill='both', expand=True)

        # Help text
        self._help_label = None
        if help_text:
            self._help_label = Label(
                self,
                text=help_text,
                font=(theme.font_family, 10),
                bg=theme.surface,
                fg=theme.text_muted if hasattr(theme, 'text_muted') else theme.text,
            )
            self._help_label.pack(anchor='w', pady=(2, 0))

        # Error label (hidden by default)
        self._error_label = Label(
            self,
            text="",
            font=(theme.font_family, 10),
            bg=theme.surface,
            fg=theme.error,
        )

    def add_widget(self, widget: tk.Widget) -> None:
        """Add a widget to the content area."""
        widget.pack(in_=self.content_frame, fill='x', expand=True)

    def set_error(self, error: str) -> None:
        """Show an error message."""
        if self._help_label:
            self._help_label.pack_forget()
        self._error_label.configure(text=error)
        self._error_label.pack(anchor='w', pady=(2, 0))

    def clear_error(self) -> None:
        """Clear the error message."""
        self._error_label.pack_forget()
        if self._help_label:
            self._help_label.pack(anchor='w', pady=(2, 0))

    def get_value(self) -> str:
        """Get the value of the first child entry widget."""
        for child in self.content_frame.winfo_children():
            if hasattr(child, 'get_value'):
                return child.get_value()
            elif hasattr(child, 'get'):
                return child.get()
        return ""


class FileInput(Frame):
    """Native file input widget.
    
    Args:
        parent: Parent widget
        on_select: Callback when file is selected
        
    Example:
        >>> root = tk.Tk()
        >>> file_input = FileInput(root, on_select=lambda p: print(p))
        >>> file_input.pack()
    """
    
    def __init__(
        self,
        master: tk.Misc,
        on_select: Optional[Callable[[str], None]] = None,
        **kwargs
    ):
        super().__init__(master, **kwargs)
        
        self.on_select = on_select
        self.file_path = ""
        
        theme = get_theme()
        
        # Path display
        self.path_var = tk.StringVar(value="No file selected")
        self.path_label = Label(
            self,
            textvariable=self.path_var,
            font=(theme.font_family, 11),
            bg=theme.surface,
            fg=theme.text_muted if hasattr(theme, 'text_muted') else theme.text,
            anchor='w'
        )
        self.path_label.pack(side='left', fill='x', expand=True)
        
        # Browse button
        from .button import Button
        self.browse_btn = Button(
            self,
            text="Browse",
            command=self._browse,
            variant="default"
        )
        self.browse_btn.pack(side='right')
    
    def _browse(self) -> None:
        """Open file dialog."""
        from tkinter import filedialog
        path = filedialog.askopenfilename()
        if path:
            self.file_path = path
            self.path_var.set(path)
            if self.on_select:
                self.on_select(path)
    
    def get_value(self) -> str:
        return self.file_path
