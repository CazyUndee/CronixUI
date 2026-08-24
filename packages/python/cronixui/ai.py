"""
AI-focused components for building chat interfaces and AI-powered UIs.

These components provide native tkinter implementations for AI chat interfaces,
model selectors, token counters, and code display blocks.
"""

import tkinter as tk
from tkinter import ttk
from typing import Callable, List, Optional
from dataclasses import dataclass
from enum import Enum


class MessageRole(Enum):
    """Chat message role."""
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class AIStatusType(Enum):
    """AI connection status."""
    CONNECTED = "connected"
    DISCONNECTED = "disconnected"
    CONNECTING = "connecting"
    ERROR = "error"
    RATE_LIMITED = "rate_limited"
    IDLE = "idle"


@dataclass
class ChatMessage:
    """A single AI chat message."""
    id: str
    role: MessageRole
    content: str
    timestamp: Optional[str] = None
    status: Optional[str] = None


@dataclass
class AIModel:
    """An AI model for selection."""
    id: str
    name: str
    provider: str
    max_tokens: Optional[int] = None


class CnChatInterface(ttk.Frame):
    """
    Complete chat interface with message list and input.
    
    ```python
    chat = CnChatInterface(parent, on_send=lambda msg: print(msg))
    chat.pack(fill=tk.BOTH, expand=True)
    
    chat.add_message(ChatMessage(
        id="1",
        role=MessageRole.USER,
        content="Hello!"
    ))
    ```
    """
    
    def __init__(self, parent, on_send: Optional[Callable[[str], None]] = None, **kwargs):
        super().__init__(parent, **kwargs)
        self._on_send = on_send
        self._messages: List[ChatMessage] = []
        
        self._create_widgets()
    
    def _create_widgets(self):
        # Messages frame with scrollbar
        self._messages_frame = ttk.Frame(self)
        self._messages_frame.pack(fill=tk.BOTH, expand=True, padx=8, pady=8)
        
        self._messages_canvas = tk.Canvas(self._messages_frame, bg='#1a1a1a', highlightthickness=0)
        self._messages_scrollbar = ttk.Scrollbar(self._messages_frame, orient=tk.VERTICAL, command=self._messages_canvas.yview)
        self._messages_inner = ttk.Frame(self._messages_canvas)
        
        self._messages_inner.bind("<Configure>", lambda e: self._messages_canvas.configure(scrollregion=self._messages_canvas.bbox("all")))
        self._messages_canvas.create_window((0, 0), window=self._messages_inner, anchor="nw")
        self._messages_canvas.configure(yscrollcommand=self._messages_scrollbar.set)
        
        self._messages_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self._messages_canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Input frame
        input_frame = ttk.Frame(self)
        input_frame.pack(fill=tk.X, padx=8, pady=8)
        
        self._input_entry = ttk.Entry(input_frame, font=('Segoe UI', 11))
        self._input_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 8))
        self._input_entry.bind("<Return>", self._on_submit)
        
        self._send_button = ttk.Button(input_frame, text="↑", width=3, command=self._on_submit)
        self._send_button.pack(side=tk.RIGHT)
    
    def _on_submit(self, event=None):
        text = self._input_entry.get().strip()
        if text and self._on_send:
            self._on_send(text)
            self._input_entry.delete(0, tk.END)
    
    def add_message(self, message: ChatMessage):
        """Add a message to the chat interface."""
        self._messages.append(message)
        
        is_user = message.role == MessageRole.USER
        bg_color = '#6b2323' if is_user else '#1a1a1a'
        text_color = '#f0ede8'
        align = 'e' if is_user else 'w'
        
        msg_frame = tk.Frame(self._messages_inner, bg=bg_color, padx=12, pady=8)
        msg_frame.pack(fill=tk.X, padx=8, pady=4, anchor=align)
        
        # Role label
        role_text = "You" if is_user else "Assistant"
        role_label = tk.Label(msg_frame, text=role_text, bg=bg_color, fg='#f0ede880',
                             font=('Segoe UI', 9))
        role_label.pack(anchor='w')
        
        # Content
        content_label = tk.Label(msg_frame, text=message.content, bg=bg_color, fg=text_color,
                                font=('Segoe UI', 11), wraplength=400, justify='left')
        content_label.pack(anchor='w')
        
        # Scroll to bottom
        self._messages_canvas.update_idletasks()
        self._messages_canvas.yview_moveto(1.0)
    
    def clear_messages(self):
        """Clear all messages."""
        self._messages.clear()
        for widget in self._messages_inner.winfo_children():
            widget.destroy()


