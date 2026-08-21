package cronixui

import (
	"fmt"
	"image/color"
	"time"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

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
	label.Wrapping = fyne.TextTruncate

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
			txt = canvas.NewText(item, c.AccentText)
			txt.OnTapped = func() {
				if onNavigate != nil {
					onNavigate(i)
				}
			}
		}
		txt.TextSize = 13

		objects = append(objects, txt)

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
		dismiss := canvas.NewText(" ×", textColor)
		dismiss.TextSize = 12
		dismiss.OnTapped = onDismiss
		objects = append(objects, dismiss)
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
	descText.Wrapping = fyne.TextWordWrap

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

// NewSpinner creates an activity indicator (spinner) widget.
func NewSpinner() *widget.Activity {
	a := widget.NewActivity()
	a.Start()
	return a
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
	return widget.NewPopUp(
		canvas.NewText(tooltipText, DefaultColors().Text),
		nil,
	)
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
	descText.Wrapping = fyne.TextWordWrap

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
		descText.Wrapping = fyne.TextWordWrap

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
