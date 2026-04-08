"""CronixUI Layout Components"""

from .core import create_el


class Header:
    """Header component."""

    def __init__(self, brand: str = ""):
        self.brand = brand
        self.element = self._render()

    def _render(self):
        el = create_el("header", "cn-header")

        brand_el = create_el("a", "cn-header-brand")
        brand_el.textContent = self.brand
        el.appendChild(brand_el)

        self.nav = create_el("nav", "cn-header-nav")
        el.appendChild(self.nav)

        self.actions = create_el("div", "cn-header-actions")
        el.appendChild(self.actions)

        return el

    def add_nav_item(self, text: str, href: str = "#"):
        link = create_el("a", "cn-btn cn-btn-ghost")
        link.textContent = text
        link.setAttribute("href", href)
        self.nav.appendChild(link)

    def add_action(self, element):
        self.actions.appendChild(element)


class Sidebar:
    """Sidebar navigation component."""

    def __init__(self):
        self.element = self._render()

    def _render(self):
        el = create_el("aside", "cn-sidebar")

        self.header = create_el("div", "cn-sidebar-header")
        el.appendChild(self.header)

        self.nav = create_el("nav", "cn-sidebar-nav")
        el.appendChild(self.nav)

        self.footer = create_el("div", "cn-sidebar-footer")
        el.appendChild(self.footer)

        return el

    def add_item(
        self, text: str, icon: str = None, href: str = "#", active: bool = False
    ):
        item = create_el("a", "cn-sidebar-item")
        item.setAttribute("href", href)
        if active:
            item.classList.add("cn-sidebar-active")

        if icon:
            icon_el = create_el("span")
            icon_el.innerHTML = icon
            item.appendChild(icon_el)

        text_el = create_el("span")
        text_el.textContent = text
        item.appendChild(text_el)

        self.nav.appendChild(item)


class Footer:
    """Footer component."""

    def __init__(self, copyright: str = ""):
        self.copyright = copyright
        self.element = self._render()

    def _render(self):
        el = create_el("footer", "cn-footer")

        content = create_el("div", "cn-footer-content")

        self.links = create_el("div", "cn-footer-links")
        content.appendChild(self.links)

        copyright_el = create_el("div", "cn-footer-copyright")
        copyright_el.textContent = self.copyright
        content.appendChild(copyright_el)

        el.appendChild(content)
        return el

    def add_link(self, text: str, href: str = "#"):
        link = create_el("a", "cn-footer-link")
        link.textContent = text
        link.setAttribute("href", href)
        self.links.appendChild(link)


class Container:
    """Container component."""

    SIZES = ("sm", "md", "lg", "xl", "fluid")

    def __init__(self, size: str = "lg"):
        self.size = size if size in self.SIZES else "lg"
        self.element = self._render()

    def _render(self):
        classes = "cn-container"
        if self.size != "lg":
            classes += f" cn-container-{self.size}"
        return create_el("div", classes)


class Divider:
    """Divider component."""

    def __init__(self):
        self.element = create_el("div", "cn-divider")


class Section:
    """Section spacing component."""

    SIZES = ("sm", "md", "lg")

    def __init__(self, size: str = "md"):
        self.size = size if size in self.SIZES else "md"
        self.element = self._render()

    def _render(self):
        classes = "cn-section"
        if self.size != "md":
            classes += f" cn-section-{self.size}"
        return create_el("section", classes)
