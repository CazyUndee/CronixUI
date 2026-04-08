"""CronixUI Badge & Tag Components"""

from .core import create_el


class Badge:
    """Badge component for status indicators."""

    VARIANTS = ("default", "accent", "success", "warning", "error", "info")

    def __init__(self, text: str, variant: str = "default", solid: bool = False):
        self.text = text
        self.variant = variant if variant in self.VARIANTS else "default"
        self.solid = solid
        self.element = self._render()

    def _render(self):
        classes = f"cn-badge cn-badge-{self.variant}"
        if self.solid:
            classes += " cn-badge-solid"
        el = create_el("span", classes)
        el.textContent = self.text
        return el


class Tag:
    """Tag component for labels."""

    def __init__(self, text: str, removable: bool = False, on_remove=None):
        self.text = text
        self.removable = removable
        self.on_remove = on_remove
        self.element = self._render()

    def _render(self):
        el = create_el("span", "cn-tag")
        el.textContent = self.text

        if self.removable:
            remove_btn = create_el("span", "cn-tag-remove")
            remove_btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>'
            if self.on_remove:
                remove_btn.addEventListener("click", self.on_remove)
            el.appendChild(remove_btn)

        return el
