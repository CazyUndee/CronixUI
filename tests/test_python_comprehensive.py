"""
Comprehensive tests for CronixUI Python package.
Tests all components including AI, layout, form, and utility modules.
"""
import pytest
from unittest.mock import MagicMock, patch


# === TOKENS ===
class TestTokens:
    def test_colors_exists(self):
        from cronixui.tokens import BG, SURFACE, TEXT, ACCENT
        assert BG is not None
        assert SURFACE is not None
        assert TEXT is not None
        assert ACCENT is not None

    def test_color_class(self):
        from cronixui.tokens import Color
        c = Color("#FF0000", (255, 0, 0))
        assert c.hex == "#FF0000"
        assert c.rgb == (255, 0, 0)

    def test_typography_defaults(self):
        from cronixui.tokens import Typography
        t = Typography()
        assert 'Outfit' in t.font_family
        assert t.md == 14

    def test_spacing_defaults(self):
        from cronixui.tokens import Spacing
        s = Spacing()
        assert s.space_4 == 16


# === LAYOUT ===
class TestLayout:
    def test_divider_html(self):
        from cronixui.layout import Divider
        d = Divider()
        html = d.render_html()
        assert "cn-divider" in html

    def test_container_sizes(self):
        from cronixui.layout import Container
        for size in ["sm", "md", "lg", "xl", "fluid"]:
            c = Container(size=size)
            html = c.render_html()
            assert "cn-container" in html

    def test_container_invalid_size(self):
        from cronixui.layout import Container
        with pytest.raises(ValueError):
            Container(size="xxl")

    def test_section_render(self):
        from cronixui.layout import Section
        s = Section(size="lg", inner_html="<p>Test</p>")
        html = s.render_html()
        assert "<section" in html
        assert "cn-section-lg" in html

    def test_header_brand(self):
        from cronixui.layout import Header
        h = Header(brand="MyApp")
        html = h.render_html()
        assert "MyApp" in html
        assert "cn-header" in html

    def test_sidebar_items(self):
        from cronixui.layout import Sidebar, NavItem
        items = [NavItem(text="Home", active=True), NavItem(text="Settings")]
        s = Sidebar(items=items)
        html = s.render_html()
        assert "Home" in html
        assert "cn-sidebar" in html

    def test_footer_links(self):
        from cronixui.layout import Footer
        f = Footer(
            copyright="2026 Test",
            links=[("Privacy", "/privacy")]
        )
        html = f.render_html()
        assert "2026 Test" in html
        assert "Privacy" in html


# === LOADING ===
class TestLoading:
    def test_spinner(self):
        from cronixui.loading import Spinner
        for size in ["sm", "md", "lg"]:
            s = Spinner(size=size)
            html = s.render_html()
            assert "cn-spinner" in html

    def test_skeleton(self):
        from cronixui.loading import Skeleton
        for variant in ["text", "title", "avatar"]:
            s = Skeleton(variant=variant)
            html = s.render_html()
            assert "cn-skeleton" in html

    def test_skeleton_width(self):
        from cronixui.loading import Skeleton
        s = Skeleton(variant="text", width="200px")
        html = s.render_html()
        assert "200px" in html


# === FORM ===
class TestForm:
    def test_checkbox_import(self):
        from cronixui.form import Checkbox
        assert Checkbox is not None

    def test_radio_import(self):
        from cronixui.form import Radio
        assert Radio is not None

    def test_select_import(self):
        from cronixui.form import Select
        assert Select is not None

    def test_slider_import(self):
        from cronixui.form import Slider
        assert Slider is not None

    def test_textarea_import(self):
        from cronixui.form import Textarea
        assert Textarea is not None

    def test_form_group_import(self):
        from cronixui.form import FormGroup
        assert FormGroup is not None

    def test_file_input_import(self):
        from cronixui.form import FileInput
        assert FileInput is not None


# === CORE ===
class TestCore:
    def test_theme_exists(self):
        from cronixui.core import Theme
        assert Theme is not None

    def test_hex_to_rgb(self):
        from cronixui.core import hex_to_rgb
        r, g, b = hex_to_rgb("#FF0000")
        assert r == 255
        assert g == 0
        assert b == 0

    def test_rgb_to_hex(self):
        from cronixui.core import rgb_to_hex
        hex_val = rgb_to_hex(255, 0, 0)
        assert hex_val == "#ff0000"

    def test_blend_colors(self):
        from cronixui.core import blend_colors
        result = blend_colors("#000000", "#ffffff", 0.5)
        assert result is not None


# === AI COMPONENTS ===
class TestAIComponents:
    def test_chat_interface_import(self):
        from cronixui.ai import CnChatInterface
        assert CnChatInterface is not None

    def test_token_counter_import(self):
        from cronixui.ai import CnTokenCounter
        assert CnTokenCounter is not None

    def test_code_block_import(self):
        from cronixui.ai import CnCodeBlock
        assert CnCodeBlock is not None

    def test_model_selector_import(self):
        from cronixui.ai import CnModelSelector
        assert CnModelSelector is not None

    def test_ai_status_import(self):
        from cronixui.ai import CnAIStatus
        assert CnAIStatus is not None

    def test_chat_message_dataclass(self):
        from cronixui.ai import ChatMessage, MessageRole
        msg = ChatMessage(
            id="1",
            role=MessageRole.USER,
            content="Hello"
        )
        assert msg.content == "Hello"
        assert msg.role == MessageRole.USER

    def test_ai_model_dataclass(self):
        from cronixui.ai import AIModel
        model = AIModel(
            id="gpt-4",
            name="GPT-4",
            provider="openai",
            max_tokens=4096
        )
        assert model.name == "GPT-4"


# === MAIN __INIT__ IMPORTS ===
class TestInitImports:
    def test_core_imports(self):
        from cronixui import (
            Button, Card, Modal, Toggle, Rating,
            Input, Textarea, Checkbox, Radio, Select, Slider
        )
        assert Button is not None
        assert Card is not None

    def test_layout_imports(self):
        from cronixui import Header, Sidebar, Footer, Container, Divider
        assert Header is not None
        assert Sidebar is not None

    def test_ai_imports(self):
        from cronixui import (
            CnChatInterface, CnTokenCounter, CnCodeBlock,
            CnModelSelector, CnAIStatus
        )
        assert CnChatInterface is not None

    def test_token_imports(self):
        from cronixui import BG, SURFACE, TEXT, ACCENT
        assert BG is not None

    def test_version_exists(self):
        import cronixui
        assert hasattr(cronixui, '__version__')
        assert cronixui.__version__ is not None
