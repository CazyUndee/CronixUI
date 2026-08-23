package cronixui

import (
	"fmt"
	"image/color"
	"os"
	"testing"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

func TestMain(m *testing.M) {
	// Start a headless Fyne app so widget constructors work in tests
	_ = app.NewWithID("cronixui.test")
	os.Exit(m.Run())
}

// =============================================================================
// DESIGN TOKENS TESTS
// =============================================================================

func TestDefaultColors(t *testing.T) {
	c := DefaultColors()

	bg, ok := c.BG.(color.RGBA)
	if !ok {
		t.Fatal("BG should be color.RGBA")
	}
	if bg.R != 10 || bg.G != 10 || bg.B != 10 {
		t.Errorf("BG = %v, want {10,10,10}", bg)
	}

	accent, ok := c.Accent.(color.RGBA)
	if !ok {
		t.Fatal("Accent should be color.RGBA")
	}
	if accent.R != 107 || accent.G != 35 || accent.B != 35 {
		t.Errorf("Accent = %v, want {107,35,35}", accent)
	}

	text, ok := c.Text.(color.RGBA)
	if !ok {
		t.Fatal("Text should be color.RGBA")
	}
	if text.R != 240 || text.G != 237 || text.B != 232 {
		t.Errorf("Text = %v, want {240,237,232}", text)
	}
}

func TestDefaultColorsSuccess(t *testing.T) {
	c := DefaultColors()
	s, ok := c.Success.(color.RGBA)
	if !ok {
		t.Fatal("Success should be color.RGBA")
	}
	if s.R != 30 || s.G != 80 || s.B != 40 {
		t.Errorf("Success = %v, want {30,80,40}", s)
	}
}

func TestDefaultColorsWarning(t *testing.T) {
	c := DefaultColors()
	w, ok := c.Warning.(color.RGBA)
	if !ok {
		t.Fatal("Warning should be color.RGBA")
	}
	if w.R != 80 || w.G != 60 || w.B != 20 {
		t.Errorf("Warning = %v, want {80,60,20}", w)
	}
}

func TestDefaultColorsError(t *testing.T) {
	c := DefaultColors()
	e, ok := c.Error.(color.RGBA)
	if !ok {
		t.Fatal("Error should be color.RGBA")
	}
	if e.R != 80 || e.G != 20 || e.B != 20 {
		t.Errorf("Error = %v, want {80,20,20}", e)
	}
}

func TestDefaultColorsInfo(t *testing.T) {
	c := DefaultColors()
	i, ok := c.Info.(color.RGBA)
	if !ok {
		t.Fatal("Info should be color.RGBA")
	}
	if i.R != 20 || i.G != 53 || i.B != 80 {
		t.Errorf("Info = %v, want {20,53,80}", i)
	}
}

func TestDefaultColorsSurface(t *testing.T) {
	c := DefaultColors()
	s, ok := c.Surface.(color.RGBA)
	if !ok {
		t.Fatal("Surface should be color.RGBA")
	}
	if s.R != 17 || s.G != 17 || s.B != 17 {
		t.Errorf("Surface = %v, want {17,17,17}", s)
	}

	s2, ok := c.Surface2.(color.RGBA)
	if !ok {
		t.Fatal("Surface2 should be color.RGBA")
	}
	if s2.R != 26 || s2.G != 26 || s2.B != 26 {
		t.Errorf("Surface2 = %v, want {26,26,26}", s2)
	}
}

func TestDefaultColorsBorder(t *testing.T) {
	c := DefaultColors()
	b, ok := c.Border.(color.RGBA)
	if !ok {
		t.Fatal("Border should be color.RGBA")
	}
	if b.A != 20 {
		t.Errorf("Border.A = %v, want 20", b.A)
	}
}

func TestDefaultTypography(t *testing.T) {
	ty := DefaultTypography()

	if ty.FontFamily == "" {
		t.Error("FontFamily should not be empty")
	}
	if ty.FontMono == "" {
		t.Error("FontMono should not be empty")
	}
	if ty.FontSizeXS == 0 {
		t.Error("FontSizeXS should not be zero")
	}
	if ty.FontSizeLG == 0 {
		t.Error("FontSizeLG should not be zero")
	}
	if ty.FontSizeXS >= ty.FontSizeBase {
		t.Errorf("FontSizeXS (%v) should be < FontSizeBase (%v)", ty.FontSizeXS, ty.FontSizeBase)
	}
	if ty.FontSizeBase >= ty.FontSizeLG {
		t.Errorf("FontSizeBase (%v) should be < FontSizeLG (%v)", ty.FontSizeBase, ty.FontSizeLG)
	}
}

func TestDefaultSpacing(t *testing.T) {
	sp := DefaultSpacing()

	if sp.Space1 == 0 {
		t.Error("Space1 should not be zero")
	}
	if sp.Space4 == 0 {
		t.Error("Space4 should not be zero")
	}
	if sp.Space12 == 0 {
		t.Error("Space12 should not be zero")
	}
	if sp.Space1 >= sp.Space4 {
		t.Errorf("Space1 (%v) should be < Space4 (%v)", sp.Space1, sp.Space4)
	}
	if sp.Space4 >= sp.Space12 {
		t.Errorf("Space4 (%v) should be < Space12 (%v)", sp.Space4, sp.Space12)
	}
}

func TestDefaultRadiusTokens(t *testing.T) {
	rt := DefaultRadiusTokens()

	if rt.SM == 0 {
		t.Error("SM should not be zero")
	}
	if rt.LG == 0 {
		t.Error("LG should not be zero")
	}
	if rt.SM >= rt.LG {
		t.Errorf("SM (%v) should be < LG (%v)", rt.SM, rt.LG)
	}
}

func TestDefaultShadow(t *testing.T) {
	sh := DefaultShadow()

	if sh.SM == "" {
		t.Error("SM should not be empty")
	}
	if sh.Default == "" {
		t.Error("Default should not be empty")
	}
	if sh.LG == "" {
		t.Error("LG should not be empty")
	}
	if sh.Glow == "" {
		t.Error("Glow should not be empty")
	}
}

func TestDefaultTransition(t *testing.T) {
	tr := DefaultTransition()

	if tr.Fast == "" {
		t.Error("Fast should not be empty")
	}
	if tr.Default == "" {
		t.Error("Default should not be empty")
	}
	if tr.Slow == "" {
		t.Error("Slow should not be empty")
	}
}

func TestDefaultZIndexTokens(t *testing.T) {
	zi := DefaultZIndexTokens()

	if zi.Dropdown == 0 {
		t.Error("Dropdown should not be zero")
	}
	if zi.Toast <= zi.Tooltip {
		t.Errorf("Toast (%v) should be > Tooltip (%v)", zi.Toast, zi.Tooltip)
	}
	if zi.Tooltip <= zi.Popover {
		t.Errorf("Tooltip (%v) should be > Popover (%v)", zi.Tooltip, zi.Popover)
	}
	if zi.Modal <= zi.Fixed {
		t.Errorf("Modal (%v) should be > Fixed (%v)", zi.Modal, zi.Fixed)
	}
}

func TestDefaultLayoutTokens(t *testing.T) {
	lt := DefaultLayoutTokens()

	if lt.ContainerMax == 0 {
		t.Error("ContainerMax should not be zero")
	}
	if lt.SidebarWidth == 0 {
		t.Error("SidebarWidth should not be zero")
	}
	if lt.HeaderHeight == 0 {
		t.Error("HeaderHeight should not be zero")
	}
}

// =============================================================================
// THEME TESTS (non-GUI)
// =============================================================================

func TestThemeColorMapping(t *testing.T) {
	th := NewTheme()
	if th == nil {
		t.Fatal("NewTheme() returned nil")
	}

	// Test Color method returns non-nil
	bg := th.Color(theme.ColorNameBackground, theme.VariantDark)
	if bg == nil {
		t.Error("Color should not return nil for background")
	}

	primary := th.Color(theme.ColorNamePrimary, theme.VariantDark)
	if primary == nil {
		t.Error("Color should not return nil for primary")
	}

	foreground := th.Color(theme.ColorNameForeground, theme.VariantDark)
	if foreground == nil {
		t.Error("Color should not return nil for foreground")
	}

	// Test that Background maps to BG color
	bgRgba, ok := bg.(color.RGBA)
	if !ok {
		t.Fatal("Background should be color.RGBA")
	}
	if bgRgba.R != 10 || bgRgba.G != 10 || bgRgba.B != 10 {
		t.Errorf("Background color = %v, want {10,10,10}", bgRgba)
	}
}

func TestThemeSizeMapping(t *testing.T) {
	th := NewTheme()

	// Test Text size
	sizeText := th.Size(theme.SizeNameText)
	if sizeText <= 0 {
		t.Errorf("Size(SizeNameText) = %v, want > 0", sizeText)
	}

	// Test Padding size
	sizePadding := th.Size(theme.SizeNamePadding)
	if sizePadding <= 0 {
		t.Errorf("Size(SizeNamePadding) = %v, want > 0", sizePadding)
	}
}

// =============================================================================
// PAGINATION TESTS (non-GUI)
// =============================================================================

func TestNewPagination(t *testing.T) {
	p := NewPagination(10, 1, nil)
	if p == nil {
		t.Fatal("NewPagination returned nil")
	}
	if p.Current() != 1 {
		t.Errorf("Current() = %v, want 1", p.Current())
	}
	if p.Total() != 10 {
		t.Errorf("Total() = %v, want 10", p.Total())
	}
}

func TestPaginationNavigation(t *testing.T) {
	p := NewPagination(10, 5, nil)

	p.Next()
	if p.Current() != 6 {
		t.Errorf("After Next(), Current() = %v, want 6", p.Current())
	}

	p.Prev()
	if p.Current() != 5 {
		t.Errorf("After Prev(), Current() = %v, want 5", p.Current())
	}

	p.GoTo(1)
	if p.Current() != 1 {
		t.Errorf("After GoTo(1), Current() = %v, want 1", p.Current())
	}

	// Test boundary: can't go before page 1
	p.GoTo(0)
	if p.Current() != 1 {
		t.Errorf("GoTo(0) should not go below page 1, got %v", p.Current())
	}

	// Test boundary: can't go after last page (GoTo ignores out-of-range)
	p.GoTo(999)
	if p.Current() != 1 {
		t.Errorf("GoTo(999) should stay at current page, got %v", p.Current())
	}
}

func TestPaginationEdgeCases(t *testing.T) {
	// Single page
	p := NewPagination(1, 1, nil)
	p.Next()
	if p.Current() != 1 {
		t.Errorf("Single page: Next() should stay at 1, got %v", p.Current())
	}
	p.Prev()
	if p.Current() != 1 {
		t.Errorf("Single page: Prev() should stay at 1, got %v", p.Current())
	}
}

// =============================================================================
// ACCORDION TESTS (non-GUI)
// =============================================================================

func TestNewAccordion(t *testing.T) {
	acc := NewAccordion(
		AccordionItem{Title: "Section 1"},
		AccordionItem{Title: "Section 2"},
	)
	if acc == nil {
		t.Fatal("NewAccordion returned nil")
	}
}

func TestAccordionToggle(t *testing.T) {
	acc := NewAccordion(
		AccordionItem{Title: "Section 1"},
		AccordionItem{Title: "Section 2"},
	)
	if acc == nil {
		t.Fatal("NewAccordion returned nil")
	}

	acc.Open(0)
	if !acc.IsOpen(0) {
		t.Error("Accordion should be open after Open(0)")
	}

	acc.Close(0)
	if acc.IsOpen(0) {
		t.Error("Accordion should be closed after Close(0)")
	}

	acc.Toggle(1)
	if !acc.IsOpen(1) {
		t.Error("Accordion should be open after Toggle(1)")
	}

	acc.Toggle(1)
	if acc.IsOpen(1) {
		t.Error("Accordion should be closed after second Toggle(1)")
	}
}

func TestAccordionOpenAll(t *testing.T) {
	acc := NewAccordion(
		AccordionItem{Title: "A"},
		AccordionItem{Title: "B"},
		AccordionItem{Title: "C"},
	)
	acc.OpenAll()

	for i := 0; i < 3; i++ {
		if !acc.IsOpen(i) {
			t.Errorf("Item %d should be open after OpenAll()", i)
		}
	}
}

func TestAccordionCloseAll(t *testing.T) {
	acc := NewAccordion(
		AccordionItem{Title: "A"},
		AccordionItem{Title: "B"},
		AccordionItem{Title: "C"},
	)
	acc.OpenAll()
	acc.CloseAll()

	for i := 0; i < 3; i++ {
		if acc.IsOpen(i) {
			t.Errorf("Item %d should be closed after CloseAll()", i)
		}
	}
}

// =============================================================================
// RATING TESTS (non-GUI)
// =============================================================================

func TestNewRating(t *testing.T) {
	r := NewRating(3, 5, nil)
	if r == nil {
		t.Fatal("NewRating returned nil")
	}
	if r.Value() != 3 {
		t.Errorf("Value() = %v, want 3", r.Value())
	}
}

func TestRatingSetValue(t *testing.T) {
	r := NewRating(0, 5, nil)
	r.SetValue(4)
	if r.Value() != 4 {
		t.Errorf("After SetValue(4), Value() = %v, want 4", r.Value())
	}
}

func TestRatingBoundaryValues(t *testing.T) {
	r := NewRating(0, 5, nil)

	// Can't go below 0
	r.SetValue(-1)
	if r.Value() != 0 {
		t.Errorf("SetValue(-1) should clamp to 0, got %v", r.Value())
	}

	// Can't go above max
	r.SetValue(10)
	if r.Value() != 5 {
		t.Errorf("SetValue(10) should clamp to 5, got %v", r.Value())
	}
}

func TestRatingZeroMax(t *testing.T) {
	r := NewRating(0, 0, nil)
	if r.Value() != 0 {
		t.Errorf("Rating with max 0 should have value 0, got %v", r.Value())
	}
}

// =============================================================================
// VERSION TEST
// =============================================================================

func TestVersion(t *testing.T) {
	if Version == "" {
		t.Error("Version should not be empty")
	}
}

// =============================================================================
// TOAST TYPES TEST
// =============================================================================

func TestToastTypes(t *testing.T) {
	types := []ToastType{
		ToastSuccess,
		ToastError,
		ToastWarning,
		ToastInfo,
	}

	for _, toastType := range types {
		if toastType < 0 {
			t.Error("ToastType should be non-negative")
		}
	}
}

// =============================================================================
// COMPONENT CONSTRUCTOR TESTS (non-GUI)
// =============================================================================

func TestButtonVariants(t *testing.T) {
	variants := []ButtonVariant{
		ButtonDefault, ButtonPrimary, ButtonGhost,
		ButtonOutline, ButtonDanger, ButtonSuccess,
	}
	for _, v := range variants {
		btn := NewButton("test", v, nil)
		if btn == nil {
			t.Errorf("NewButton with variant %d returned nil", v)
		}
		if btn.Text != "test" {
			t.Errorf("Button text = %q, want %q", btn.Text, "test")
		}
	}
}

func TestButtonGroup(t *testing.T) {
	b1 := NewButton("A", ButtonDefault, nil)
	b2 := NewButton("B", ButtonPrimary, nil)
	group := NewButtonGroup(b1, b2)
	if group == nil {
		t.Fatal("NewButtonGroup returned nil")
	}
	if len(group.Objects) != 2 {
		t.Errorf("ButtonGroup has %d objects, want 2", len(group.Objects))
	}
}

func TestCardOptions(t *testing.T) {
	card := NewCard(nil)
	if card == nil {
		t.Fatal("NewCard returned nil")
	}
}

func TestNewInput(t *testing.T) {
	e := NewInput("placeholder")
	if e == nil {
		t.Fatal("NewInput returned nil")
	}
}

func TestNewTextarea(t *testing.T) {
	e := NewTextarea("placeholder")
	if e == nil {
		t.Fatal("NewTextarea returned nil")
	}
}

func TestNewPassword(t *testing.T) {
	e := NewPassword("placeholder")
	if e == nil {
		t.Fatal("NewPassword returned nil")
	}
}

func TestNewCheckbox(t *testing.T) {
	ch := NewCheckbox("check me", nil)
	if ch == nil {
		t.Fatal("NewCheckbox returned nil")
	}
}

func TestNewRadio(t *testing.T) {
	r := NewRadio([]string{"a", "b", "c"}, nil)
	if r == nil {
		t.Fatal("NewRadio returned nil")
	}
}

func TestNewSelect(t *testing.T) {
	s := NewSelect([]string{"x", "y", "z"}, nil)
	if s == nil {
		t.Fatal("NewSelect returned nil")
	}
}

func TestNewSlider(t *testing.T) {
	s := NewSlider(0, 100)
	if s == nil {
		t.Fatal("NewSlider returned nil")
	}
}

func TestNewProgress(t *testing.T) {
	p := NewProgress()
	if p == nil {
		t.Fatal("NewProgress returned nil")
	}
}

func TestNewProgressInfinite(t *testing.T) {
	p := NewProgressInfinite()
	if p == nil {
		t.Fatal("NewProgressInfinite returned nil")
	}
}

func TestNewToggle(t *testing.T) {
	tog := NewToggle(nil)
	if tog == nil {
		t.Fatal("NewToggle returned nil")
	}
	if tog.IsOn() {
		t.Error("New toggle should be off")
	}
	tog.Toggle()
	if !tog.IsOn() {
		t.Error("Toggle should be on after Toggle()")
	}
	tog.Toggle()
	if tog.IsOn() {
		t.Error("Toggle should be off after second Toggle()")
	}
}

func TestToggleSetOn(t *testing.T) {
	tog := NewToggle(nil)
	tog.SetOn(true)
	if !tog.IsOn() {
		t.Error("SetOn(true) should make toggle on")
	}
	tog.SetOn(false)
	if tog.IsOn() {
		t.Error("SetOn(false) should make toggle off")
	}
}

func TestNewModal(t *testing.T) {
	m := NewModal(nil)
	if m == nil {
		t.Fatal("NewModal returned nil")
	}
	if m.IsOpen() {
		t.Error("New modal should not be open")
	}
	m.Close()
	if m.IsOpen() {
		t.Error("Closed modal should not be open")
	}
}

func TestNewDropdown(t *testing.T) {
	d := NewDropdown([]string{"a", "b"}, nil)
	if d == nil {
		t.Fatal("NewDropdown returned nil")
	}
}

func TestNewTabs(t *testing.T) {
	t1 := container.NewTabItem("Tab 1", nil)
	t2 := container.NewTabItem("Tab 2", nil)
	tabs := NewTabs(t1, t2)
	if tabs == nil {
		t.Fatal("NewTabs returned nil")
	}
}

func TestNewTable(t *testing.T) {
	table := NewTable(5, 3, func(row, col int) fyne.CanvasObject {
		return widget.NewLabel(fmt.Sprintf("%d-%d", row, col))
	})
	if table == nil {
		t.Fatal("NewTable returned nil")
	}
}

func TestNewList(t *testing.T) {
	items := []ListItem{{Title: "A"}, {Title: "B"}}
	l := NewList(items)
	if l == nil {
		t.Fatal("NewList returned nil")
	}
}

func TestLayoutHelpers(t *testing.T) {
	c1 := NewContainer(nil)
	if c1 == nil {
		t.Fatal("NewContainer returned nil")
	}

	flex := NewFlex()
	if flex == nil {
		t.Fatal("NewFlex returned nil")
	}

	stack := NewStack()
	if stack == nil {
		t.Fatal("NewStack returned nil")
	}

	grid := NewGrid(3)
	if grid == nil {
		t.Fatal("NewGrid returned nil")
	}
}

func TestNewForm(t *testing.T) {
	f := NewForm(widget.NewFormItem("Name", widget.NewEntry()))
	if f == nil {
		t.Fatal("NewForm returned nil")
	}
}

// =============================================================================
// CONTAINER COMPONENT TESTS (non-GUI)
// =============================================================================

func TestNewAlert(t *testing.T) {
	variants := []AlertVariant{AlertInfo, AlertSuccess, AlertWarning, AlertError}
	for _, v := range variants {
		a := NewAlert("test", v)
		if a == nil {
			t.Errorf("NewAlert with variant %d returned nil", v)
		}
	}
}

func TestNewAvatar(t *testing.T) {
	a := NewAvatar("AB", nil)
	if a == nil {
		t.Fatal("NewAvatar returned nil")
	}
}

func TestNewAvatarGroup(t *testing.T) {
	a1 := NewAvatar("A", nil)
	a2 := NewAvatar("B", nil)
	group := NewAvatarGroup(a1, a2)
	if group == nil {
		t.Fatal("NewAvatarGroup returned nil")
	}
}

func TestNewBadge(t *testing.T) {
	variants := []BadgeVariant{BadgeDefault, BadgePrimary, BadgeSuccess, BadgeWarning, BadgeError, BadgeInfo}
	for _, v := range variants {
		b := NewBadge("badge", v)
		if b == nil {
			t.Errorf("NewBadge with variant %d returned nil", v)
		}
	}
}

func TestNewBreadcrumb(t *testing.T) {
	bc := NewBreadcrumb([]string{"Home", "Products", "Item"}, nil)
	if bc == nil {
		t.Fatal("NewBreadcrumb returned nil")
	}
}

func TestNewChip(t *testing.T) {
	c := NewChip("chip", ChipDefault, nil)
	if c == nil {
		t.Fatal("NewChip returned nil")
	}
}

func TestNewEmptyState(t *testing.T) {
	e := NewEmptyState("Title", "Description")
	if e == nil {
		t.Fatal("NewEmptyState returned nil")
	}
}

func TestNewSkeleton(t *testing.T) {
	s := NewSkeleton(200, 50)
	if s == nil {
		t.Fatal("NewSkeleton returned nil")
	}
}

func TestNewSkeletonText(t *testing.T) {
	s := NewSkeletonText()
	if s == nil {
		t.Fatal("NewSkeletonText returned nil")
	}
}

func TestNewSkeletonCircle(t *testing.T) {
	s := NewSkeletonCircle(40)
	if s == nil {
		t.Fatal("NewSkeletonCircle returned nil")
	}
}

func TestNewSpinner(t *testing.T) {
	s := NewSpinner()
	if s == nil {
		t.Fatal("NewSpinner returned nil")
	}
}

func TestNewTag(t *testing.T) {
	tag := NewTag("tag", nil)
	if tag == nil {
		t.Fatal("NewTag returned nil")
	}
}

func TestNewDivider(t *testing.T) {
	d := NewDivider()
	if d == nil {
		t.Fatal("NewDivider returned nil")
	}
}

func TestNewVerticalDivider(t *testing.T) {
	d := NewVerticalDivider()
	if d == nil {
		t.Fatal("NewVerticalDivider returned nil")
	}
}

func TestNewHStack(t *testing.T) {
	h := NewHStack()
	if h == nil {
		t.Fatal("NewHStack returned nil")
	}
}

func TestNewHeader(t *testing.T) {
	h := NewHeader("Title")
	if h == nil {
		t.Fatal("NewHeader returned nil")
	}
}

func TestNewFooter(t *testing.T) {
	f := NewFooter("Footer text")
	if f == nil {
		t.Fatal("NewFooter returned nil")
	}
}

func TestNewFormGroup(t *testing.T) {
	fg := NewFormGroup("Label", widget.NewEntry())
	if fg == nil {
		t.Fatal("NewFormGroup returned nil")
	}
}

func TestNewNotification(t *testing.T) {
	n := NewNotification("Title", "Desc", nil)
	if n == nil {
		t.Fatal("NewNotification returned nil")
	}
}

func TestNewDatePicker(t *testing.T) {
	dp := NewDatePicker("", nil)
	if dp == nil {
		t.Fatal("NewDatePicker returned nil")
	}
}

func TestNewPopover(t *testing.T) {
	p := NewPopover(nil)
	if p == nil {
		t.Fatal("NewPopover returned nil")
	}
}

func TestNewStepper(t *testing.T) {
	s := NewStepper(2, 5)
	if s == nil {
		t.Fatal("NewStepper returned nil")
	}
}

func TestNewTimeline(t *testing.T) {
	items := []TimelineItem{{Title: "A", Description: "B", Time: "10:00"}}
	tl := NewTimeline(items)
	if tl == nil {
		t.Fatal("NewTimeline returned nil")
	}
}

func TestNewTreeView(t *testing.T) {
	nodes := []*TreeNode{{Title: "Root", Children: []*TreeNode{{Title: "Child"}}}}
	tv := NewTreeView(nodes, nil)
	if tv == nil {
		t.Fatal("NewTreeView returned nil")
	}
}

func TestNewTreeViewEmpty(t *testing.T) {
	tv := NewTreeView(nil, nil)
	if tv == nil {
		t.Fatal("NewTreeView(nil) returned nil")
	}
}

func TestTypography(t *testing.T) {
	// Test all heading levels
	h1 := NewH1("H1")
	if h1 == nil || h1.Text != "H1" {
		t.Error("NewH1 failed")
	}
	h2 := NewH2("H2")
	if h2 == nil || h2.Text != "H2" {
		t.Error("NewH2 failed")
	}
	h3 := NewH3("H3")
	if h3 == nil || h3.Text != "H3" {
		t.Error("NewH3 failed")
	}
	h4 := NewH4("H4")
	if h4 == nil || h4.Text != "H4" {
		t.Error("NewH4 failed")
	}
	h5 := NewH5("H5")
	if h5 == nil || h5.Text != "H5" {
		t.Error("NewH5 failed")
	}
	h6 := NewH6("H6")
	if h6 == nil || h6.Text != "H6" {
		t.Error("NewH6 failed")
	}

	body := NewText("body")
	if body == nil || body.Text != "body" {
		t.Error("NewText failed")
	}

	label := NewLabel("label")
	if label == nil || label.Text != "label" {
		t.Error("NewLabel failed")
	}
}

func TestNewNav(t *testing.T) {
	nav := NewNav([]string{"A", "B", "C"}, 0, nil)
	if nav == nil {
		t.Fatal("NewNav returned nil")
	}
}

func TestNewSidebar(t *testing.T) {
	sb := NewSidebar([]string{"A", "B"}, 0, nil)
	if sb == nil {
		t.Fatal("NewSidebar returned nil")
	}
}

func TestToastComponent(t *testing.T) {
	toast := NewToastComponent("Hello", ToastSuccess)
	if toast == nil {
		t.Fatal("NewToastComponent returned nil")
	}
}

func TestSearch(t *testing.T) {
	s := NewSearch(nil, nil)
	if s == nil {
		t.Fatal("NewSearch returned nil")
	}
}

func TestContainsIgnoreCase(t *testing.T) {
	if !containsIgnoreCase("Hello World", "hello") {
		t.Error("containsIgnoreCase should match")
	}
	if containsIgnoreCase("Hello", "xyz") {
		t.Error("containsIgnoreCase should not match")
	}
	if !containsIgnoreCase("FOO", "foo") {
		t.Error("containsIgnoreCase should be case insensitive")
	}
}

func TestStatDeltaTypes(t *testing.T) {
	if StatDeltaUp >= StatDeltaDown {
		t.Error("StatDeltaUp should be less than StatDeltaDown")
	}
}

func TestBreadcrumbNavigation(t *testing.T) {
	navigated := -1
	bc := NewBreadcrumb([]string{"Home", "Products"}, func(i int) {
		navigated = i
	})
	if bc == nil {
		t.Fatal("NewBreadcrumb returned nil")
	}
	// Navigation callback should be set
	if navigated != -1 {
		t.Error("Navigation should not have fired yet")
	}
}

func TestColorPickerPresets(t *testing.T) {
	presets := []ColorPickerPreset{
		{Name: "Red", Color: color.RGBA{R: 255, G: 0, B: 0, A: 255}},
		{Name: "Blue", Color: color.RGBA{R: 0, G: 0, B: 255, A: 255}},
	}
	cp := NewColorPicker(presets, nil)
	if cp == nil {
		t.Fatal("NewColorPicker returned nil")
	}
}
