package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI styled text field with placeholder support.
 */
public class CnTextField extends JTextField {

    private String placeholder = "";
    private Color borderColor = CronixTheme.BORDER;
    private Color focusBorderColor = CronixTheme.BORDER_FOCUS;

    public CnTextField() {
        this("");
    }

    public CnTextField(String placeholder) {
        this.placeholder = placeholder;
        setBackground(CronixTheme.SURFACE_3);
        setForeground(CronixTheme.TEXT);
        setCaretColor(CronixTheme.TEXT);
        setFont(CronixTheme.FONT);
        setBorder(BorderFactory.createCompoundBorder(
            new RoundedBorder(CronixTheme.BORDER, CronixTheme.RADIUS_SM),
            BorderFactory.createEmptyBorder(8, 12, 8, 12)
        ));
        setPreferredSize(new Dimension(250, 36));
    }

    public CnTextField setPlaceholder(String text) { this.placeholder = text; return this; }
    public String getPlaceholder() { return placeholder; }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        if (getText().isEmpty() && !placeholder.isEmpty() && !hasFocus()) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
            g2.setColor(CronixTheme.TEXT_DIM);
            g2.setFont(getFont());
            Insets insets = getInsets();
            g2.drawString(placeholder, insets.left, getHeight() / 2 + 5);
            g2.dispose();
        }
    }

    @Override
    protected void paintBorder(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2.setColor(hasFocus() ? focusBorderColor : borderColor);
        g2.drawRoundRect(0, 0, getWidth() - 1, getHeight() - 1, CronixTheme.RADIUS_SM, CronixTheme.RADIUS_SM);
        g2.dispose();
    }

    public static class RoundedBorder extends javax.swing.border.AbstractBorder {
        private final Color color; private final int radius;
        public RoundedBorder(Color color, int radius) { this.color = color; this.radius = radius; }
        @Override public void paintBorder(Component c, Graphics g, int x, int y, int w, int h) {}
        @Override public Insets getBorderInsets(Component c) { return new Insets(2, 2, 2, 2); }
    }
}
