package cronixui

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

// Version of CronixUI
const Version = "1.0.6"

// =============================================================================
// DESIGN TOKENS
// =============================================================================

// Color tokens - all extracted from CSS variables
type Colors struct {
	// Background
	BG       color.Color
	Surface  color.Color
	Surface2 color.Color
	Surface3 color.Color
	Surface4 color.Color

	// Text
	Text      color.Color
	TextMuted color.Color
	TextDim   color.Color

	// Accent (Crimson)
	Accent      color.Color
	AccentHover color.Color
	AccentLight color.Color
	AccentGlow  color.Color
	AccentText  color.Color

	// Semantic - Success
	Success       color.Color
	SuccessBorder color.Color
	SuccessText   color.Color

	// Semantic - Warning
	Warning       color.Color
	WarningBorder color.Color
	WarningText   color.Color

	// Semantic - Error
	ErrorColor  color.Color
	ErrorBorder color.Color
	ErrorText   color.Color

	// Semantic - Info
	Info       color.Color
	InfoBorder color.Color
	InfoText   color.Color

	// Border
	Border      color.Color
	BorderHover color.Color
	BorderFocus color.Color
}

// DefaultColors returns the CronixUI color palette
func DefaultColors() *Colors {
	return &Colors{
		// Background
		BG:       color.RGBA{R: 10, G: 10, B: 10, A: 255},
		Surface:  color.RGBA{R: 17, G: 17, B: 17, A: 255},
		Surface2: color.RGBA{R: 26, G: 26, B: 26, A: 255},
		Surface3: color.RGBA{R: 34, G: 34, B: 34, A: 255},
		Surface4: color.RGBA{R: 42, G: 42, B: 42, A: 255},

		// Text
		Text:      color.RGBA{R: 240, G: 237, B: 232, A: 255},
		TextMuted: color.RGBA{R: 240, G: 237, B: 232, A: 128},
		TextDim:   color.RGBA{R: 240, G: 237, B: 232, A: 64},

		// Accent
		Accent:      color.RGBA{R: 107, G: 35, B: 35, A: 255},
		AccentHover: color.RGBA{R: 125, G: 42, B: 42, A: 255},
		AccentLight: color.RGBA{R: 138, G: 53, B: 53, A: 255},
		AccentGlow:  color.RGBA{R: 107, G: 35, B: 35, A: 77},
		AccentText:  color.RGBA{R: 201, G: 122, B: 122, A: 255},

		// Success
		Success:       color.RGBA{R: 30, G: 80, B: 40, A: 255},
		SuccessBorder: color.RGBA{R: 60, G: 140, B: 70, A: 102},
		SuccessText:   color.RGBA{R: 107, G: 196, B: 122, A: 255},

		// Warning
		Warning:       color.RGBA{R: 80, G: 60, B: 20, A: 255},
		WarningBorder: color.RGBA{R: 150, G: 110, B: 30, A: 102},
		WarningText:   color.RGBA{R: 196, G: 164, B: 58, A: 255},

		// Error
		ErrorColor:  color.RGBA{R: 80, G: 20, B: 20, A: 255},
		ErrorBorder: color.RGBA{R: 180, G: 60, B: 60, A: 102},
		ErrorText:   color.RGBA{R: 196, G: 107, B: 107, A: 255},

		// Info
		Info:       color.RGBA{R: 20, G: 53, B: 80, A: 255},
		InfoBorder: color.RGBA{R: 60, G: 140, B: 200, A: 102},
		InfoText:   color.RGBA{R: 107, G: 168, B: 196, A: 255},

		// Border
		Border:      color.RGBA{R: 255, G: 255, B: 255, A: 20},
		BorderHover: color.RGBA{R: 255, G: 255, B: 255, A: 38},
		BorderFocus: color.RGBA{R: 255, G: 255, B: 255, A: 64},
	}
}

// Typography tokens
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

// Spacing tokens
type Spacing struct {
	Space1  float32
	Space2  float32
	Space3  float32
	Space4  float32
	Space5  float32
	Space6  float32
	Space8  float32
	Space10 float32
	Space12 float32
}

