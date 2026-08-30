package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI styled button with variant support.
 */
public class CnButton extends JButton {

    public enum Variant { DEFAULT, PRIMARY, GHOST, DANGER }
    public enum Size { SM, MD, LG }

    private Variant variant = Variant.DEFAULT;
    private Size size = Size.MD;
    private boolean loading = false;
    private Timer loadingTimer;
    private int loadingAngle = 0;

    public CnButton(String text) {
        this(text, Variant.DEFAULT);
    }

    public CnButton(String text, Variant variant) {
        super(text);
        this.variant = variant;
        setContentAreaFilled(false);
        setFocusPainted(false);
        setBorderPainted(false);
        setOpaque(false);
        setForeground(resolveForeground());
        setBackground(resolveBackground());
        setFont(CronixTheme.FONT_BOLD);
        setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        setPreferredSize(calcPreferredSize());
        setMinimumSize(new Dimension(80, calcHeight()));

        addMouseListener(new MouseAdapter() {
            @Override public void mouseEntered(MouseEvent e) { repaint(); }
            @Override public void mouseExited(MouseEvent e) { repaint(); }
        });

        addChangeListener(e -> repaint());
    }

    public CnButton setVariant(Variant v) { this.variant = v; updateColors(); return this; }
    public CnButton setSize(Size s) { this.size = s; setPreferredSize(calcPreferredSize()); return this; }
    public Variant getVariant() { return variant; }

    public void setLoading(boolean loading) {
        this.loading = loading;
        setEnabled(!loading);
        if (loading) {
            loadingTimer = new Timer(50, e -> { loadingAngle = (loadingAngle + 15) % 360; repaint(); });
            loadingTimer.start();
        } else if (loadingTimer != null) {
            loadingTimer.stop();
            loadingTimer = null;
        }
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int w = getWidth();
        int h = getHeight();
        int arc = variant == Variant.PRIMARY ? CronixTheme.RADIUS : CronixTheme.RADIUS_SM;

        // Background
        if (model.isRollover() || model.isPressed()) {
            g2.setColor(variant == Variant.PRIMARY ? CronixTheme.ACCENT_HOVER : CronixTheme.SURFACE_4);
        } else {
            g2.setColor(getBackground());
        }
        g2.fill(new RoundRectangle2D.Float(0, 0, w, h, arc, arc));

        // Border for non-primary variants
        if (variant != Variant.PRIMARY && variant != Variant.DANGER) {
            g2.setColor(model.isRollover() ? CronixTheme.BORDER_HOVER : CronixTheme.BORDER);
            g2.draw(new RoundRectangle2D.Float(0, 0, w - 1, h - 1, arc, arc));
        }

        // Loading spinner
        if (loading) {
            g2.setColor(getForeground());
            int cx = w / 2 - 6;
            int cy = h / 2 - 6;
            g2.setStroke(new BasicStroke(2f));
            g2.drawArc(cx, cy, 12, 12, loadingAngle, 90);
        }

        g2.dispose();
        super.paintComponent(g);
    }

    private Color resolveForeground() {
        return switch (variant) {
            case PRIMARY -> CronixTheme.TEXT;
            case DANGER -> CronixTheme.ERROR_TEXT;
            default -> CronixTheme.TEXT;
        };
    }

    private Color resolveBackground() {
        return switch (variant) {
            case PRIMARY -> CronixTheme.ACCENT;
            case DANGER -> CronixTheme.ERROR;
            default -> CronixTheme.SURFACE_2;
        };
    }

    private void updateColors() {
        setForeground(resolveForeground());
        setBackground(resolveBackground());
        repaint();
    }

    private int calcHeight() {
        return switch (size) {
            case SM -> 28;
            case LG -> 44;
            default -> 36;
        };
    }

    private Dimension calcPreferredSize() {
        return new Dimension(getPreferredSize().width > 80 ? getPreferredSize().width : 100, calcHeight());
    }
}
