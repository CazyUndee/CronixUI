"""CronixUI Avatar Component"""

from typing import Optional
from .core import create_el


class Avatar:
    """Avatar component for user images or initials."""

    SIZES = ("sm", "md", "lg", "xl")

    def __init__(
        self,
        initials: Optional[str] = None,
        image_url: Optional[str] = None,
        size: str = "md",
    ):
        self.initials = initials
        self.image_url = image_url
        self.size = size if size in self.SIZES else "md"
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-avatar")
        if self.size != "md":
            el.classList.add(f"cn-avatar-{self.size}")

        if self.image_url:
            img = create_el("img")
            img.setAttribute("src", self.image_url)
            img.setAttribute("alt", self.initials or "Avatar")
            el.appendChild(img)
        elif self.initials:
            el.textContent = self.initials[:2].upper()

        return el


class AvatarGroup:
    """Group of overlapping avatars."""

    def __init__(self, *avatars: Avatar):
        self.avatars = avatars
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-avatar-group")
        for avatar in self.avatars:
            el.appendChild(avatar.element)
        return el