func DefaultSpacing() *Spacing {
	return &Spacing{
		Space1:  4,
		Space2:  8,
		Space3:  12,
		Space4:  16,
		Space5:  20,
		Space6:  24,
		Space8:  32,
		Space10: 40,
		Space12: 48,
	}
}

// Radius tokens
type Radius struct {
	SM   float32
	Def  float32
	LG   float32
	XL   float32
	Full float32
}

func DefaultRadius() *Radius {
	return &Radius{
		SM:   6,
		Def:  10,
		LG:   14,
		XL:   20,
		Full: 9999,
	}
}

// ZIndex tokens
type ZIndex struct {
	Dropdown      int
	Sticky        int
	Fixed         int
	ModalBackdrop int
	Modal         int
	Popover       int
	Tooltip       int
	Toast         int
}

func DefaultZIndex() *ZIndex {
	return &ZIndex{
		Dropdown:      100,
		Sticky:        200,
		Fixed:         300,
		ModalBackdrop: 400,
		Modal:         500,
		Popover:       600,
		Tooltip:       700,
		Toast:         800,
	}
}

// Layout tokens
type Layout struct {
	ContainerMax float32
	SidebarWidth float32
	HeaderHeight float32
}

func DefaultLayout() *Layout {
	return &Layout{
		ContainerMax: 1200,
		SidebarWidth: 260,
		HeaderHeight: 60,
	}
}

// =============================================================================
// CRONIX UI THEME
// =============================================================================

// Theme implements fyne.Theme with CronixUI colors
type Theme struct {
	colors  *Colors
	spacing *Spacing
	radius  *Radius
}

// NewTheme creates a new CronixUI theme
func NewTheme() fyne.Theme {
	return &Theme{
		colors:  DefaultColors(),
		spacing: DefaultSpacing(),
		radius:  DefaultRadius(),
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
		return t.colors.ErrorColor
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
	case theme.SizeNameInlinePadding:
		return t.spacing.Space3
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
		return t.radius.Def
	case theme.SizeNameSelectionRadius:
		return t.radius.SM
	default:
		return 0
	}
}

// =============================================================================
// COMPONENTS
// =============================================================================

// Button variants
type ButtonVariant int

const (
	ButtonDefault ButtonVariant = iota
	ButtonPrimary
	ButtonGhost
	ButtonOutline
	ButtonDanger
	ButtonSuccess
)

