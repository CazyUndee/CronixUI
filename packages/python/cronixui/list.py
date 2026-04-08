"""CronixUI List Component"""

from typing import Optional, Callable
from .core import create_el


class List:
    """List component."""

    def __init__(self, items: list, clickable: bool = False):
        self.items = items
        self.clickable = clickable
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-list")
        for item in self.items:
            item_el = create_el("div", "cn-list-item")
            if self.clickable:
                item_el.classList.add("cn-list-item-clickable")

            if isinstance(item, dict):
                if icon := item.get("icon"):
                    icon_el = create_el("span", "cn-list-item-icon")
                    icon_el.innerHTML = icon
                    item_el.appendChild(icon_el)

                content = create_el("div", "cn-list-item-content")
                if title := item.get("title"):
                    title_el = create_el("div", "cn-list-item-title")
                    title_el.textContent = title
                    content.appendChild(title_el)

                if subtitle := item.get("subtitle"):
                    subtitle_el = create_el("div", "cn-list-item-subtitle")
                    subtitle_el.textContent = subtitle
                    content.appendChild(subtitle_el)

                item_el.appendChild(content)

                if actions := item.get("actions"):
                    actions_el = create_el("div", "cn-list-item-actions")
                    actions_el.innerHTML = actions
                    item_el.appendChild(actions_el)
            else:
                content = create_el("div", "cn-list-item-content")
                content.textContent = str(item)
                item_el.appendChild(content)

            el.appendChild(item_el)
        return el
