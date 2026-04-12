# COMPONENTS.md

## Web/React Components

`Accordion`, `Alert`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Card`, `Checkbox`, `CommandPalette`, `Dropdown`, `FileInput`, `Input`, `List`, `Modal`, `Nav`, `Pagination`, `Progress`, `Radio`, `Search`, `Select`, `Skeleton`, `Slider`, `Spinner`, `Stat`, `Table`, `Tabs`, `Tag`, `Textarea`, `Toast`, `Toggle`, `Tooltip`.

## Shared Component APIs

### Toast
`show(options) / success(message) / error(message) / warning(message) / info(message)`

### Toggle
`toggle() / isOn() / setOn(value)`

### Modal
`open() / close() / isOpen()`

### Dropdown
`open() / close() / toggle() / isOpen()`

### Tabs
`setActive(index) / activeIndex()`

### Accordion
`toggle(index) / open(index) / close(index) / openAll(total) / closeAll() / isOpen(index)`

### Pagination
`goTo(page) / next() / prev() / current() / total()`

### CommandPalette
`open() / close() / toggle() / setItems(items) / execute(index)`

### Search
`setItems(items) / filter(query) / select(index)`
