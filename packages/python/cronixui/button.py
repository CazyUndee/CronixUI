"""CronixUI Button Component"""

from typing import Optional, Callable
from .core import create_el
from .tokens import ACCENT, SURFACE_2, SURFACE_3, ERROR, SUCCESS, TEXT


class Button:
    """Button component with variants."""

    VARIANTS = ("default", "primary", "ghost", "outline", "danger", "success")
    SIZES = ("sm", "md", "lg")

    def __init__(
        self,
        text: str,
        variant: str = "default",
        size: str = "md",
        icon: bool = False,
        disabled: bool = False,
        onclick: Optional[Callable] = None,
    ):
        self.text = text
        self.variant = variant if variant in self.VARIANTS else "default"
        self.size = size if size in self.SIZES else "md"
        self.icon = icon
        self.disabled = disabled
        self.onclick = onclick
        self.element = self._render()

    def _render(self):
        el = create_el("button", f"cn-btn cn-btn-{self.variant}")
        if self.size != "md":
            el.classList.add(f"cn-btn-{self.size}")
        if self.icon:
            el.classList.add("cn-btn-icon")
        if self.disabled:
            el.setAttribute("disabled", "")
        el.textContent = self.text
        if self.onclick:
            el.addEventListener("click", self.onclick)
        return el

    def disable(self):
        self.disabled = True
        self.element.setAttribute("disabled", "")

    def enable(self):
        self.disabled = False
        self.element.removeAttribute("disabled")


class ButtonGroup:
    """Button group component."""

    def __init__(self, *buttons: Button):
        self.buttons = buttons
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-btn-group")
        for btn in self.buttons:
            el.appendChild(btn.element)
        return el