class CnTokenCounter(ttk.Frame):
    """
    Token usage counter with progress bar.
    
    ```python
    counter = CnTokenCounter(parent, count=1500, max_tokens=4096)
    counter.pack()
    counter.update_count(2000)
    ```
    """
    
    def __init__(self, parent, count: int = 0, max_tokens: Optional[int] = None, **kwargs):
        super().__init__(parent, **kwargs)
        self._count = count
        self._max_tokens = max_tokens
        
        self._create_widgets()
        self._update_display()
    
    def _create_widgets(self):
        # Info row
        self._info_frame = ttk.Frame(self)
        self._info_frame.pack(fill=tk.X)
        
        self._label = ttk.Label(self._info_frame, text="Tokens", font=('Segoe UI', 10))
        self._label.pack(side=tk.LEFT)
        
        self._count_label = ttk.Label(self._info_frame, text="0", font=('Segoe UI', 11, 'bold'))
        self._count_label.pack(side=tk.LEFT, padx=(8, 0))
        
        self._max_label = ttk.Label(self._info_frame, text="", font=('Segoe UI', 9))
        self._max_label.pack(side=tk.LEFT, padx=(4, 0))
        
        # Progress bar
        if self._max_tokens:
            self._progress = ttk.Progressbar(self, length=150, mode='determinate')
            self._progress.pack(fill=tk.X, pady=(4, 0))
    
    def _format_count(self, n: int) -> str:
        if n >= 1_000_000:
            return f"{n/1_000_000:.1f}M"
        if n >= 1_000:
            return f"{n/1_000:.1f}k"
        return str(n)
    
    def _update_display(self):
        self._count_label.config(text=self._format_count(self._count))
        
        if self._max_tokens:
            self._max_label.config(text=f"/ {self._format_count(self._max_tokens)}")
            progress = min(100, (self._count / self._max_tokens) * 100)
            self._progress['value'] = progress
            
            if progress >= 90:
                self._count_label.config(foreground='red')
            elif progress >= 70:
                self._count_label.config(foreground='orange')
            else:
                self._count_label.config(foreground='green')
    
    def update_count(self, count: int):
        """Update the token count."""
        self._count = count
        self._update_display()


class CnCodeBlock(ttk.Frame):
    """
    Code block with syntax highlighting and copy button.
    
    ```python
    code_block = CnCodeBlock(parent, code="print('hello')", language="python")
    code_block.pack(fill=tk.BOTH, expand=True)
    ```
    """
    
    def __init__(self, parent, code: str, language: Optional[str] = None, **kwargs):
        super().__init__(parent, **kwargs)
        self._code = code
        self._language = language
        
        self._create_widgets()
    
    def _create_widgets(self):
        # Header
        header = tk.Frame(self, bg='#2d2d2d', padx=8, pady=4)
        header.pack(fill=tk.X)
        
        if self._language:
            lang_label = tk.Label(header, text=self._language.upper(), bg='#2d2d2d', fg='#909090',
                                 font=('Consolas', 9, 'bold'))
            lang_label.pack(side=tk.LEFT)
        
        copy_btn = tk.Button(header, text="Copy", bg='#3d3d3d', fg='#d0d0d0',
                            relief=tk.FLAT, font=('Segoe UI', 9),
                            command=self._copy_code)
        copy_btn.pack(side=tk.RIGHT)
        
        # Code content
        self._code_text = tk.Text(self, bg='#1e1e1e', fg='#d4d4d4', font=('Consolas', 11),
                                  insertbackground='white', selectbackground='#264f78',
                                  relief=tk.FLAT, padx=12, pady=8, wrap=tk.NONE)
        self._code_text.insert('1.0', self._code)
        self._code_text.config(state=tk.DISABLED)
        
        # Scrollbars
        v_scrollbar = ttk.Scrollbar(self, orient=tk.VERTICAL, command=self._code_text.yview)
        h_scrollbar = ttk.Scrollbar(self, orient=tk.HORIZONTAL, command=self._code_text.xview)
        self._code_text.configure(yscrollcommand=v_scrollbar.set, xscrollcommand=h_scrollbar.set)
        
        # Pack
        h_scrollbar.pack(side=tk.BOTTOM, fill=tk.X)
        v_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self._code_text.pack(fill=tk.BOTH, expand=True)
    
    def _copy_code(self):
        self.clipboard_clear()
        self.clipboard_append(self._code)


