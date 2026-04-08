"""CronixUI Form Components"""

from typing import Optional, Callable
from .core import create_el


class Input:
    """Input component."""

    SIZES = ("sm", "md", "lg")

    def __init__(
        self,
        placeholder: str = "",
        size: str = "md",
        error: bool = False,
        disabled: bool = False,
        icon: Optional[str] = None,
    ):
        self.placeholder = placeholder
        self.size = size if size in self.SIZES else "md"
        self.error = error
        self.disabled = disabled
        self.icon = icon
        self.element = self._render()

    def _render(self):
        if self.icon:
            wrapper = create_el("div", "cn-input-icon-wrapper")
            input_el = create_el("input", "cn-input")
            input_el.setAttribute("placeholder", self.placeholder)
            if self.disabled:
                input_el.setAttribute("disabled", "")
            if self.error:
                input_el.classList.add("cn-input-error")

            icon_el = create_el("span", "cn-input-icon")
            icon_el.innerHTML = self.icon
            wrapper.appendChild(icon_el)
            wrapper.appendChild(input_el)
            return wrapper

        el = create_el("input", "cn-input")
        el.setAttribute("placeholder", self.placeholder)
        if self.disabled:
            el.setAttribute("disabled", "")
        if self.error:
            el.classList.add("cn-input-error")
        if self.size != "md":
            el.classList.add(f"cn-input-{self.size}")
        return el


class Textarea:
    """Textarea component."""

    def __init__(self, placeholder: str = "", rows: int = 4):
        self.placeholder = placeholder
        self.rows = rows
        self.element = self._render()

    def _render(self):
        el = create_el("textarea", "cn-input cn-textarea")
        el.setAttribute("placeholder", self.placeholder)
        el.setAttribute("rows", str(self.rows))
        return el


class FormField:
    """Form field with label and error."""

    def __init__(self, label: str, input_el, error: str = None, help_text: str = None):
        self.label = label
        self.input = input_el
        self.error = error
        self.help_text = help_text
        self.element = self._render()

    def _render(self):
        group = create_el("div", "cn-form-group")

        label_el = create_el("label", "cn-form-label")
        label_el.textContent = self.label
        group.appendChild(label_el)

        if hasattr(self.input, "element"):
            group.appendChild(self.input.element)
        else:
            group.appendChild(self.input)

        if self.error:
            error_el = create_el("span", "cn-form-error")
            error_el.textContent = self.error
            group.appendChild(error_el)

        if self.help_text:
            help_el = create_el("span", "cn-form-help")
            help_el.textContent = self.help_text
            group.appendChild(help_el)

        return group


class Checkbox:
    """Checkbox component."""

    def __init__(self, label: str, checked: bool = False, disabled: bool = False):
        self.label = label
        self.checked = checked
        self.disabled = disabled
        self.element = self._render()

    def _render(self):
        el = create_el("label", "cn-checkbox")
        if self.disabled:
            el.classList.add("disabled")

        input_el = create_el("input")
        input_el.setAttribute("type", "checkbox")
        if self.checked:
            input_el.setAttribute("checked", "")
        if self.disabled:
            input_el.setAttribute("disabled", "")

        box = create_el("span", "cn-checkbox-box")
        label_el = create_el("span", "cn-checkbox-label")
        label_el.textContent = self.label

        el.appendChild(input_el)
        el.appendChild(box)
        el.appendChild(label_el)
        return el


class Radio:
    """Radio button component."""

    def __init__(self, name: str, options: list, selected: str = None):
        self.name = name
        self.options = options
        self.selected = selected
        self.element = self._render()

    def _render(self):
        container = create_el("div")
        for option in self.options:
            if isinstance(option, tuple):
                value, label = option
            else:
                value = label = option

            el = create_el("label", "cn-radio")
            input_el = create_el("input")
            input_el.setAttribute("type", "radio")
            input_el.setAttribute("name", self.name)
            input_el.setAttribute("value", value)
            if value == self.selected:
                input_el.setAttribute("checked", "")

            box = create_el("span", "cn-radio-box")
            label_el = create_el("span", "cn-radio-label")
            label_el.textContent = label

            el.appendChild(input_el)
            el.appendChild(box)
            el.appendChild(label_el)
            container.appendChild(el)

        return container


class Select:
    """Select dropdown component."""

    def __init__(self, options: list, placeholder: str = ""):
        self.options = options
        self.placeholder = placeholder
        self.element = self._render()

    def _render(self):
        wrapper = create_el("div", "cn-select-wrapper")
        select = create_el("select", "cn-select")

        if self.placeholder:
            placeholder_option = create_el("option")
            placeholder_option.setAttribute("value", "")
            placeholder_option.setAttribute("disabled", "")
            placeholder_option.setAttribute("selected", "")
            placeholder_option.textContent = self.placeholder
            select.appendChild(placeholder_option)

        for option in self.options:
            if isinstance(option, tuple):
                value, label = option
            else:
                value = label = option

            opt = create_el("option")
            opt.setAttribute("value", value)
            opt.textContent = label
            select.appendChild(opt)

        wrapper.appendChild(select)
        return wrapper


class Slider:
    """Slider component."""

    def __init__(self, min: float = 0, max: float = 100, value: float = 50):
        self.min = min
        self.max = max
        self.value = value
        self.element = self._render()

    def _render(self):
        el = create_el("input", "cn-slider")
        el.setAttribute("type", "range")
        el.setAttribute("min", str(self.min))
        el.setAttribute("max", str(self.max))
        el.setAttribute("value", str(self.value))
        return el


class FileInput:
    """File input component."""

    def __init__(self, accept: str = "", multiple: bool = False):
        self.accept = accept
        self.multiple = multiple
        self.element = self._render()

    def _render(self):
        wrapper = create_el("div", "cn-file-input")

        input_el = create_el("input")
        input_el.setAttribute("type", "file")
        if self.accept:
            input_el.setAttribute("accept", self.accept)
        if self.multiple:
            input_el.setAttribute("multiple", "")

        label = create_el("div", "cn-file-input-label")
        icon = create_el("div", "cn-file-input-icon")
        icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>'

        text = create_el("div", "cn-file-input-text")
        text.innerHTML = "Drag and drop or <span>browse</span>"

        label.appendChild(icon)
        label.appendChild(text)
        wrapper.appendChild(input_el)
        wrapper.appendChild(label)

        return wrapper
