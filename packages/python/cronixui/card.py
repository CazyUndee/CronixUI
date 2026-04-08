"""CronixUI Card Component"""

from typing import Optional
from .core import create_el


class Card:
    """Card container component."""

    def __init__(
        self,
        title: Optional[str] = None,
        subtitle: Optional[str] = None,
        clickable: bool = False,
    ):
        self.title = title
        self.subtitle = subtitle
        self.clickable = clickable
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-card")
        if self.clickable:
            el.classList.add("cn-card-clickable")

        if self.title or self.subtitle:
            header = create_el("div", "cn-card-header")
            if self.title:
                title_el = create_el("h3", "cn-card-title")
                title_el.textContent = self.title
                header.appendChild(title_el)
            el.appendChild(header)

            if self.subtitle:
                subtitle_el = create_el("p", "cn-card-subtitle")
                subtitle_el.textContent = self.subtitle
                header.appendChild(subtitle_el)

        return el

    def set_body(self, content: str):
        body = create_el("div", "cn-card-body")
        body.innerHTML = content
        self.element.appendChild(body)

    def set_footer(self, content: str):
        footer = create_el("div", "cn-card-footer")
        footer.innerHTML = content
        self.element.appendChild(footer)


class CardIcon:
    """Card with icon."""

    def __init__(self, icon_svg: str):
        self.icon_svg = icon_svg
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-card-icon")
        el.innerHTML = self.icon_svg
        return el
