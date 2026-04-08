"""CronixUI Alert Component"""

from typing import Optional
from .core import create_el


class Alert:
    """Alert component for messages."""

    VARIANTS = ("info", "success", "warning", "error")

    def __init__(
        self,
        message: str,
        title: Optional[str] = None,
        variant: str = "info",
        dismissible: bool = False,
    ):
        self.message = message
        self.title = title
        self.variant = variant if variant in self.VARIANTS else "info"
        self.dismissible = dismissible
        self.element = self._render()

    def _render(self):
        el = create_el("div", f"cn-alert cn-alert-{self.variant}")

        icon_svg = self._get_icon_svg()
        if icon_svg:
            icon = create_el("span", "cn-alert-icon")
            icon.innerHTML = icon_svg
            el.appendChild(icon)

        content = create_el("div", "cn-alert-content")
        if self.title:
            title_el = create_el("div", "cn-alert-title")
            title_el.textContent = self.title
            content.appendChild(title_el)

        message_el = create_el("div", "cn-alert-message")
        message_el.textContent = self.message
        content.appendChild(message_el)

        el.appendChild(content)

        if self.dismissible:
            close_btn = create_el("button", "cn-alert-close")
            close_btn.innerHTML = "&times;"
            close_btn.addEventListener("click", lambda: el.remove())
            el.appendChild(close_btn)

        return el

    def _get_icon_svg(self):
        icons = {
            "info": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
            "success": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            "warning": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            "error": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        }
        return icons.get(self.variant)
