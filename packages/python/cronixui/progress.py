"""CronixUI Progress Components"""

from .core import create_el


class Progress:
    """Progress bar component."""

    VARIANTS = ("default", "success", "warning", "error")
    SIZES = ("sm", "md", "lg")

    def __init__(
        self,
        value: float = 0,
        max: float = 100,
        variant: str = "default",
        size: str = "md",
        show_label: bool = False,
    ):
        self.value = value
        self.max = max
        self.variant = variant if variant in self.VARIANTS else "default"
        self.size = size if size in self.SIZES else "md"
        self.show_label = show_label
        self.element = self._render()

    def _render(self):
        container = create_el("div")

        if self.show_label:
            label = create_el("div", "cn-progress-label")
            current = create_el("span")
            current.textContent = str(int(self.value))
            total = create_el("span")
            total.textContent = str(int(self.max))
            label.appendChild(current)
            label.appendChild(total)
            container.appendChild(label)

        progress = create_el("div", "cn-progress")
        if self.size != "md":
            progress.classList.add(f"cn-progress-{self.size}")
        if self.variant != "default":
            progress.classList.add(f"cn-progress-{self.variant}")

        bar = create_el("div", "cn-progress-bar")
        bar.style.width = f"{(self.value / self.max) * 100}%"
        progress.appendChild(bar)

        container.appendChild(progress)
        return container

    def set_value(self, value: float):
        self.value = value
        bar = self.element.querySelector(".cn-progress-bar")
        if bar:
            bar.style.width = f"{(self.value / self.max) * 100}%"


class Stat:
    """Stat component for displaying metrics."""

    def __init__(
        self, value: str, label: str, delta: str = None, delta_type: str = None
    ):
        self.value = value
        self.label = label
        self.delta = delta
        self.delta_type = delta_type
        self.element = self._render()

    def _render(self):
        el = create_el("div", "cn-stat")

        value_el = create_el("div", "cn-stat-value")
        value_el.textContent = self.value
        el.appendChild(value_el)

        label_el = create_el("div", "cn-stat-label")
        label_el.textContent = self.label
        el.appendChild(label_el)

        if self.delta:
            delta_el = create_el(
                "div", f"cn-stat-delta cn-stat-delta-{self.delta_type}"
            )
            delta_el.textContent = self.delta
            el.appendChild(delta_el)

        return el
