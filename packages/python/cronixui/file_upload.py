"""CronixUI FileUpload Component - Native tkinter implementation."""
import tkinter as tk
from tkinter import filedialog
from typing import Callable, Optional
from .core import Frame, get_theme


class FileUpload(Frame):
    """Native file upload with browse button."""
    def __init__(self, master, filetypes=None, multiple=False, on_files=None, **kwargs):
        super().__init__(master, bg=get_theme().bg, highlightthickness=0, **kwargs)
        theme = get_theme()
        self.on_files = on_files

        self.label = tk.Label(self, text="📁 Click to select files",
                             bg=theme.surface_2, fg=theme.text_muted,
                             font=(theme.font_family, 11), relief='solid', bd=1,
                             padx=20, pady=16, cursor='hand2')
        self.label.pack(fill='x')
        self.label.bind('<Button-1>', lambda e: self._browse(filetypes or [], multiple))

    def _browse(self, filetypes, multiple):
        if multiple:
            files = filedialog.askopenfilenames(filetypes=filetypes)
        else:
            files = filedialog.askopenfilename(filetypes=filetypes)
            files = [files] if files else []
        if files and self.on_files:
            self.on_files(files)
