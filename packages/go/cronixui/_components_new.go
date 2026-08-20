package cronixui

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/widget"
)

// =============================================================================
// ALERT
// =============================================================================

type AlertVariant string

const (
	AlertDefault AlertVariant = "default"
	AlertSuccess AlertVariant = "success"
	AlertWarning AlertVariant = "warning"
	AlertError   AlertVariant = "error"
	AlertInfo    AlertVariant = "info"
)

type Alert struct {
	fyne.CanvasObject
}

func NewAlert(text string, variant AlertVariant) *Alert {
	var bg color.Color

	switch variant {
	case AlertSuccess:
		bg = color.NRGBA{R: 0, G: 80, B: 50, A: 255}
	case AlertWarning:
		bg = color.NRGBA{R: 80, G: 70, B: 0, A: 255}
	case AlertError:
		bg = color.NRGBA{R: 80, G: 20, B: 20, A: 255}
	case AlertInfo:
		bg = color.NRGBA{R: 20, G: 40, B: 80, A: 255}
	default:
		bg = color.NRGBA{R: 30, G: 30, B: 40, A: 255}
	}

	rect := canvas.NewRectangle(bg)
	rect.CornerRadius = 14
	rect.StrokeColor = color.NRGBA{R: 50, G: 50, B: 60, A: 255}
	rect.StrokeWidth = 1

	label := widget.NewLabel(text)
	label.Wrapping = fyne.TextWrapWord

	return &Alert{CanvasObject: container.NewStack(rect, container.NewPadded(label))}
}

// =============================================================================
// AVATAR
// =============================================================================

type Avatar struct {
	fyne.CanvasObject
}

func NewAvatar(size float32, label string) *Avatar {
	bg := canvas.NewRectangle(color.NRGBA{R: 180, G: 40, B: 60, A: 255})
	bg.CornerRadius = size / 2

	lbl := widget.NewLabel(label)
	lbl.Alignment = fyne.TextAlignCenter

	return &Avatar{CanvasObject: container.NewStack(bg, container.NewPadded(lbl))}
}

// =============================================================================
// BADGE
// =============================================================================

type Badge struct {
	fyne.CanvasObject
}

func NewBadge(text string, variant AlertVariant) *Badge {
	_ = variant
	lbl := widget.NewLabel(text)
	lbl.Importance = widget.LowImportance
	return &Badge{CanvasObject: lbl}
}

// =============================================================================
// BREADCRUMB
// =============================================================================

type BreadcrumbItem struct {
	Label string
	OnTap func()
}

type Breadcrumb struct {
	fyne.CanvasObject
}

func NewBreadcrumb(items []BreadcrumbItem) *Breadcrumb {
	var objects []fyne.CanvasObject
	for i, item := range items {
		lbl := widget.NewLabel(item.Label)
		if i < len(items)-1 {
			lbl.Importance = widget.LowImportance
			if item.OnTap != nil {
				lbl.OnTapped = item.OnTap
			}
		}
		objects = append(objects, lbl)
		if i < len(items)-1 {
			sep := widget.NewLabel(" > ")
			sep.Importance = widget.LowImportance
			objects = append(objects, sep)
		}
	}
	return &Breadcrumb{CanvasObject: container.NewHBox(objects...)}
}

// =============================================================================
// FILE INPUT
// =============================================================================

type FileInput struct {
	fyne.CanvasObject
}

func NewFileInput(onFileChosen func(string)) *FileInput {
	btn := widget.NewButton("Choose File...", func() {
		dialog.ShowFileOpen(func(reader fyne.URIReadCloser, err error) {
			if err == nil && reader != nil {
				if onFileChosen != nil {
					onFileChosen(reader.URI().Path())
				}
				reader.Close()
			}
		}, nil)
	})
	return &FileInput{CanvasObject: btn}
}

// =============================================================================
// FOOTER
// =============================================================================

type Footer struct {
	fyne.CanvasObject
}

func NewFooter(objects ...fyne.CanvasObject) *Footer {
	bg := canvas.NewRectangle(color.NRGBA{R: 20, G: 20, B: 28, A: 255})
	bg.StrokeColor = color.NRGBA{R: 50, G: 50, B: 60, A: 255}
	bg.StrokeWidth = 1

	return &Footer{CanvasObject: container.NewStack(bg, container.NewPadded(container.NewHBox(objects...)))}
}

