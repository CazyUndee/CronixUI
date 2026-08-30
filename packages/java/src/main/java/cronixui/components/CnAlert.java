package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI alert banner with variant support.
 */
public class CnAlert extends JPanel {

    public enum Variant { DEFAULT, SUCCESS, WARNING, ERROR, INFO }

    private String message;
    private Variant variant;
    private JLabel messageLabel;

    public CnAlert(String message, Variant variant) {
        this.message = message;
        this.variant = variant;
        setOpaque(false);
        setBackground(resolveBg(variant));
        setLayout(new BorderLayout(12, 0));
        setBorder(BorderFactory.createCompoundBorder(
            new RoundedLineBorder(resolveFg(variant), 1, CronixTheme.RADIUS_SM),
            BorderFactory.createEmptyBorder(12, 16, 12, 16)
        ));

        messageLabel = new JLabel(message);
        messageLabel.setForeground(resolveFg(variant));
        messageLabel.setFont(CronixTheme.FONT);
        add(messageLabel, BorderLayout.CENTER);
    }

    public CnAlert setMessage(String msg) { this.message = msg; messageLabel.setText(msg); return this; }

    private static Color resolveFg(Variant v) {
        return switch (v) {
            case SUCCESS -> CronixTheme.SUCCESS_TEXT;
            case WARNING -> CronixTheme.WARNING_TEXT;
            case ERROR -> CronixTheme.ERROR_TEXT;
            case INFO -> CronixTheme.INFO_TEXT;
            default -> CronixTheme.TEXT;
        };
    }

    private static Color resolveBg(Variant v) {
        return switch (v) {
            case SUCCESS -> CronixTheme.SUCCESS;
            case WARNING -> CronixTheme.WARNING;
            case ERROR -> CronixTheme.ERROR;
            case INFO -> CronixTheme.INFO;
            default -> CronixTheme.SURFACE_2;
        };
    }

    private static class RoundedLineBorder extends javax.swing.border.AbstractBorder {
        private final Color color; private final int thickness; private final int radius;
        RoundedLineBorder(Color c, int t, int r) { color = c; thickness = t; radius = r; }
        @Override
        public void paintBorder(Component c, Graphics g, int x, int y, int w, int h) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2.setColor(color);
            g2.setStroke(new BasicStroke(thickness));
            g2.drawRoundRect(x, y, w - 1, h - 1, radius, radius);
            g2.dispose();
        }
        @Override public Insets getBorderInsets(Component c) { return new Insets(thickness + 4, thickness + 4, thickness + 4, thickness + 4); }
    }
}
