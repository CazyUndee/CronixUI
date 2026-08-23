package cronixui

import (
	"fmt"
	"image/color"
	"strings"
	"time"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/storage"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

const Version = "1.0.6"

// =============================================================================
// DESIGN TOKENS
// =============================================================================

type Colors struct {
	BG            color.Color
	Surface       color.Color
	Surface2      color.Color
	Surface3      color.Color
	Surface4      color.Color
	Text          color.Color
	TextMuted     color.Color
	TextDim       color.Color
	Accent        color.Color
	AccentHover   color.Color
	AccentLight   color.Color
	AccentGlow    color.Color
	AccentText    color.Color
	Success       color.Color
	SuccessBorder color.Color
	SuccessText   color.Color
	Warning       color.Color
	WarningBorder color.Color
	WarningText   color.Color
	Error         color.Color
	ErrorBorder   color.Color
	ErrorText     color.Color
	Info          color.Color
	InfoBorder    color.Color
	InfoText      color.Color
	Border        color.Color
	BorderHover   color.Color
	BorderFocus   color.Color
}

func DefaultColors() *Colors {
	return &Colors{
		BG:            color.RGBA{R: 10, G: 10, B: 10, A: 255},
		Surface:       color.RGBA{R: 17, G: 17, B: 17, A: 255},
		Surface2:      color.RGBA{R: 26, G: 26, B: 26, A: 255},
		Surface3:      color.RGBA{R: 34, G: 34, B: 34, A: 255},
		Surface4:      color.RGBA{R: 42, G: 42, B: 42, A: 255},
		Text:          color.RGBA{R: 240, G: 237, B: 232, A: 255},
		TextMuted:     color.RGBA{R: 240, G: 237, B: 232, A: 128},
		TextDim:       color.RGBA{R: 240, G: 237, B: 232, A: 64},
		Accent:        color.RGBA{R: 107, G: 35, B: 35, A: 255},
		AccentHover:   color.RGBA{R: 125, G: 42, B: 42, A: 255},
		AccentLight:   color.RGBA{R: 138, G: 53, B: 53, A: 255},
		AccentGlow:    color.RGBA{R: 107, G: 35, B: 35, A: 77},
		AccentText:    color.RGBA{R: 201, G: 122, B: 122, A: 255},
		Success:       color.RGBA{R: 30, G: 80, B: 40, A: 255},
		SuccessBorder: color.RGBA{R: 60, G: 140, B: 70, A: 102},
		SuccessText:   color.RGBA{R: 107, G: 196, B: 122, A: 255},
		Warning:       color.RGBA{R: 80, G: 60, B: 20, A: 255},
		WarningBorder: color.RGBA{R: 150, G: 110, B: 30, A: 102},
		WarningText:   color.RGBA{R: 196, G: 164, B: 58, A: 255},
		Error:         color.RGBA{R: 80, G: 20, B: 20, A: 255},
		ErrorBorder:   color.RGBA{R: 180, G: 60, B: 60, A: 102},
		ErrorText:     color.RGBA{R: 196, G: 107, B: 107, A: 255},
		Info:          color.RGBA{R: 20, G: 53, B: 80, A: 255},
		InfoBorder:    color.RGBA{R: 60, G: 140, B: 200, A: 102},
		InfoText:      color.RGBA{R: 107, G: 168, B: 196, A: 255},
		Border:        color.RGBA{R: 255, G: 255, B: 255, A: 20},
		BorderHover:   color.RGBA{R: 255, G: 255, B: 255, A: 38},
		BorderFocus:   color.RGBA{R: 255, G: 255, B: 255, A: 64},
	}
}

type Typography struct {
	FontFamily   string
	FontMono     string
	FontSizeXS   float32
	FontSizeSM   float32
	FontSizeBase float32
	FontSizeMD   float32
	FontSizeLG   float32
	FontSizeXL   float32
	FontSize2XL  float32
	FontSize3XL  float32
}

func DefaultTypography() *Typography {
	return &Typography{
		FontFamily:   "Outfit",
		FontMono:     "JetBrains Mono",
		FontSizeXS:   11,
		FontSizeSM:   12,
		FontSizeBase: 13,
		FontSizeMD:   14,
		FontSizeLG:   16,
		FontSizeXL:   20,
		FontSize2XL:  28,
		FontSize3XL:  36,
	}
}

type Spacing struct {
	Space1, Space2, Space3, Space4, Space5, Space6, Space8, Space10, Space12 float32
}

func DefaultSpacing() *Spacing {
	return &Spacing{4, 8, 12, 16, 20, 24, 32, 40, 48}
}

type RadiusTokens struct {
	SM, Default, LG, XL, Full float32
}

func DefaultRadiusTokens() *RadiusTokens {
	return &RadiusTokens{6, 10, 14, 20, 9999}
}

type Shadow struct {
	SM, Default, LG, Glow string
}

func DefaultShadow() *Shadow {
	return &Shadow{
		SM:      "0 1px 2px rgba(0, 0, 0, 0.3)",
		Default: "0 4px 12px rgba(0, 0, 0, 0.4)",
		LG:      "0 8px 24px rgba(0, 0, 0, 0.5)",
		Glow:    "0 0 20px rgba(107, 35, 35, 0.3)",
	}
}

type Transition struct {
	Fast, Default, Slow string
}

func DefaultTransition() *Transition {
	return &Transition{"0.1s ease", "0.15s ease", "0.25s ease"}
}

type ZIndexTokens struct {
	Dropdown, Sticky, Fixed, ModalBackdrop, Modal, Popover, Tooltip, Toast int
}

func DefaultZIndexTokens() *ZIndexTokens {
	return &ZIndexTokens{100, 200, 300, 400, 500, 600, 700, 800}
}

type LayoutTokens struct {
	ContainerMax, SidebarWidth, HeaderHeight float32
}

func DefaultLayoutTokens() *LayoutTokens {
	return &LayoutTokens{1200, 260, 56}
}

// =============================================================================
// THEME
// =============================================================================

type Theme struct {
	colors  *Colors
	spacing *Spacing
	radius  *RadiusTokens
}

func NewTheme() fyne.Theme {
	return &Theme{
		colors:  DefaultColors(),
		spacing: DefaultSpacing(),
		radius:  DefaultRadiusTokens(),
	}
}

func (t *Theme) Color(name fyne.ThemeColorName, variant fyne.ThemeVariant) color.Color {
	switch name {
	case theme.ColorNameBackground:
		return t.colors.BG
	case theme.ColorNameButton:
		return t.colors.Surface2
	case theme.ColorNameDisabledButton:
		return t.colors.Surface3
	case theme.ColorNameInputBackground:
		return t.colors.Surface
	case theme.ColorNameInputBorder:
		return t.colors.Border
	case theme.ColorNameDisabled:
		return t.colors.TextDim
	case theme.ColorNameForeground:
		return t.colors.Text
	case theme.ColorNamePlaceHolder:
		return t.colors.TextMuted
	case theme.ColorNamePrimary:
		return t.colors.Accent
	case theme.ColorNameHover:
		return t.colors.Surface3
	case theme.ColorNamePressed:
		return t.colors.Surface4
	case theme.ColorNameScrollBar:
		return t.colors.Surface3
	case theme.ColorNameShadow:
		return color.RGBA{R: 0, G: 0, B: 0, A: 50}
	case theme.ColorNameSuccess:
		return t.colors.Success
	case theme.ColorNameWarning:
		return t.colors.Warning
	case theme.ColorNameError:
		return t.colors.Error
	default:
		return t.colors.Text
	}
}

func (t *Theme) Font(style fyne.TextStyle) fyne.Resource {
	return theme.DefaultTheme().Font(style)
}

func (t *Theme) Icon(name fyne.ThemeIconName) fyne.Resource {
	return theme.DefaultTheme().Icon(name)
}

func (t *Theme) Size(name fyne.ThemeSizeName) float32 {
	switch name {
	case theme.SizeNamePadding:
		return t.spacing.Space2
	case theme.SizeNameScrollBar:
		return 8
	case theme.SizeNameScrollBarSmall:
		return 4
	case theme.SizeNameSeparatorThickness:
		return 1
	case theme.SizeNameText:
		return t.spacing.Space4
	case theme.SizeNameHeadingText:
		return t.spacing.Space6
	case theme.SizeNameSubHeadingText:
		return t.spacing.Space5
	case theme.SizeNameCaptionText:
		return t.spacing.Space2
	case theme.SizeNameInputBorder:
		return 1
	case theme.SizeNameInputRadius:
		return t.radius.Default
	case theme.SizeNameSelectionRadius:
		return t.radius.SM
	default:
		return 0
	}
}

// =============================================================================
// BUTTONS
// =============================================================================

type ButtonVariant int

const (
	ButtonDefault ButtonVariant = iota
	ButtonPrimary
	ButtonGhost
	ButtonOutline
	ButtonDanger
	ButtonSuccess
)

func NewButton(text string, variant ButtonVariant, onTap func()) *widget.Button {
	btn := widget.NewButton(text, onTap)
	switch variant {
	case ButtonPrimary:
		btn.Importance = widget.HighImportance
	case ButtonDanger:
		btn.Importance = widget.DangerImportance
	case ButtonSuccess:
		btn.Importance = widget.HighImportance
	case ButtonGhost, ButtonOutline:
		btn.Importance = widget.LowImportance
	default:
		btn.Importance = widget.MediumImportance
	}
	return btn
}

func NewButtonGroup(buttons ...*widget.Button) *fyne.Container {
	objs := make([]fyne.CanvasObject, len(buttons))
	for i, b := range buttons {
		objs[i] = b
	}
	return container.NewHBox(objs...)
}

// =============================================================================
// CARD
// =============================================================================

// CardOption is a function that configures a card.
type CardOption func(*CardConfig)

// CardConfig holds card configuration.
type CardConfig struct {
	Title     string
	Subtitle  string
	Icon      fyne.CanvasObject
	Footer    fyne.CanvasObject
	Clickable bool
}

// WithCardTitle sets the card title.
func WithCardTitle(title string) CardOption {
	return func(c *CardConfig) { c.Title = title }
}

// WithCardSubtitle sets the card subtitle.
func WithCardSubtitle(subtitle string) CardOption {
	return func(c *CardConfig) { c.Subtitle = subtitle }
}

// WithCardIcon sets the card icon.
func WithCardIcon(icon fyne.CanvasObject) CardOption {
	return func(c *CardConfig) { c.Icon = icon }
}

// WithCardFooter sets the card footer.
func WithCardFooter(footer fyne.CanvasObject) CardOption {
	return func(c *CardConfig) { c.Footer = footer }
}

// WithCardClickable makes the card clickable.
func WithCardClickable(clickable bool) CardOption {
	return func(c *CardConfig) { c.Clickable = clickable }
}

// NewCard creates a card widget with optional icon, title, subtitle, and footer.
func NewCard(content fyne.CanvasObject, options ...CardOption) *fyne.Container {
	config := &CardConfig{}
	for _, opt := range options {
		opt(config)
	}

	c := DefaultColors()

	var headerObjects []fyne.CanvasObject
	if config.Icon != nil {
		headerObjects = append(headerObjects, config.Icon)
	}
	if config.Title != "" {
		titleText := canvas.NewText(config.Title, c.Text)
		titleText.TextSize = 14
		titleText.TextStyle = fyne.TextStyle{Bold: true}
		headerObjects = append(headerObjects, titleText)
	}
	if config.Subtitle != "" {
		subtitleText := canvas.NewText(config.Subtitle, c.TextMuted)
		subtitleText.TextSize = 12
		headerObjects = append(headerObjects, subtitleText)
	}

	var header *fyne.Container
	if len(headerObjects) > 0 {
		header = container.NewVBox(headerObjects...)
	}

	var body fyne.CanvasObject
	if header != nil {
		body = container.NewVBox(header, content)
	} else {
		body = content
	}

	var finalContent *fyne.Container
	if config.Footer != nil {
		finalContent = container.NewVBox(body, canvas.NewRectangle(c.Border), config.Footer)
	} else {
		if c, ok := body.(*fyne.Container); ok {
			finalContent = c
		} else {
			finalContent = container.NewStack(body)
		}
	}

	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1
	bg.CornerRadius = 14

	return container.NewStack(bg, container.NewPadded(finalContent))
}

// =============================================================================
// INPUTS
// =============================================================================

func NewInput(placeholder string) *widget.Entry {
	entry := widget.NewEntry()
	entry.SetPlaceHolder(placeholder)
	return entry
}

func NewTextarea(placeholder string) *widget.Entry {
	entry := widget.NewMultiLineEntry()
	entry.SetPlaceHolder(placeholder)
	return entry
}

func NewPassword(placeholder string) *widget.Entry {
	entry := widget.NewPasswordEntry()
	entry.SetPlaceHolder(placeholder)
	return entry
}

// =============================================================================
// FORM ELEMENTS
// =============================================================================

func NewCheckbox(label string, onChanged func(bool)) *widget.Check {
	return widget.NewCheck(label, onChanged)
}

func NewRadio(options []string, onChanged func(string)) *widget.RadioGroup {
	return widget.NewRadioGroup(options, onChanged)
}

func NewSelect(options []string, onChanged func(string)) *widget.Select {
	return widget.NewSelect(options, onChanged)
}

func NewSlider(min, max float64) *widget.Slider {
	return widget.NewSlider(min, max)
}

// =============================================================================
// PROGRESS & LOADING
// =============================================================================

func NewProgress() *widget.ProgressBar {
	return widget.NewProgressBar()
}

func NewProgressInfinite() *widget.ProgressBarInfinite {
	return widget.NewProgressBarInfinite()
}

// =============================================================================
// TOGGLE
// =============================================================================

type ToggleRenderer struct {
	toggle *Toggle
}

func (r *ToggleRenderer) Destroy() {}
func (r *ToggleRenderer) Layout(size fyne.Size) {
	if bg, ok := r.toggle.bg.(*canvas.Rectangle); ok {
		bg.Resize(size)
	}
	if r.toggle.bg != nil {
		r.toggle.bg.Resize(size)
	}
}
func (r *ToggleRenderer) MinSize() fyne.Size { return fyne.NewSize(44, 24) }
func (r *ToggleRenderer) Objects() []fyne.CanvasObject {
	return []fyne.CanvasObject{r.toggle.bg}
}
func (r *ToggleRenderer) Refresh() {
	if bg, ok := r.toggle.bg.(*canvas.Rectangle); ok {
		if r.toggle.on {
			bg.FillColor = DefaultColors().Accent
		} else {
			bg.FillColor = DefaultColors().Surface3
		}
	}
}

type Toggle struct {
	widget.BaseWidget
	on       bool
	onToggle func(bool)
	bg       fyne.CanvasObject
}

func NewToggle(onToggle func(bool)) *Toggle {
	c := DefaultColors()
	bg := canvas.NewRectangle(c.Surface3)
	bg.CornerRadius = 12
	t := &Toggle{onToggle: onToggle, bg: bg}
	t.ExtendBaseWidget(t)
	return t
}

func (t *Toggle) CreateRenderer() fyne.WidgetRenderer {
	return &ToggleRenderer{toggle: t}
}

func (t *Toggle) Toggle() {
	t.on = !t.on
	if t.onToggle != nil {
		t.onToggle(t.on)
	}
	t.Refresh()
}

func (t *Toggle) IsOn() bool       { return t.on }
func (t *Toggle) SetOn(value bool) { t.on = value; t.Refresh() }

// =============================================================================
// MODAL
// =============================================================================

type ModalRenderer struct {
	modal *Modal
}

func (r *ModalRenderer) Destroy() {}
func (r *ModalRenderer) Layout(size fyne.Size) {
	if r.modal.content != nil {
		r.modal.content.Resize(size)
	}
}
func (r *ModalRenderer) MinSize() fyne.Size { return fyne.NewSize(400, 300) }
func (r *ModalRenderer) Objects() []fyne.CanvasObject {
	if r.modal.open && r.modal.content != nil {
		return []fyne.CanvasObject{r.modal.content}
	}
	return nil
}
func (r *ModalRenderer) Refresh() {}

type Modal struct {
	widget.BaseWidget
	content fyne.CanvasObject
	open    bool
	window  fyne.Window
}

func NewModal(content fyne.CanvasObject) *Modal {
	m := &Modal{content: content}
	m.ExtendBaseWidget(m)
	return m
}

func (m *Modal) CreateRenderer() fyne.WidgetRenderer {
	return &ModalRenderer{modal: m}
}

func (m *Modal) Open(window fyne.Window) {
	m.window = window
	m.open = true
	m.Show()
}

func (m *Modal) Close()       { m.open = false; m.Hide() }
func (m *Modal) IsOpen() bool { return m.open }
func (m *Modal) Show() {
	if m.window != nil {
		popup := widget.NewModalPopUp(m.content, m.window.Canvas())
		popup.Show()
	}
}
func (m *Modal) Hide() {}

// =============================================================================
// DROPDOWN
// =============================================================================

// Dropdown creates a dropdown selection widget using Fyne's Select widget.
func NewDropdown(items []string, onSelect func(string)) *widget.Select {
	s := widget.NewSelect(items, onSelect)
	return s
}

// =============================================================================
// TABS
// =============================================================================

func NewTabs(items ...*container.TabItem) *container.AppTabs {
	return container.NewAppTabs(items...)
}

// =============================================================================
// ACCORDION
// =============================================================================

type AccordionItem struct {
	Title   string
	Content fyne.CanvasObject
}

type AccordionRenderer struct {
	accordion *Accordion
}

func (r *AccordionRenderer) Destroy()                     {}
func (r *AccordionRenderer) Layout(size fyne.Size)        {}
func (r *AccordionRenderer) MinSize() fyne.Size           { return fyne.NewSize(200, 40) }
func (r *AccordionRenderer) Objects() []fyne.CanvasObject { return nil }
func (r *AccordionRenderer) Refresh()                     {}

type Accordion struct {
	widget.BaseWidget
	items       []AccordionItem
	openIndices map[int]bool
}

func NewAccordion(items ...AccordionItem) *Accordion {
	a := &Accordion{items: items, openIndices: make(map[int]bool)}
	a.ExtendBaseWidget(a)
	return a
}

func (a *Accordion) CreateRenderer() fyne.WidgetRenderer {
	return &AccordionRenderer{accordion: a}
}

func (a *Accordion) Toggle(index int) { a.openIndices[index] = !a.openIndices[index]; a.Refresh() }
func (a *Accordion) Open(index int)   { a.openIndices[index] = true; a.Refresh() }
func (a *Accordion) Close(index int)  { delete(a.openIndices, index); a.Refresh() }
func (a *Accordion) OpenAll() {
	for i := range a.items {
		a.openIndices[i] = true
	}
	a.Refresh()
}
func (a *Accordion) CloseAll()             { a.openIndices = make(map[int]bool); a.Refresh() }
func (a *Accordion) IsOpen(index int) bool { return a.openIndices[index] }

// =============================================================================
// PAGINATION
// =============================================================================

type PaginationRenderer struct {
	pagination *Pagination
}

func (r *PaginationRenderer) Destroy()                     {}
func (r *PaginationRenderer) Layout(size fyne.Size)        {}
func (r *PaginationRenderer) MinSize() fyne.Size           { return fyne.NewSize(200, 36) }
func (r *PaginationRenderer) Objects() []fyne.CanvasObject { return nil }
func (r *PaginationRenderer) Refresh()                     {}

type Pagination struct {
	widget.BaseWidget
	total    int
	current  int
	onChange func(int)
}

func NewPagination(total, current int, onChange func(int)) *Pagination {
	p := &Pagination{total: total, current: current, onChange: onChange}
	p.ExtendBaseWidget(p)
	return p
}

func (p *Pagination) CreateRenderer() fyne.WidgetRenderer {
	return &PaginationRenderer{pagination: p}
}

func (p *Pagination) GoTo(page int) {
	if page >= 1 && page <= p.total {
		p.current = page
		if p.onChange != nil {
			p.onChange(page)
		}
		p.Refresh()
	}
}
func (p *Pagination) Next() {
	if p.current < p.total {
		p.GoTo(p.current + 1)
	}
}
func (p *Pagination) Prev() {
	if p.current > 1 {
		p.GoTo(p.current - 1)
	}
}
func (p *Pagination) Current() int { return p.current }
func (p *Pagination) Total() int   { return p.total }

// =============================================================================
// TOAST
// =============================================================================

type ToastType int

const (
	ToastSuccess ToastType = iota
	ToastError
	ToastWarning
	ToastInfo
)

func ShowToast(window fyne.Window, message string, toastType ToastType) {
	c := DefaultColors()
	var bgColor color.Color
	var prefix string
	switch toastType {
	case ToastSuccess:
		bgColor = c.Success
		prefix = "✓ "
	case ToastError:
		bgColor = c.Error
		prefix = "✕ "
	case ToastWarning:
		bgColor = c.Warning
		prefix = "⚠ "
	default:
		bgColor = c.Info
		prefix = "ℹ "
	}
	label := canvas.NewText(prefix+message, c.Text)
	label.TextSize = 13
	bg := canvas.NewRectangle(bgColor)
	bg.CornerRadius = 10
	cont := container.NewStack(bg, container.NewPadded(label))
	popover := widget.NewPopUp(cont, window.Canvas())
	popover.Move(fyne.NewPos(window.Canvas().Size().Width-320, window.Canvas().Size().Height-60))
}

// =============================================================================
// COMMAND PALETTE
// =============================================================================

type CommandItem struct {
	Title, Subtitle, Kbd string
	Action               func()
}

// CommandPalette creates a modal command palette with search and filtering.
func NewCommandPalette(window fyne.Window, items []CommandItem) *fyne.Container {
	c := DefaultColors()
	searchEntry := widget.NewEntry()
	searchEntry.SetPlaceHolder("Type to search commands...")

	list := widget.NewList(
		func() int { return len(items) },
		func() fyne.CanvasObject {
			return container.NewVBox(
				widget.NewLabel("Command"),
				widget.NewLabel("Description"),
			)
		},
		func(id widget.ListItemID, item fyne.CanvasObject) {
			if id < len(items) {
				vbox := item.(*fyne.Container)
				vbox.Objects[0].(*widget.Label).SetText(items[id].Title)
				vbox.Objects[1].(*widget.Label).SetText(items[id].Subtitle)
			}
		},
	)

	searchEntry.OnChanged = func(query string) {
		// Filter logic can be added here
		list.Refresh()
	}

	list.OnSelected = func(id widget.ListItemID) {
		if id < len(items) && items[id].Action != nil {
			items[id].Action()
			window.Hide()
		}
	}

	content := container.NewVBox(
		searchEntry,
		container.NewScroll(list),
	)

	bg := canvas.NewRectangle(c.Surface)
	bg.CornerRadius = 14

	return container.NewStack(bg, container.NewPadded(content))
}

// =============================================================================
// SEARCH
// =============================================================================

type SearchItem struct {
	Title, Subtitle string
	Action          func()
}

// Search creates a search widget with input and results list.
func NewSearch(items []SearchItem, onSelect func(SearchItem)) *fyne.Container {
	c := DefaultColors()
	searchEntry := widget.NewEntry()
	searchEntry.SetPlaceHolder("Search...")

	results := make([]SearchItem, 0)
	resultsList := widget.NewList(
		func() int { return len(results) },
		func() fyne.CanvasObject {
			return container.NewVBox(
				widget.NewLabel("Title"),
				widget.NewLabel("Subtitle"),
			)
		},
		func(id widget.ListItemID, item fyne.CanvasObject) {
			if id < len(results) {
				vbox := item.(*fyne.Container)
				vbox.Objects[0].(*widget.Label).SetText(results[id].Title)
				vbox.Objects[1].(*widget.Label).SetText(results[id].Subtitle)
			}
		},
	)

	resultsList.OnSelected = func(id widget.ListItemID) {
		if id < len(results) && onSelect != nil {
			onSelect(results[id])
		}
	}

	searchEntry.OnChanged = func(query string) {
		results = make([]SearchItem, 0)
		if query == "" {
			resultsList.Refresh()
			return
		}
		for _, item := range items {
			// Simple case-insensitive search
			if containsIgnoreCase(item.Title, query) || containsIgnoreCase(item.Subtitle, query) {
				results = append(results, item)
			}
		}
		resultsList.Refresh()
	}

	content := container.NewVBox(
		searchEntry,
		container.NewScroll(resultsList),
	)

	_ = c // used above for styling

	return content
}

func containsIgnoreCase(s, substr string) bool {
	return strings.Contains(strings.ToLower(s), strings.ToLower(substr))
}

// =============================================================================
// TABLE
// =============================================================================

func NewTable(rows, cols int, cellFunc func(row, col int) fyne.CanvasObject) *widget.Table {
	return widget.NewTable(
		func() (int, int) { return rows, cols },
		func() fyne.CanvasObject { return widget.NewLabel("") },
		func(id widget.TableCellID, cell fyne.CanvasObject) {
			if obj := cellFunc(id.Row, id.Col); obj != nil {
				cell.(*widget.Label).SetText(obj.(*widget.Label).Text)
			}
		},
	)
}

// =============================================================================
// LIST
// =============================================================================

type ListItem struct {
	Title, Subtitle string
}

func NewList(items []ListItem) *widget.List {
	return widget.NewList(
		func() int { return len(items) },
		func() fyne.CanvasObject { return widget.NewLabel("") },
		func(id widget.ListItemID, item fyne.CanvasObject) {
			item.(*widget.Label).SetText(items[id].Title)
		},
	)
}

// =============================================================================
// LAYOUT HELPERS
// =============================================================================

func NewContainer(content fyne.CanvasObject) fyne.CanvasObject {
	return container.NewStack(content)
}

func NewFlex(objects ...fyne.CanvasObject) fyne.CanvasObject {
	return container.NewHBox(objects...)
}

func NewStack(objects ...fyne.CanvasObject) fyne.CanvasObject {
	return container.NewVBox(objects...)
}

func NewGrid(cols int, objects ...fyne.CanvasObject) fyne.CanvasObject {
	return container.NewGridWithColumns(cols, objects...)
}

func NewForm(items ...*widget.FormItem) *widget.Form {
	return widget.NewForm(items...)
}

// =============================================================================
// NAV
// =============================================================================

// Nav creates a navigation sidebar widget.
func NewNav(items []string, active int, onSelect func(int)) *widget.List {
	list := widget.NewList(
		func() int { return len(items) },
		func() fyne.CanvasObject {
			return widget.NewLabel("Nav Item")
		},
		func(id widget.ListItemID, item fyne.CanvasObject) {
			if id < len(items) {
				item.(*widget.Label).SetText(items[id])
			}
		},
	)
	list.OnSelected = func(id widget.ListItemID) {
		if onSelect != nil {
			onSelect(id)
		}
	}
	if active >= 0 && active < len(items) {
		list.Select(active)
	}
	return list
}

// =============================================================================
// STAT
// =============================================================================

type StatDeltaType int

const (
	StatDeltaUp StatDeltaType = iota
	StatDeltaDown
)

// Stat creates a stat/metric display widget with value, label, and optional delta.
func NewStat(value string, label string, delta string, deltaType StatDeltaType) *fyne.Container {
	c := DefaultColors()

	valueLabel := canvas.NewText(value, c.Text)
	valueLabel.TextSize = 28
	valueLabel.TextStyle = fyne.TextStyle{Bold: true}

	labelWidget := canvas.NewText(label, c.TextMuted)
	labelWidget.TextSize = 11

	var deltaWidget *canvas.Text
	if delta != "" {
		deltaColor := c.SuccessText
		if deltaType == StatDeltaDown {
			deltaColor = c.ErrorText
		}
		prefix := "↑ "
		if deltaType == StatDeltaDown {
			prefix = "↓ "
		}
		deltaWidget = canvas.NewText(prefix+delta, deltaColor)
		deltaWidget.TextSize = 11
	}

	content := container.NewVBox(
		valueLabel,
		labelWidget,
	)

	if deltaWidget != nil {
		content = container.NewVBox(
			valueLabel,
			labelWidget,
			deltaWidget,
		)
	}

	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1
	bg.CornerRadius = 10

	return container.NewStack(bg, container.NewPadded(content))
}

// =============================================================================
// RATING
// =============================================================================

type Rating struct {
	buttons   []*widget.Button
	value     int
	max       int
	onChanged func(int)
}

// NewRating creates a star rating widget. Clicking star *n* sets the value to *n*
// and invokes onChanged. Filled stars render with high importance, empty ones dim.
func NewRating(value, max int, onChanged func(int)) *Rating {
	if max <= 0 {
		max = 5
	}
	r := &Rating{value: value, max: max, onChanged: onChanged}
	for i := 0; i < max; i++ {
		i := i
		btn := widget.NewButton("★", func() { r.SetValue(i + 1) })
		r.buttons = append(r.buttons, btn)
	}
	r.Refresh()
	return r
}

// SetValue sets the rating value and refreshes the stars.
func (r *Rating) SetValue(value int) {
	if value < 0 {
		value = 0
	}
	if value > r.max {
		value = r.max
	}
	r.value = value
	r.Refresh()
	if r.onChanged != nil {
		r.onChanged(value)
	}
}

// Value returns the current rating.
func (r *Rating) Value() int { return r.value }

// Refresh updates star importance based on the current value.
func (r *Rating) Refresh() {
	for i, btn := range r.buttons {
		if i < r.value {
			btn.Importance = widget.HighImportance
		} else {
			btn.Importance = widget.LowImportance
		}
	}
}

// Container returns the stars laid out horizontally for placement in a window.
func (r *Rating) Container() *fyne.Container {
	objs := make([]fyne.CanvasObject, len(r.buttons))
	for i, b := range r.buttons {
		objs[i] = b
	}
	return container.NewHBox(objs...)
}

// =============================================================================
// APPLICATION
// =============================================================================

type App struct {
	fyne.App
	Theme fyne.Theme
}

func NewApp() *App {
	a := app.New()
	t := NewTheme()
	a.Settings().SetTheme(t)
	return &App{App: a, Theme: t}
}

func (a *App) NewWindow(title string) fyne.Window {
	return a.App.NewWindow(title)
}

func Init() fyne.Theme {
	return NewTheme()
}

// =============================================================================
// ALERT
// =============================================================================

type AlertVariant int

const (
	AlertInfo AlertVariant = iota
	AlertSuccess
	AlertWarning
	AlertError
)

// NewAlert creates a styled alert banner with a variant color and message text.
func NewAlert(message string, variant AlertVariant) *fyne.Container {
	c := DefaultColors()
	var bgColor, borderColor, textColor color.Color

	switch variant {
	case AlertSuccess:
		bgColor, borderColor, textColor = c.Success, c.SuccessBorder, c.SuccessText
	case AlertWarning:
		bgColor, borderColor, textColor = c.Warning, c.WarningBorder, c.WarningText
	case AlertError:
		bgColor, borderColor, textColor = c.Error, c.ErrorBorder, c.ErrorText
	default:
		bgColor, borderColor, textColor = c.Info, c.InfoBorder, c.InfoText
	}

	label := canvas.NewText(message, textColor)
	label.TextSize = 13

	bg := canvas.NewRectangle(bgColor)
	bg.StrokeColor = borderColor
	bg.StrokeWidth = 1
	bg.CornerRadius = 10

	return container.NewStack(bg, container.NewPadded(label))
}

// =============================================================================
// AVATAR
// =============================================================================

// NewAvatar creates a circular avatar displaying initials or a color.
func NewAvatar(initials string, bgColor color.Color) *fyne.Container {
	c := DefaultColors()
	if bgColor == nil {
		bgColor = c.Accent
	}

	label := canvas.NewText(initials, c.Text)
	label.TextSize = 14
	label.TextStyle = fyne.TextStyle{Bold: true}
	label.Alignment = fyne.TextAlignCenter

	bg := canvas.NewRectangle(bgColor)
	bg.CornerRadius = 20

	return container.NewStack(bg, container.NewCenter(label))
}

// NewAvatarGroup creates a horizontal row of avatars with overlap.
func NewAvatarGroup(avatars ...*fyne.Container) *fyne.Container {
	objs := make([]fyne.CanvasObject, len(avatars))
	for i, a := range avatars {
		objs[i] = a
	}
	return container.NewHBox(objs...)
}

// =============================================================================
// BADGE
// =============================================================================

type BadgeVariant int

const (
	BadgeDefault BadgeVariant = iota
	BadgePrimary
	BadgeSuccess
	BadgeWarning
	BadgeError
	BadgeInfo
)

// NewBadge creates a small inline badge/label.
func NewBadge(text string, variant BadgeVariant) *fyne.Container {
	c := DefaultColors()
	var bgColor, textColor color.Color

	switch variant {
	case BadgePrimary:
		bgColor, textColor = c.Accent, c.Text
	case BadgeSuccess:
		bgColor, textColor = c.Success, c.SuccessText
	case BadgeWarning:
		bgColor, textColor = c.Warning, c.WarningText
	case BadgeError:
		bgColor, textColor = c.Error, c.ErrorText
	case BadgeInfo:
		bgColor, textColor = c.Info, c.InfoText
	default:
		bgColor, textColor = c.Surface3, c.TextMuted
	}

	label := canvas.NewText(text, textColor)
	label.TextSize = 11
	label.TextStyle = fyne.TextStyle{Bold: true}

	bg := canvas.NewRectangle(bgColor)
	bg.CornerRadius = 9999

	return container.NewStack(bg, container.NewCenter(label))
}

// =============================================================================
// BREADCRUMB
// =============================================================================

// NewBreadcrumb creates a breadcrumb navigation row from a list of labels.
// The last item is styled as the current page.
func NewBreadcrumb(items []string, onNavigate func(int)) *fyne.Container {
	c := DefaultColors()
	var objects []fyne.CanvasObject

	for i, item := range items {
		i := i
		isLast := i == len(items)-1

		var txt *canvas.Text
		if isLast {
			txt = canvas.NewText(item, c.Text)
			txt.TextStyle = fyne.TextStyle{Bold: true}
		} else {
			btn := widget.NewButton(item, func(idx int) func() {
				return func() {
					if onNavigate != nil {
						onNavigate(idx)
					}
				}
			}(i))
			btn.Importance = widget.LowImportance
			objects = append(objects, btn)
			continue
		}
		txt.TextSize = 13

		if isLast {
			objects = append(objects, txt)
			if i < len(items)-1 {
				sep := canvas.NewText(" / ", c.TextDim)
				sep.TextSize = 13
				objects = append(objects, sep)
			}
		}

		if !isLast {
			sep := canvas.NewText(" / ", c.TextDim)
			sep.TextSize = 13
			objects = append(objects, sep)
		}
	}

	return container.NewHBox(objects...)
}

// =============================================================================
// CHIP
// =============================================================================

// ChipVariant mirrors BadgeVariant for chips.
type ChipVariant = BadgeVariant

const (
	ChipDefault = BadgeDefault
	ChipPrimary = BadgePrimary
	ChipSuccess = BadgeSuccess
	ChipWarning = BadgeWarning
	ChipError   = BadgeError
	ChipInfo    = BadgeInfo
)

// NewChip creates a selectable chip/tag with optional dismiss callback.
func NewChip(text string, variant ChipVariant, onDismiss func()) *fyne.Container {
	c := DefaultColors()
	var bgColor, textColor color.Color

	switch variant {
	case BadgePrimary:
		bgColor, textColor = c.Accent, c.Text
	case BadgeSuccess:
		bgColor, textColor = c.Success, c.SuccessText
	case BadgeWarning:
		bgColor, textColor = c.Warning, c.WarningText
	case BadgeError:
		bgColor, textColor = c.Error, c.ErrorText
	case BadgeInfo:
		bgColor, textColor = c.Info, c.InfoText
	default:
		bgColor, textColor = c.Surface3, c.Text
	}

	label := canvas.NewText(text, textColor)
	label.TextSize = 12

	var objects []fyne.CanvasObject
	objects = append(objects, label)

	if onDismiss != nil {
		dismissBtn := widget.NewButton("×", onDismiss)
		dismissBtn.Importance = widget.LowImportance
		objects = append(objects, dismissBtn)
	}

	row := container.NewHBox(objects...)

	bg := canvas.NewRectangle(bgColor)
	bg.CornerRadius = 9999

	return container.NewStack(bg, container.NewPadded(row))
}

// =============================================================================
// EMPTY STATE
// =============================================================================

// NewEmptyState creates a centered empty-state placeholder with title and description.
func NewEmptyState(title, description string) *fyne.Container {
	c := DefaultColors()

	iconText := canvas.NewText("📋", c.TextDim)
	iconText.TextSize = 48
	iconText.Alignment = fyne.TextAlignCenter

	titleText := canvas.NewText(title, c.Text)
	titleText.TextSize = 16
	titleText.TextStyle = fyne.TextStyle{Bold: true}
	titleText.Alignment = fyne.TextAlignCenter

	descText := canvas.NewText(description, c.TextMuted)
	descText.TextSize = 13
	descText.Alignment = fyne.TextAlignCenter

	content := container.NewVBox(
		container.NewCenter(iconText),
		container.NewCenter(titleText),
		container.NewCenter(descText),
	)

	return container.NewCenter(content)
}

// =============================================================================
// SKELETON
// =============================================================================

// NewSkeleton creates a rectangular skeleton loading placeholder.
func NewSkeleton(width, height float32) *fyne.Container {
	c := DefaultColors()
	bg := canvas.NewRectangle(c.Surface3)
	bg.CornerRadius = 6
	bg.Resize(fyne.NewSize(width, height))
	return container.NewStack(bg)
}

// NewSkeletonText creates a text-shaped skeleton placeholder.
func NewSkeletonText() *fyne.Container {
	return NewSkeleton(200, 14)
}

// NewSkeletonCircle creates a circular skeleton placeholder.
func NewSkeletonCircle(size float32) *fyne.Container {
	c := DefaultColors()
	bg := canvas.NewRectangle(c.Surface3)
	bg.CornerRadius = size / 2
	bg.Resize(fyne.NewSize(size, size))
	return container.NewStack(bg)
}

// =============================================================================
// SPINNER
// =============================================================================

// NewSpinner creates an infinite progress bar as a spinner.
func NewSpinner() *widget.ProgressBarInfinite {
	p := widget.NewProgressBarInfinite()
	return p
}

// =============================================================================
// TAG
// =============================================================================

// NewTag creates a tag with an optional dismiss button.
func NewTag(text string, onDismiss func()) *fyne.Container {
	c := DefaultColors()

	label := canvas.NewText(text, c.Text)
	label.TextSize = 12

	var objects []fyne.CanvasObject
	objects = append(objects, label)

	if onDismiss != nil {
		dismissBtn := widget.NewButton("×", onDismiss)
		dismissBtn.Importance = widget.LowImportance
		objects = append(objects, dismissBtn)
	}

	row := container.NewHBox(objects...)

	bg := canvas.NewRectangle(c.Surface3)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1
	bg.CornerRadius = 6

	return container.NewStack(bg, container.NewPadded(row))
}

// =============================================================================
// TOOLTIP
// =============================================================================

// NewTooltip wraps a widget with hover tooltip text.
func NewTooltip(content fyne.CanvasObject, tooltipText string) *fyne.Container {
	tipText := canvas.NewText(tooltipText, DefaultColors().Text)
	tipText.TextSize = 11

	bg := canvas.NewRectangle(DefaultColors().Surface2)
	bg.CornerRadius = 6

	return container.NewStack(bg, container.NewPadded(tipText))
}

// =============================================================================
// TYPOGRAPHY
// =============================================================================

func newTextWithSize(text string, size float32, bold bool) *canvas.Text {
	c := DefaultColors()
	txt := canvas.NewText(text, c.Text)
	txt.TextSize = size
	txt.TextStyle = fyne.TextStyle{Bold: bold}
	return txt
}

// NewH1 creates a large heading text element.
func NewH1(text string) *canvas.Text { return newTextWithSize(text, 36, true) }

// NewH2 creates a heading level 2 text element.
func NewH2(text string) *canvas.Text { return newTextWithSize(text, 28, true) }

// NewH3 creates a heading level 3 text element.
func NewH3(text string) *canvas.Text { return newTextWithSize(text, 20, true) }

// NewH4 creates a heading level 4 text element.
func NewH4(text string) *canvas.Text { return newTextWithSize(text, 16, true) }

// NewH5 creates a heading level 5 text element.
func NewH5(text string) *canvas.Text { return newTextWithSize(text, 14, true) }

// NewH6 creates a heading level 6 text element.
func NewH6(text string) *canvas.Text { return newTextWithSize(text, 12, true) }

// NewText creates a standard body text element.
func NewText(text string) *canvas.Text { return newTextWithSize(text, 14, false) }

// NewLabel creates a muted/small label text element.
func NewLabel(text string) *canvas.Text {
	c := DefaultColors()
	txt := canvas.NewText(text, c.TextMuted)
	txt.TextSize = 12
	return txt
}

// =============================================================================
// DIVIDER
// =============================================================================

// NewDivider creates a horizontal separator line.
func NewDivider() *fyne.Container {
	c := DefaultColors()
	line := canvas.NewRectangle(c.Border)
	line.Resize(fyne.NewSize(200, 1))
	return container.NewStack(line)
}

// NewVerticalDivider creates a vertical separator line.
func NewVerticalDivider() *fyne.Container {
	c := DefaultColors()
	line := canvas.NewRectangle(c.Border)
	line.Resize(fyne.NewSize(1, 200))
	return container.NewStack(line)
}

// =============================================================================
// HSTACK
// =============================================================================

// NewHStack creates a horizontal stack layout (alias for NewFlex).
func NewHStack(objects ...fyne.CanvasObject) *fyne.Container {
	return container.NewHBox(objects...)
}

// =============================================================================
// HEADER
// =============================================================================

// NewHeader creates a fixed-height header bar with a title.
func NewHeader(title string) *fyne.Container {
	c := DefaultColors()
	label := canvas.NewText(title, c.Text)
	label.TextSize = 16
	label.TextStyle = fyne.TextStyle{Bold: true}

	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1

	return container.NewStack(bg, container.NewPadded(label))
}

// =============================================================================
// FOOTER
// =============================================================================

// NewFooter creates a footer bar with centered text.
func NewFooter(text string) *fyne.Container {
	c := DefaultColors()
	label := canvas.NewText(text, c.TextMuted)
	label.TextSize = 11
	label.Alignment = fyne.TextAlignCenter

	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1

	return container.NewStack(bg, container.NewPadded(label))
}

// =============================================================================
// SIDEBAR
// =============================================================================

// NewSidebar creates a vertical navigation sidebar from a list of labels.
func NewSidebar(items []string, active int, onSelect func(int)) *widget.List {
	return NewNav(items, active, onSelect)
}

// =============================================================================
// FORM GROUP
// =============================================================================

// NewFormGroup wraps a label and form control into a vertical group.
func NewFormGroup(label string, control fyne.CanvasObject) *fyne.Container {
	c := DefaultColors()
	lbl := canvas.NewText(label, c.TextMuted)
	lbl.TextSize = 12
	return container.NewVBox(lbl, control)
}

// =============================================================================
// TOAST (component)
// =============================================================================

// NewToast creates a toast notification widget that auto-hides after duration.
type Toast struct {
	widget.BaseWidget
	container *fyne.Container
	message   string
	toastType ToastType
}

func NewToastComponent(message string, toastType ToastType) *Toast {
	return &Toast{message: message, toastType: toastType}
}

func (t *Toast) ShowIn(window fyne.Window) {
	ShowToast(window, t.message, t.toastType)
}

func (t *Toast) ShowTimed(window fyne.Window, duration time.Duration) {
	ShowToast(window, t.message, t.toastType)
	go func() {
		time.Sleep(duration)
	}()
}

// =============================================================================
// NOTIFICATION
// =============================================================================

// NewNotification creates a notification banner with title, description, and optional action.
func NewNotification(title, description string, onAction func()) *fyne.Container {
	c := DefaultColors()

	titleText := canvas.NewText(title, c.Text)
	titleText.TextSize = 13
	titleText.TextStyle = fyne.TextStyle{Bold: true}

	descText := canvas.NewText(description, c.TextMuted)
	descText.TextSize = 12

	content := container.NewVBox(titleText, descText)

	if onAction != nil {
		actionBtn := widget.NewButton("View", onAction)
		actionBtn.Importance = widget.LowImportance
		content = container.NewVBox(content, actionBtn)
	}

	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1
	bg.CornerRadius = 10

	return container.NewStack(bg, container.NewPadded(content))
}

// =============================================================================
// DATE PICKER
// =============================================================================

// NewDatePicker creates a date picker using an entry widget with placeholder.
func NewDatePicker(placeholder string, onChange func(string)) *widget.Entry {
	entry := widget.NewEntry()
	if placeholder == "" {
		placeholder = "YYYY-MM-DD"
	}
	entry.SetPlaceHolder(placeholder)
	if onChange != nil {
		entry.OnChanged = onChange
	}
	return entry
}

// =============================================================================
// DRAWER
// =============================================================================

// DrawerSide represents which side the drawer slides from.
type DrawerSide int

const (
	DrawerLeft DrawerSide = iota
	DrawerRight
	DrawerTop
	DrawerBottom
)

// NewDrawer creates a slide-in drawer container.
func NewDrawer(side DrawerSide, content fyne.CanvasObject, trigger fyne.CanvasObject) *fyne.Container {
	c := DefaultColors()

	bg := canvas.NewRectangle(c.Surface)
	bg.CornerRadius = 10

	padded := container.NewPadded(content)

	switch side {
	case DrawerLeft, DrawerRight:
		return container.NewStack(trigger, container.NewGridWithColumns(1, bg, padded))
	default:
		return container.NewStack(trigger, container.NewGridWithRows(1, bg, padded))
	}
}

// =============================================================================
// POPOVER
// =============================================================================

// NewPopover wraps content in a popover-style floating container.
func NewPopover(content fyne.CanvasObject) *fyne.Container {
	c := DefaultColors()
	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1
	bg.CornerRadius = 10
	bg.ShadowColor = color.RGBA{R: 0, G: 0, B: 0, A: 100}

	return container.NewStack(bg, container.NewPadded(content))
}

// =============================================================================
// TREE VIEW
// =============================================================================

// TreeNode represents a node in a tree structure.
type TreeNode struct {
	Title    string
	Children []*TreeNode
}

// NewTreeView creates a hierarchical tree view widget from tree nodes.
func NewTreeView(nodes []*TreeNode, onSelect func(string)) *widget.Tree {
	if len(nodes) == 0 {
		return widget.NewTree(
			func() []widget.TreeNodeID { return nil },
			func(id widget.TreeNodeID) bool { return false },
			func(id widget.TreeNodeID) fyne.CanvasObject { return widget.NewLabel("") },
			func(id widget.TreeNodeID, node fyne.CanvasObject) {},
		)
	}

	// Build flat ID list for the tree
	var ids []widget.TreeNodeID
	var buildIDs func(nodes []*TreeNode, prefix string)
	buildIDs = func(nodes []*TreeNode, prefix string) {
		for i, n := range nodes {
			id := widget.TreeNodeID(fmt.Sprintf("%s/%d", prefix, i))
			ids = append(ids, id)
			if len(n.Children) > 0 {
				buildIDs(n.Children, id)
			}
		}
	}
	buildIDs(nodes, "root")

	return widget.NewTree(
		func() []widget.TreeNodeID { return ids },
		func(id widget.TreeNodeID) bool {
			// Determine if this node has children
			parts := splitPath(string(id))
			node := nodes
			for _, p := range parts[1:] { // skip "root"
				idx := 0
				fmt.Sscanf(p, "%d", &idx)
				if idx < len(node) {
					if len(parts) == 1 || p == parts[len(parts)-1] {
						return len(node[idx].Children) > 0
					}
					node = node[idx].Children
				}
			}
			return false
		},
		func(id widget.TreeNodeID) fyne.CanvasObject {
			return widget.NewLabel("Node")
		},
		func(id widget.TreeNodeID, node fyne.CanvasObject) {
			parts := splitPath(string(id))
			currentNodes := nodes
			var currentTitle string
			for _, p := range parts[1:] {
				idx := 0
				fmt.Sscanf(p, "%d", &idx)
				if idx < len(currentNodes) {
					currentTitle = currentNodes[idx].Title
					currentNodes = currentNodes[idx].Children
				}
			}
			node.(*widget.Label).SetText(currentTitle)
		},
	)
}

func splitPath(path string) []string {
	if path == "" {
		return nil
	}
	var result []string
	start := 0
	for i := 0; i < len(path); i++ {
		if path[i] == '/' {
			if i > start {
				result = append(result, path[start:i])
			}
			start = i + 1
		}
	}
	if start < len(path) {
		result = append(result, path[start:])
	}
	return result
}

// =============================================================================
// STEPPER
// =============================================================================

// NewStepper creates a step indicator with current step and total steps.
func NewStepper(current, total int) *fyne.Container {
	c := DefaultColors()
	var objects []fyne.CanvasObject

	for i := 1; i <= total; i++ {
		var dot *canvas.Circle
		if i <= current {
			dot = canvas.NewCircle(c.Accent)
		} else {
			dot = canvas.NewCircle(c.Surface3)
		}
		dot.Resize(fyne.NewSize(12, 12))
		objects = append(objects, dot)

		if i < total {
			var line *canvas.Rectangle
			if i < current {
				line = canvas.NewRectangle(c.Accent)
			} else {
				line = canvas.NewRectangle(c.Surface3)
			}
			line.Resize(fyne.NewSize(24, 2))
			objects = append(objects, line)
		}
	}

	return container.NewHBox(objects...)
}

// =============================================================================
// TIMELINE
// =============================================================================

// TimelineItem represents a single timeline event.
type TimelineItem struct {
	Title       string
	Description string
	Time        string
}

// NewTimeline creates a vertical timeline from a list of timeline items.
func NewTimeline(items []TimelineItem) *fyne.Container {
	c := DefaultColors()
	var objects []fyne.CanvasObject

	for _, item := range items {
		// Time label
		timeText := canvas.NewText(item.Time, c.TextDim)
		timeText.TextSize = 11

		// Title
		titleText := canvas.NewText(item.Title, c.Text)
		titleText.TextSize = 13
		titleText.TextStyle = fyne.TextStyle{Bold: true}

		// Description
		descText := canvas.NewText(item.Description, c.TextMuted)
		descText.TextSize = 12

		dot := canvas.NewCircle(c.Accent)
		dot.Resize(fyne.NewSize(8, 8))

		line := canvas.NewRectangle(c.Border)
		line.Resize(fyne.NewSize(2, 40))

		content := container.NewVBox(timeText, titleText, descText)

		row := container.NewHBox(
			container.NewVBox(container.NewCenter(dot), container.NewCenter(line)),
			content,
		)

		objects = append(objects, row)
	}

	return container.NewVBox(objects...)
}

// =============================================================================
// FILE INPUT
// =============================================================================

// NewFileInput creates a file selection widget that opens a file dialog.
func NewFileInput(accept []string, onSelect func(string)) *fyne.Container {
	c := DefaultColors()

	btn := widget.NewButton("Choose File", func() {
		dialog := dialog.NewFileOpen(func(reader fyne.URIReadCloser, err error) {
			if err == nil && reader != nil {
				if onSelect != nil {
					onSelect(reader.URI().Path())
				}
				reader.Close()
			}
		}, nil)
		if len(accept) > 0 {
			filter := storage.NewExtensionFileFilter(accept)
			dialog.SetFilter(filter)
		}
		dialog.Show()
	})
	btn.Importance = widget.LowImportance

	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1
	bg.CornerRadius = 10

	return container.NewStack(bg, container.NewPadded(btn))
}

// =============================================================================
// FILE UPLOAD
// =============================================================================

// NewFileUpload creates a file upload area that accepts files via dialog.
func NewFileUpload(accept []string, onSelect func(string)) *fyne.Container {
	return NewFileInput(accept, onSelect)
}

// =============================================================================
// COLOR PICKER
// =============================================================================

// ColorPickerPreset represents a preset color swatch.
type ColorPickerPreset struct {
	Name  string
	Color color.Color
}

// NewColorPicker creates a color picker with preset swatches.
func NewColorPicker(presets []ColorPickerPreset, onSelect func(color.Color)) *fyne.Container {
	c := DefaultColors()
	var swatches []fyne.CanvasObject

	for _, p := range presets {
		cc := p.Color
		btn := widget.NewButton("", func() {
			if onSelect != nil {
				onSelect(cc)
			}
		})
		btn.Importance = widget.LowImportance
		swatches = append(swatches, btn)
	}

	row := container.NewGridWrap(len(presets), swatches...)

	bg := canvas.NewRectangle(c.Surface)
	bg.StrokeColor = c.Border
	bg.StrokeWidth = 1
	bg.CornerRadius = 10

	return container.NewStack(bg, container.NewPadded(row))
}