class CnModelSelector(ttk.Frame):
    """
    Dropdown selector for AI models.
    
    ```python
    models = [
        AIModel("gpt-4", "GPT-4", "OpenAI", 8192),
        AIModel("claude-3", "Claude 3", "Anthropic", 100000),
    ]
    selector = CnModelSelector(parent, models=models, on_change=lambda m: print(m.name))
    selector.pack()
    ```
    """
    
    def __init__(self, parent, models: List[AIModel], on_change: Optional[Callable[[AIModel], None]] = None, **kwargs):
        super().__init__(parent, **kwargs)
        self._models = models
        self._on_change = on_change
        self._selected = models[0] if models else None
        
        self._create_widgets()
    
    def _create_widgets(self):
        ttk.Label(self, text="Model:", font=('Segoe UI', 10)).pack(side=tk.LEFT, padx=(0, 8))
        
        model_names = [f"{m.name} ({m.provider})" for m in self._models]
        self._var = tk.StringVar(value=model_names[0] if model_names else "")
        
        self._combobox = ttk.Combobox(self, textvariable=self._var, values=model_names,
                                       state='readonly', width=25)
        self._combobox.pack(side=tk.LEFT)
        self._combobox.bind('<<ComboboxSelected>>', self._on_select)
    
    def _on_select(self, event):
        index = self._combobox.current()
        if 0 <= index < len(self._models):
            self._selected = self._models[index]
            if self._on_change:
                self._on_change(self._selected)
    
    @property
    def selected(self) -> Optional[AIModel]:
        return self._selected


class CnAIStatus(ttk.Frame):
    """
    Status indicator for AI connection state.
    
    ```python
    status = CnAIStatus(parent, status=AIStatusType.CONNECTED, latency=120, model="GPT-4")
    status.pack()
    ```
    """
    
    STATUS_CONFIG = {
        AIStatusType.CONNECTED: ("● Connected", 'green'),
        AIStatusType.DISCONNECTED: ("○ Disconnected", 'red'),
        AIStatusType.CONNECTING: ("◐ Connecting...", 'orange'),
        AIStatusType.ERROR: ("✕ Error", 'red'),
        AIStatusType.RATE_LIMITED: ("⏱ Rate limited", 'orange'),
        AIStatusType.IDLE: ("◌ Idle", 'gray'),
    }
    
    def __init__(self, parent, status: AIStatusType = AIStatusType.IDLE,
                 latency: Optional[int] = None, model: Optional[str] = None, **kwargs):
        super().__init__(parent, **kwargs)
        self._status = status
        self._latency = latency
        self._model = model
        
        self._create_widgets()
    
    def _create_widgets(self):
        label_text, label_color = self.STATUS_CONFIG.get(self._status, ("? Unknown", 'gray'))
        
        self._status_label = tk.Label(self, text=label_text, fg=label_color,
                                      font=('Segoe UI', 10))
        self._status_label.pack(side=tk.LEFT, padx=(0, 8))
        
        if self._latency is not None:
            self._latency_label = tk.Label(self, text=f"{self._latency}ms",
                                           fg='gray', font=('Segoe UI', 9))
            self._latency_label.pack(side=tk.LEFT, padx=(0, 4))
        
        if self._model:
            self._model_label = tk.Label(self, text=f"| {self._model}",
                                         fg='gray', font=('Segoe UI', 9))
            self._model_label.pack(side=tk.LEFT)
    
    def update_status(self, status: AIStatusType, latency: Optional[int] = None, model: Optional[str] = None):
        """Update the status indicator."""
        self._status = status
        self._latency = latency
        self._model = model
        
        label_text, label_color = self.STATUS_CONFIG.get(status, ("? Unknown", 'gray'))
        self._status_label.config(text=label_text, fg=label_color)
        
        if hasattr(self, '_latency_label'):
            if latency is not None:
                self._latency_label.config(text=f"{latency}ms")
        
        if hasattr(self, '_model_label'):
            if model:
                self._model_label.config(text=f"| {model}")


__all__ = [
    'MessageRole',
    'AIStatusType',
    'ChatMessage',
    'AIModel',
    'CnChatInterface',
    'CnTokenCounter',
    'CnCodeBlock',
    'CnModelSelector',
    'CnAIStatus',
]
