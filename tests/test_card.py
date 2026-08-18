"""Tests for CronixUI native tkinter card component."""

import sys
import pytest
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent / 'packages' / 'python'))


class TestCardImport:
    """Test that Card can be imported."""

    def test_import_card(self):
        from cronixui.card import Card
        assert Card is not None

    def test_import_card_icon(self):
        from cronixui.card import CardIcon
        assert CardIcon is not None


class TestCardCreation:
    """Test Card creation (requires display)."""

    def test_card_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.card import Card

        root = tk.Tk()
        root.withdraw()

        card = Card(root, title="My Card", body="Card content")
        assert card is not None
        assert card.title == "My Card"

        root.destroy()

    def test_card_with_subtitle(self, xdisplay):
        import tkinter as tk
        from cronixui.card import Card

        root = tk.Tk()
        root.withdraw()

        card = Card(root, title="Title", subtitle="Subtitle", body="Body")
        assert card.title == "Title"
        assert card.subtitle == "Subtitle"

        root.destroy()

    def test_clickable_card(self, xdisplay):
        import tkinter as tk
        from cronixui.card import Card

        root = tk.Tk()
        root.withdraw()

        card = Card(root, title="Clickable", body="Content", clickable=True)
        assert card.clickable is True

        root.destroy()

    def test_card_without_title(self, xdisplay):
        import tkinter as tk
        from cronixui.card import Card

        root = tk.Tk()
        root.withdraw()

        card = Card(root, body="Just body")
        assert card.title is None

        root.destroy()

    def test_card_click_handler(self, xdisplay):
        import tkinter as tk
        from cronixui.card import Card

        root = tk.Tk()
        root.withdraw()

        clicked = []
        card = Card(root, title="Click Me", clickable=True)
        card.on_click(lambda: clicked.append(True))

        assert len(clicked) == 0

        root.destroy()


class TestCardIcon:
    """Test CardIcon creation."""

    def test_card_icon_creation(self, xdisplay):
        import tkinter as tk
        from cronixui.card import CardIcon

        root = tk.Tk()
        root.withdraw()

        card = CardIcon(root, icon_text="⚙️", title="Settings")
        assert card is not None
        assert card.icon_text == "⚙️"

        root.destroy()

    def test_card_icon_empty_raises(self, xdisplay):
        import tkinter as tk
        from cronixui.card import CardIcon

        root = tk.Tk()
        root.withdraw()

        with pytest.raises(ValueError, match="icon_text cannot be empty"):
            CardIcon(root, icon_text="")

        root.destroy()
