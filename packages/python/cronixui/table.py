"""CronixUI Table Component"""

from typing import List, Optional
from .core import create_el


class Table:
    """Table component."""

    def __init__(
        self,
        headers: List[str],
        rows: List[List[str]],
        sortable: bool = False,
    ):
        self.headers = headers
        self.rows = rows
        self.sortable = sortable
        self.element = self._render()

    def _render(self):
        wrapper = create_el("div", "cn-table-wrapper")
        table = create_el("table", "cn-table")

        if self.sortable:
            table.classList.add("cn-table-sortable")

        thead = create_el("thead")
        header_row = create_el("tr")
        for header in self.headers:
            th = create_el("th")
            th.textContent = header
            header_row.appendChild(th)
        thead.appendChild(header_row)
        table.appendChild(thead)

        tbody = create_el("tbody")
        for row_data in self.rows:
            row = create_el("tr")
            for cell in row_data:
                td = create_el("td")
                td.textContent = cell
                row.appendChild(td)
            tbody.appendChild(row)
        table.appendChild(tbody)

        wrapper.appendChild(table)
        return wrapper
