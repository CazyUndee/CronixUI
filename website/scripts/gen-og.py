"""Generate CronixUI social share (OG) image with PIL.

Produces website/public/og.png (1200x630) matching the brand:
dark bg #0a0a0a, surface panels, crimson accent #6b2323, text #f0ede8.
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 10, 10)
SURFACE = (26, 26, 26)
SURFACE2 = (34, 34, 34)
BORDER = (60, 60, 60)
ACCENT = (150, 45, 45)
ACCENT_TEXT = (201, 122, 122)
TEXT = (240, 237, 232)
MUTED = (150, 148, 144)


def font(size, bold=False):
    candidates = []
    if os.name == "nt":
        base = "C:/Windows/Fonts"
        candidates = [
            (base + "/segoeuib.ttf", base + "/segoeui.ttf"),
            (base + "/arialbd.ttf", base + "/arial.ttf"),
        ]
    else:
        candidates = [
            ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
             "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
        ]
    for bold_p, reg_p in candidates:
        p = bold_p if bold else reg_p
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Subtle vertical accent bar on the left
    d.rectangle([0, 0, 12, H], fill=ACCENT)

    # Title
    title = font(86, bold=True)
    sub = font(40)
    meta = font(32)
    small = font(26)

    d.text((64, 70), "CronixUI", font=title, fill=TEXT)
    d.text((64, 180), "One design system. Twelve native stacks.", font=sub, fill=MUTED)

    # Component chips row
    chips = ["React", "Vue", "Svelte", "Solid", "TypeScript", "Python",
             "Go", "Rust", "Flutter", "WinUI", "Java", "Web"]
    x = 64
    y = 300
    pad_x, pad_y = 20, 12
    for c in chips:
        tw = d.textlength(c, font=meta)
        w = tw + pad_x * 2
        h = meta.size + pad_y * 2
        d.rounded_rectangle([x, y, x + w, y + h], radius=h // 2, fill=SURFACE,
                            outline=BORDER, width=2)
        d.text((x + pad_x, y + pad_y), c, font=meta, fill=TEXT)
        x += w + 14

    # Footer
    d.text((64, 470), "52 components  ·  500+ native implementations  ·  1 consistent API",
           font=small, fill=MUTED)
    d.text((64, 520), "npm  ·  PyPI  ·  crates.io  ·  pub.dev  ·  NuGet  ·  Maven  ·  Go",
           font=small, fill=ACCENT_TEXT)

    # Outfit-accent word mark bottom-right
    d.text((64, 566), "canyoudescy · GitHub", font=font(24), fill=(90, 90, 90))

    os.makedirs(os.path.join(os.path.dirname(__file__), "..", "public"), exist_ok=True)
    out = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "public", "og.png"))
    img.save(out, "PNG")
    print("wrote", out)


if __name__ == "__main__":
    main()