package cronixui.theme;

import javax.swing.*;
import javax.swing.plaf.*;
import java.awt.*;

/**
 * CronixUI dark theme for Java Swing.
 * Matches the design tokens from the web/React packages.
 */
public final class CronixTheme {

    // ── Colors (matching CSS variables) ──────────────────────────────────────
    public static final Color BG           = new Color(0x0a, 0x0a, 0x0a);
    public static final Color SURFACE      = new Color(0x11, 0x11, 0x11);
    public static final Color SURFACE_2    = new Color(0x1a, 0x1a, 0x1a);
    public static final Color SURFACE_3    = new Color(0x22, 0x22, 0x22);
    public static final Color SURFACE_4    = new Color(0x2a, 0x2a, 0x2a);
    public static final Color BORDER       = new Color(255, 255, 255, 20);
    public static final Color BORDER_HOVER = new Color(255, 255, 255, 38);
    public static final Color BORDER_FOCUS = new Color(255, 255, 255, 64);
    public static final Color TEXT         = new Color(0xf0, 0xed, 0xe8);
    public static final Color TEXT_MUTED   = new Color(240, 237, 232, 128);
    public static final Color TEXT_DIM     = new Color(240, 237, 232, 64);

    public static final Color ACCENT          = new Color(0x6b, 0x23, 0x23);
    public static final Color ACCENT_HOVER    = new Color(0x7d, 0x2a, 0x2a);
    public static final Color ACCENT_LIGHT    = new Color(0x8a, 0x35, 0x35);
    public static final Color ACCENT_TEXT     = new Color(0xc9, 0x7a, 0x7a);

    public static final Color SUCCESS      = new Color(0x1e, 0x50, 0x28);
    public static final Color SUCCESS_TEXT = new Color(0x6b, 0xc4, 0x7a);
    public static final Color WARNING      = new Color(0x50, 0x3c, 0x14);
    public static final Color WARNING_TEXT = new Color(0xc4, 0xa4, 0x3a);
    public static final Color ERROR        = new Color(0x50, 0x14, 0x14);
    public static final Color ERROR_TEXT   = new Color(0xc4, 0x6b, 0x6b);
    public static final Color INFO         = new Color(0x14, 0x35, 0x50);
    public static final Color INFO_TEXT    = new Color(0x6b, 0xa8, 0xc4);

    // ── Typography ───────────────────────────────────────────────────────────
    public static final Font FONT      = new Font("SansSerif", Font.PLAIN, 14);
    public static final Font FONT_BOLD = new Font("SansSerif", Font.BOLD, 14);
    public static final Font FONT_MONO = new Font(Font.MONOSPACED, Font.PLAIN, 13);
    public static final Font FONT_SM   = new Font("SansSerif", Font.PLAIN, 12);
    public static final Font FONT_LG   = new Font("SansSerif", Font.PLAIN, 18);
    public static final Font FONT_XL   = new Font("SansSerif", Font.BOLD, 24);

    // ── Dimensions ───────────────────────────────────────────────────────────
    public static final int RADIUS_SM = 6;
    public static final int RADIUS    = 10;
    public static final int RADIUS_LG = 14;

    public static final Insets PADDING_SM = new Insets(6, 12, 6, 12);
    public static final Insets PADDING    = new Insets(8, 16, 8, 16);
    public static final Insets PADDING_LG = new Insets(12, 24, 12, 24);

    private CronixTheme() {}