// =============================================================================
// HEADER
// =============================================================================

type Header struct {
	fyne.CanvasObject
}

func NewHeader(title string, actions ...fyne.CanvasObject) *Header {
	bg := canvas.NewRectangle(color.NRGBA{R: 20, G: 20, B: 28, A: 255})
	bg.StrokeColor = color.NRGBA{R: 50, G: 50, B: 60, A: 255}
	bg.StrokeWidth = 1

	titleLbl := widget.NewLabel(title)
	titleLbl.TextStyle = fyne.TextStyle{Bold: true}

	return &Header{CanvasObject: container.NewStack(bg, container.NewPadded(container.NewHBox(titleLbl, container.NewHBox(actions...))))}
}

// =============================================================================
// SKELETON
// =============================================================================

type Skeleton struct {
	fyne.CanvasObject
}

func NewSkeleton(width, height float32) *Skeleton {
	bg := canvas.NewRectangle(color.NRGBA{R: 40, G: 40, B: 50, A: 255})
	bg.CornerRadius = 8
	bg.SetMinSize(fyne.NewSize(width, height))
	return &Skeleton{CanvasObject: bg}
}

// =============================================================================
// SIDEBAR
// =============================================================================

type Sidebar struct {
	fyne.CanvasObject
}

func NewSidebar(items []string, active int, onSelect func(int)) *Sidebar {
	list := widget.NewList(
		func() int { return len(items) },
		func() fyne.CanvasObject { return widget.NewLabel("") },
		func(id widget.ListItemID, obj fyne.CanvasObject) {
			obj.(*widget.Label).SetText(items[id])
		},
	)
	list.OnSelected = func(id widget.ListItemID) {
		if onSelect != nil {
			onSelect(id)
		}
	}
	bg := canvas.NewRectangle(color.NRGBA{R: 20, G: 20, B: 28, A: 255})
	bg.StrokeColor = color.NRGBA{R: 50, G: 50, B: 60, A: 255}
	bg.StrokeWidth = 1
	return &Sidebar{CanvasObject: container.NewStack(bg, list)}
}

// =============================================================================
// SPINNER
// =============================================================================

type Spinner struct {
	fyne.CanvasObject
}

func NewSpinner() *Spinner {
	return &Spinner{CanvasObject: widget.NewActivity()}
}

// =============================================================================
// TAG
// =============================================================================

type Tag struct {
	fyne.CanvasObject
}

func NewTag(text string) *Tag {
	lbl := widget.NewLabel(text)
	lbl.Importance = widget.LowImportance
	return &Tag{CanvasObject: lbl}
}

// =============================================================================
// TOAST
// =============================================================================

type Toast struct {
	fyne.CanvasObject
}

func NewToast(message string, variant AlertVariant) *Toast {
	var bg color.Color
	switch variant {
	case AlertSuccess:
		bg = color.NRGBA{R: 0, G: 80, B: 50, A: 255}
	case AlertWarning:
		bg = color.NRGBA{R: 80, G: 70, B: 0, A: 255}
	case AlertError:
		bg = color.NRGBA{R: 80, G: 20, B: 20, A: 255}
	default:
		bg = color.NRGBA{R: 30, G: 30, B: 40, A: 255}
	}
	rect := canvas.NewRectangle(bg)
	rect.CornerRadius = 14
	label := widget.NewLabel(message)
	return &Toast{CanvasObject: container.NewStack(rect, container.NewPadded(label))}
}

// =============================================================================
// TOOLTIP
// =============================================================================

type Tooltip struct {
	fyne.CanvasObject
}

func NewTooltip(content fyne.CanvasObject, text string) *Tooltip {
	wrapped := widget.NewLabel(text)
	wrapped.Wrapping = fyne.TextWrapWord
	bg := canvas.NewRectangle(color.NRGBA{R: 30, G: 30, B: 40, A: 255})
	bg.CornerRadius = 8
	return &Tooltip{CanvasObject: container.NewStack(bg, container.NewPadded(wrapped))}
}