// NewButton creates a styled button
func NewButton(text string, variant ButtonVariant, onTap func()) *widget.Button {
	btn := widget.NewButton(text, onTap)

	colors := DefaultColors()

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

// NewCard creates a card container
func NewCard(title string, content fyne.CanvasObject) *widget.Card {
	return widget.NewCard(title, "", content)
}

// NewInput creates a styled entry
func NewInput(placeholder string) *widget.Entry {
	entry := widget.NewEntry()
	entry.SetPlaceHolder(placeholder)
	return entry
}

// NewTextarea creates a multi-line entry
func NewTextarea(placeholder string) *widget.Entry {
	entry := widget.NewMultiLineEntry()
	entry.SetPlaceHolder(placeholder)
	return entry
}

// NewCheckbox creates a styled checkbox
func NewCheckbox(label string, onChanged func(bool)) *widget.Check {
	return widget.NewCheck(label, onChanged)
}

// NewRadio creates radio buttons
func NewRadio(options []string, onChanged func(string)) *widget.RadioGroup {
	return widget.NewRadioGroup(options, onChanged)
}

// NewSelect creates a select dropdown
func NewSelect(options []string, onChanged func(string)) *widget.Select {
	return widget.NewSelect(options, onChanged)
}

// NewSlider creates a slider
func NewSlider(min, max float64) *widget.Slider {
	return widget.NewSlider(min, max)
}

// NewProgress creates a progress bar
func NewProgress() *widget.ProgressBar {
	return widget.NewProgressBar()
}

// NewProgressInfinite creates an infinite progress bar
func NewProgressInfinite() *widget.ProgressBarInfinite {
	return widget.NewProgressBarInfinite()
}

// =============================================================================
// TOGGLE COMPONENT
// =============================================================================

type Toggle struct {
	widget.BaseWidget
	on       bool
	onToggle func(bool)
}

func NewToggle(onToggle func(bool)) *Toggle {
	t := &Toggle{
		onToggle: onToggle,
	}
	t.ExtendBaseWidget(t)
	return t
}

func (t *Toggle) Toggle() {
	t.on = !t.on
	if t.onToggle != nil {
		t.onToggle(t.on)
	}
	t.Refresh()
}

func (t *Toggle) IsOn() bool {
	return t.on
}

func (t *Toggle) SetOn(value bool) {
	t.on = value
	t.Refresh()
}

// =============================================================================
// MODAL COMPONENT
// =============================================================================

type Modal struct {
	widget.BaseWidget
	content fyne.CanvasObject
	open    bool
	window  fyne.Window
}

func NewModal(content fyne.CanvasObject) *Modal {
	m := &Modal{
		content: content,
	}
	m.ExtendBaseWidget(m)
	return m
}

func (m *Modal) Open(window fyne.Window) {
	m.window = window
	m.open = true
	m.Show()
}

func (m *Modal) Close() {
	m.open = false
	m.Hide()
}

func (m *Modal) IsOpen() bool {
	return m.open
}

func (m *Modal) Show() {
	if m.window != nil {
		popup := widget.NewModalPopUp(m.content, m.window.Canvas())
		popup.Show()
	}
}

func (m *Modal) Hide() {
	// Modal popup close handled by Fyne
}

// =============================================================================
// DROPDOWN COMPONENT
// =============================================================================

type Dropdown struct {
	widget.BaseWidget
	items    []string
	selected string
	open     bool
	onSelect func(string)
}

func NewDropdown(items []string, onSelect func(string)) *Dropdown {
	d := &Dropdown{
		items:    items,
		onSelect: onSelect,
	}
	d.ExtendBaseWidget(d)
	return d
}

func (d *Dropdown) Open() {
	d.open = true
	d.Refresh()
}

func (d *Dropdown) Close() {
	d.open = false
	d.Refresh()
}

func (d *Dropdown) Toggle() {
	d.open = !d.open
	d.Refresh()
}

func (d *Dropdown) IsOpen() bool {
	return d.open
}

// =============================================================================
// TABS COMPONENT
// =============================================================================

type Tabs struct {
	widget.BaseWidget
	items       []*widget.TabItem
	activeIndex int
}

func NewTabs(items ...*widget.TabItem) *Tabs {
	t := &Tabs{
		items: items,
	}
	t.ExtendBaseWidget(t)
	return t
}

func (t *Tabs) SetActive(index int) {
	t.activeIndex = index
	t.Refresh()
}

func (t *Tabs) ActiveIndex() int {
	return t.activeIndex
}

// =============================================================================
// ACCORDION COMPONENT
// =============================================================================

type AccordionItem struct {
	Title   string
	Content fyne.CanvasObject
}

type Accordion struct {
	widget.BaseWidget
	items       []AccordionItem
	openIndices map[int]bool
}

func NewAccordion(items ...AccordionItem) *Accordion {
	a := &Accordion{
		items:       items,
		openIndices: make(map[int]bool),
	}
	a.ExtendBaseWidget(a)
	return a
}

func (a *Accordion) Toggle(index int) {
	a.openIndices[index] = !a.openIndices[index]
	a.Refresh()
}

func (a *Accordion) Open(index int) {
	a.openIndices[index] = true
	a.Refresh()
}

func (a *Accordion) Close(index int) {
	delete(a.openIndices, index)
	a.Refresh()
}

func (a *Accordion) OpenAll() {
	for i := range a.items {
		a.openIndices[i] = true
	}
	a.Refresh()
}

func (a *Accordion) CloseAll() {
	a.openIndices = make(map[int]bool)
	a.Refresh()
}

func (a *Accordion) IsOpen(index int) bool {
	return a.openIndices[index]
}

// =============================================================================
// PAGINATION COMPONENT
// =============================================================================

type Pagination struct {
	widget.BaseWidget
	total    int
	current  int
	onChange func(int)
}

func NewPagination(total, current int, onChange func(int)) *Pagination {
	p := &Pagination{
		total:    total,
		current:  current,
		onChange: onChange,
	}
	p.ExtendBaseWidget(p)
	return p
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

func (p *Pagination) Current() int {
	return p.current
}

func (p *Pagination) Total() int {
	return p.total
}

// =============================================================================
// TOAST NOTIFICATIONS
// =============================================================================

type ToastType int

const (
	ToastTypeSuccess ToastType = iota
	ToastTypeError
	ToastTypeWarning
	ToastTypeInfo
)

func ShowToast(window fyne.Window, message string, toastType ToastType) {
	colors := DefaultColors()

	var bgColor color.Color
	var prefix string

	switch toastType {
	case ToastTypeSuccess:
		bgColor = colors.Success
		prefix = "✓ "
	case ToastTypeError:
		bgColor = colors.ErrorColor
		prefix = "✕ "
	case ToastTypeWarning:
		bgColor = colors.Warning
		prefix = "⚠ "
	default:
		bgColor = colors.Info
		prefix = "ℹ "
	}

	label := canvas.NewText(prefix+message, colors.Text)
	label.TextSize = 13

	bg := canvas.NewRectangle(bgColor)
	bg.CornerRadius = 10

	container := container.NewStack(bg, container.NewPadded(label))

	popover := widget.NewPopUp(container, window.Canvas())
	popover.Move(fyne.NewPos(
		window.Canvas().Size().Width-320,
		window.Canvas().Size().Height-60,
	))
}

// =============================================================================
// COMMAND PALETTE
// =============================================================================

type CommandItem struct {
	Title    string
	Subtitle string
	Kbd      string
	Action   func()
}

type CommandPalette struct {
	widget.BaseWidget
	items []CommandItem
	query string
}

func NewCommandPalette(items ...CommandItem) *CommandPalette {
	cp := &CommandPalette{
		items: items,
	}
	cp.ExtendBaseWidget(cp)
	return cp
}

func (cp *CommandPalette) SetItems(items []CommandItem) {
	cp.items = items
	cp.Refresh()
}

func (cp *CommandPalette) Filter(query string) []CommandItem {
	var results []CommandItem
	for _, item := range cp.items {
		// Simple contains match
		results = append(results, item)
	}
	return results
}

// =============================================================================
// SEARCH COMPONENT
// =============================================================================

type SearchItem struct {
	Title    string
	Subtitle string
	Action   func()
}

type Search struct {
	widget.BaseWidget
	items []SearchItem
	query string
}

func NewSearch(items ...SearchItem) *Search {
	s := &Search{
		items: items,
	}
	s.ExtendBaseWidget(s)
	return s
}

func (s *Search) SetItems(items []SearchItem) {
	s.items = items
	s.Refresh()
}

func (s *Search) Filter(query string) []SearchItem {
	var results []SearchItem
	for _, item := range s.items {
		results = append(results, item)
	}
	return results
}

// =============================================================================
// LAYOUT HELPERS
// =============================================================================

// NewContainer creates a max-width container
func NewContainer(content fyne.CanvasObject) fyne.CanvasObject {
	return container.NewMax(content)
}

// NewFlex creates a flex container
func NewFlex(objects ...fyne.CanvasObject) fyne.CanvasObject {
	return container.NewHBox(objects...)
}

// NewStack creates a vertical stack
func NewStack(objects ...fyne.CanvasObject) fyne.CanvasObject {
	return container.NewVBox(objects...)
}

// NewGrid creates a grid layout
func NewGrid(cols int, objects ...fyne.CanvasObject) fyne.CanvasObject {
	return container.NewGridWithColumns(cols, objects...)
}

// NewForm creates a form group
func NewForm(items ...*widget.FormItem) *widget.Form {
	return widget.NewForm(items...)
}

// =============================================================================
// APPLICATION
// =============================================================================

// App represents a CronixUI application
type App struct {
	fyne.App
	Theme fyne.Theme
}

// NewApp creates a new CronixUI application
func NewApp() *App {
	a := app.New()
	theme := NewTheme()
	a.Settings().SetTheme(theme)

	return &App{
		App:   a,
		Theme: theme,
	}
}

// NewWindow creates a new themed window
func (a *App) NewWindow(title string) fyne.Window {
	return a.App.NewWindow(title)
}

// Init initializes CronixUI
func Init() fyne.Theme {
	return NewTheme()
}
