#!/usr/bin/env python3
"""
CronixUI Python Package - Complete Example

This script demonstrates how to use all CronixUI components to generate
a complete HTML page programmatically.
"""

from cronixui import (
    Button,
    ButtonGroup,
    Card,
    Badge,
    Tag,
    Avatar,
    Alert,
    Progress,
    Stat,
    Input,
    FormField,
    Spinner,
    Skeleton,
)
from cronixui.tokens import BG, SURFACE, ACCENT, TEXT, typography, spacing, radius


def generate_demo_page() -> str:
    """Generate a complete HTML demo page using CronixUI components."""

    # Header section
    header = f"""
    <header style="background: {SURFACE.hex}; padding: {spacing.space_6}px;">
        <h1 style="color: {TEXT.hex}; font-family: {typography.font_family};">
            CronixUI Demo
        </h1>
        <p style="color: {TEXT.hex}; opacity: 0.7;">
            A dark-themed UI toolkit with crimson accents
        </p>
    </header>
    """

    # Buttons section
    buttons_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Buttons</h2>
        <div style="display: flex; gap: {spacing.space_2}px; flex-wrap: wrap;">
            {Button("Primary", variant="primary").render_html()}
            {Button("Default").render_html()}
            {Button("Ghost", variant="ghost").render_html()}
            {Button("Danger", variant="danger").render_html()}
            {Button("Success", variant="success").render_html()}
            {Button("Small", size="sm").render_html()}
            {Button("Large", size="lg").render_html()}
            {Button("Disabled", disabled=True).render_html()}
        </div>
    </section>
    """

    # Button group
    button_group = ButtonGroup(
        Button("Left", variant="primary"),
        Button("Center"),
        Button("Right"),
    )

    # Cards section
    cards_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Cards</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: {spacing.space_4}px;">
            {Card(title="Simple Card", body="This is a basic card with title and body.").render_html()}
            {Card(title="Clickable Card", body="Click me!", clickable=True).render_html()}
            {Card(title="With Subtitle", subtitle="Subtitle", body="Card with subtitle.").render_html()}
        </div>
    </section>
    """

    # Badges section
    badges_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Badges & Tags</h2>
        <div style="display: flex; gap: {spacing.space_2}px; flex-wrap: wrap;">
            {Badge("Default").render_html()}
            {Badge("Success", variant="success").render_html()}
            {Badge("Warning", variant="warning").render_html()}
            {Badge("Error", variant="error").render_html()}
            {Badge("Info", variant="info").render_html()}
            {Tag("Removable Tag", removable=True).render_html()}
        </div>
    </section>
    """

    # Alerts section
    alerts_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Alerts</h2>
        <div style="display: flex; flex-direction: column; gap: {spacing.space_3}px;">
            {Alert(title="Success!", message="Operation completed successfully.", variant="success").render_html()}
            {Alert(title="Warning", message="Please review your input.", variant="warning").render_html()}
            {Alert(title="Error", message="Something went wrong.", variant="error").render_html()}
            {Alert(title="Info", message="Here's some information.", variant="info").render_html()}
        </div>
    </section>
    """

    # Progress section
    progress_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Progress</h2>
        <div style="display: flex; flex-direction: column; gap: {spacing.space_4}px;">
            {Progress(value=68, max=100, variant="primary").render_html()}
            {Progress(value=45, max=100, variant="success").render_html()}
            {Progress(value=90, max=100, variant="warning").render_html()}
        </div>
    </section>
    """

    # Stats section
    stats_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Statistics</h2>
        <div style="display: flex; gap: {spacing.space_4}px; flex-wrap: wrap;">
            {Stat(value="2,847", label="Total runs", delta="+12%").render_html()}
            {Stat(value="1,234", label="Active users").render_html()}
            {Stat(value="98.5%", label="Uptime", delta="+0.5%").render_html()}
        </div>
    </section>
    """

    # Forms section
    forms_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Forms</h2>
        <div style="display: flex; flex-direction: column; gap: {spacing.space_4}px; max-width: 400px;">
            {Input(placeholder="Enter text...").render_html()}
            {FormField(label="Email", input=Input(type="email", placeholder="you@example.com")).render_html()}
            {FormField(
                label="Password",
                input=Input(type="password"),
                error="Password is required"
            ).render_html()}
        </div>
    </section>
    """

    # Loading states
    loading_section = f"""
    <section style="padding: {spacing.space_6}px;">
        <h2>Loading States</h2>
        <div style="display: flex; gap: {spacing.space_4}px; align-items: center;">
            {Spinner(size="md").render_html()}
            {Skeleton(variant="title").render_html()}
            {Skeleton(variant="text").render_html()}
        </div>
    </section>
    """

    # Combine all sections
    page = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CronixUI Demo</title>
    <link rel="stylesheet" href="https://unpkg.com/cronixui@1.1.2/packages/web/dist/cronixui.css">
    <style>
        body {{
            background-color: {BG.hex};
            color: {TEXT.hex};
            font-family: {typography.font_family};
            margin: 0;
            padding: 0;
        }}
        h2 {{
            color: {ACCENT.hex};
            margin-bottom: {spacing.space_4}px;
        }}
    </style>
</head>
<body>
    {header}
    <main>
        {buttons_section}
        <div style="padding: {spacing.space_6}px;">
            {button_group.render_html()}
        </div>
        {cards_section}
        {badges_section}
        {alerts_section}
        {progress_section}
        {stats_section}
        {forms_section}
        {loading_section}
    </main>
</body>
</html>"""

    return page


if __name__ == "__main__":
    html = generate_demo_page()

    # Save to file
    output_file = "demo_output.html"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"✓ Demo page generated: {output_file}")
    print(f"  File size: {len(html):,} bytes")
    print(f"\nOpen {output_file} in a browser to see the demo!")
