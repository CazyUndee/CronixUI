package cronixui

import (
	"image/color"
	"testing"

	"fyne.io/fyne/v2/theme"
)

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

	// Test boundary: can't go after last page
	p.GoTo(999)
	if p.Current() != 10 {
		t.Errorf("GoTo(999) should not go above total pages, got %v", p.Current())
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