    /**
     * Install the CronixUI look-and-feel on the EDT.
     * Call this before creating any Swing frames.
     */
    public static void install() {
        try {
            UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
        } catch (Exception ignored) {}

        // Global defaults
        UIManager.put("Panel.background", BG);
        UIManager.put("Label.foreground", TEXT);
        UIManager.put("Label.font", FONT);
        UIManager.put("TextField.background", SURFACE_3);
        UIManager.put("TextField.foreground", TEXT);
        UIManager.put("TextField.caretForeground", TEXT);
        UIManager.put("TextField.border", createLineBorder(BORDER, RADIUS));
        UIManager.put("TextArea.background", SURFACE_3);
        UIManager.put("TextArea.foreground", TEXT);
        UIManager.put("TextArea.caretForeground", TEXT);
        UIManager.put("ComboBox.background", SURFACE_3);
        UIManager.put("ComboBox.foreground", TEXT);
        UIManager.put("ComboBox.selectionBackground", ACCENT);
        UIManager.put("ComboBox.selectionForeground", TEXT);
        UIManager.put("List.background", SURFACE_2);
        UIManager.put("List.foreground", TEXT);
        UIManager.put("List.selectionBackground", ACCENT);
        UIManager.put("List.selectionForeground", TEXT);
        UIManager.put("ScrollPane.background", BG);
        UIManager.put("ScrollBar.background", SURFACE_2);
        UIManager.put("ScrollBar.thumb", SURFACE_4);
        UIManager.put("ScrollBar.thumbDarkShadow", SURFACE_4);
        UIManager.put("ScrollBar.thumbShadow", SURFACE_3);
        UIManager.put("ScrollBar.thumbHighlight", SURFACE_4);
        UIManager.put("ScrollBar.track", SURFACE_2);
        UIManager.put("Table.background", SURFACE_2);
        UIManager.put("Table.foreground", TEXT);
        UIManager.put("Table.selectionBackground", ACCENT);
        UIManager.put("Table.selectionForeground", TEXT);
        UIManager.put("Table.gridColor", BORDER);
        UIManager.put("TableHeader.background", SURFACE_3);
        UIManager.put("TableHeader.foreground", TEXT_MUTED);
        UIManager.put("TabbedPane.background", BG);
        UIManager.put("TabbedPane.foreground", TEXT_MUTED);
        UIManager.put("TabbedPane.selected", SURFACE_2);
        UIManager.put("TabbedPane.selectedForeground", TEXT);
        UIManager.put("OptionPane.background", SURFACE);
        UIManager.put("OptionPane.messageForeground", TEXT);
        UIManager.put("FileChooser.background", BG);
        UIManager.put("ProgressBar.foreground", ACCENT);
        UIManager.put("ProgressBar.background", SURFACE_3);
        UIManager.put("ToolTip.background", SURFACE_3);
        UIManager.put("ToolTip.foreground", TEXT);
        UIManager.put("Separator.foreground", BORDER);

        // Set default font globally
        UIManager.put("defaultFont", FONT);
    }

    /**
     * Create a new JFrame with the CronixUI theme applied.
     */
    public static JFrame frame(String title) {
        JFrame f = new JFrame(title);
        f.getContentPane().setBackground(BG);
        f.getContentPane().setForeground(TEXT);
        f.setFont(FONT);
        return f;
    }

    /**
     * Set the CronixUI theme on an existing JFrame.
     */
    public static void applyTo(JFrame frame) {
        frame.getContentPane().setBackground(BG);
        frame.getContentPane().setForeground(TEXT);
    }

    /**
     * Set the CronixUI theme on an existing JPanel.
     */
    public static void applyTo(JPanel panel) {
        panel.setBackground(BG);
        panel.setForeground(TEXT);
        panel.setFont(FONT);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private static javax.swing.border.Border createLineBorder(Color color, int radius) {
        return javax.swing.BorderFactory.createCompoundBorder(
            new RoundedBorder(color, radius),
            javax.swing.BorderFactory.createEmptyBorder(8, 12, 8, 12)
        );
    }

    /** Simple rounded border for text fields. */
    public static class RoundedBorder extends javax.swing.border.AbstractBorder {
        private final Color color;
        private final int radius;

        public RoundedBorder(Color color, int radius) {
            this.color = color;
            this.radius = radius;
        }

        @Override
        public void paintBorder(Component c, Graphics g, int x, int y, int w, int h) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2.setColor(color);
            g2.drawRoundRect(x, y, w - 1, h - 1, radius, radius);
            g2.dispose();
        }

        @Override
        public Insets getBorderInsets(Component c) {
            return new Insets(radius / 2 + 1, radius / 2 + 1, radius / 2 + 1, radius / 2 + 1);
        }
    }
}
