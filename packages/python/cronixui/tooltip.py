"""CronixUI Tooltip Component"""

from .core import create_el


class Tooltip:
    """Tooltip component."""

    POSITIONS = ("top", "bottom", "left", "right")

    def __init__(self, content: str, position: str = "top"):
        self.content = content
        self.position = position if position in self.POSITIONS else "top"
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-tooltip")

        tooltip_content = create_el("div", "cn-tooltip-content")
        tooltip_content.textContent = self.content

        el.appendChild(tooltip_content)
        return el

    def wrap(self, element):
        """Wrap an element with tooltip."""
        self.element.insertBefore(element, self.element.firstChild)
        return self.element