// =============================================================================
// NEW COMPONENTS - Stepper, DatePicker, Chip, Timeline, Drawer, Popover
// =============================================================================

// StepperStep represents a single step in a Stepper.
type StepperStep struct {
	Label       string
	Description string
}

// Stepper is a step indicator.
type Stepper struct {
	fyne.CanvasObject
	current int
	steps   []StepperStep
}

func NewStepper(steps []StepperStep, current int) *Stepper {
	items := make([]fyne.CanvasObject, len(steps))
	for i, s := range steps {
		text := fmt.Sprintf("%d. %s", i+1, s.Label)
		if i < current {
			text = fmt.Sprintf("✓ %s", s.Label)
		} else if i == current {
			text = fmt.Sprintf("▶ %s", s.Label)
		}
		items[i] = widget.NewLabel(text)
	}
	return &Stepper{CanvasObject: container.NewHBox(items...), current: current, steps: steps}
}

// DatePicker is a simple date entry.
type DatePicker struct {
	*widget.Entry
}

func NewDatePicker() *DatePicker {
	e := widget.NewEntry()
	e.PlaceHolder = "YYYY-MM-DD"
	return &DatePicker{Entry: e}
}

// Chip is a selectable/removable tag.
type Chip struct {
	fyne.CanvasObject
	Selected bool
}

func NewChip(label string, selected bool) *Chip {
	bg := canvas.NewRectangle(color.NRGBA{R: 26, G: 26, B: 26, A: 255})
	if selected {
		bg.FillColor = color.NRGBA{R: 107, G: 35, B: 35, A: 255}
	}
	bg.CornerRadius = 16
	lbl := widget.NewLabel(label)
	return &Chip{CanvasObject: container.NewStack(bg, container.NewPadded(lbl)), Selected: selected}
}

// TimelineItem is a single event in a Timeline.
type TimelineItem struct {
	Title       string
	Description string
	Timestamp   string
}

// Timeline shows events in chronological order.
type Timeline struct {
	fyne.CanvasObject
}

func NewTimeline(items []TimelineItem) *Timeline {
	boxes := make([]fyne.CanvasObject, 0, len(items)*2)
	for i, item := range items {
		dot := canvas.NewCircle(color.NRGBA{R: 107, G: 35, B: 35, A: 255})
		dot.Resize(fyne.NewSize(10, 10))
		title := widget.NewLabel(fmt.Sprintf("%s  %s", item.Title, item.Timestamp))
		title.Wrapping = fyne.TextWrapWord
		children := []fyne.CanvasObject{dot, title}
		if item.Description != "" {
			children = append(children, widget.NewLabel(item.Description))
		}
		box := container.NewVBox(children...)
		boxes = append(boxes, box)
		if i < len(items)-1 {
			line := canvas.NewRectangle(color.NRGBA{R: 42, G: 42, B: 42, A: 255})
			line.Resize(fyne.NewSize(2, 20))
			boxes = append(boxes, line)
		}
	}
	return &Timeline{CanvasObject: container.NewVBox(boxes...)}
}

// Drawer is a slide-in panel.
type Drawer struct {
	fyne.CanvasObject
	open bool
}

func NewDrawer(title string, content fyne.CanvasObject) *Drawer {
	titleLbl := widget.NewLabel(title)
	return &Drawer{CanvasObject: container.NewBorder(titleLbl, nil, nil, nil, content), open: false}
}

func (d *Drawer) Open()  { d.open = true }
func (d *Drawer) Close() { d.open = false }
func (d *Drawer) Toggle() { d.open = !d.open }

// Popover is a floating content box.
type Popover struct {
	fyne.CanvasObject
	open bool
}

func NewPopover(content fyne.CanvasObject) *Popover {
	bg := canvas.NewRectangle(color.NRGBA{R: 26, G: 26, B: 26, A: 255})
	bg.CornerRadius = 8
	bg.StrokeColor = color.NRGBA{R: 42, G: 42, B: 42, A: 255}
	bg.StrokeWidth = 1
	return &Popover{CanvasObject: container.NewStack(bg, container.NewPadded(content)), open: false}
}

func (p *Popover) Show()  { p.open = true }
func (p *Popover) Hide()  { p.open = false }
func (p *Popover) Toggle() { p.open = !p.open }
