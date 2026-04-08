"""CronixUI Loading Components"""

from .core import create_el


class Spinner:
    """Loading spinner component."""

    SIZES = ("sm", "md", "lg")

    def __init__(self, size: str = "md"):
        self.size = size if size in self.SIZES else "md"
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-spinner")
        if self.size != "md":
            el.classList.add(f"cn-spinner-{self.size}")
        return el


class Skeleton:
    """Skeleton loading placeholder."""

    VARIANTS = ("text", "title", "avatar")

    def __init__(self, variant: str = "text", width: str = None):
        self.variant = variant if variant in self.VARIANTS else "text"
        self.width = width
        self.element = self._render()

    def _render(self):
        el = create_el("div", f"cn-skeleton cn-skeleton-{self.variant}")
        if self.width:
            el.style.width = self.width
        return el
