package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI badge / tag component.
 */
public class CnBadge extends JLabel {

    public enum Variant { DEFAULT, ACCENT, SUCCESS, WARNING, ERROR, INFO }

    public CnBadge(String text) {
        this(text, Variant.DEFAULT);
    }

    public CnBadge(String text, Variant variant) {
        super(text);
        setOpaque(false);
        setFont(CronixTheme.FONT_SM);
        setForeground(resolveFg(variant));
        setHorizontalAlignment(CENTER);
        setPreferredSize(new Dimension(getPreferredSize().width + 16, 24));
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2.setColor(getForeground());
        g2.globalAlpha = 0.15;
        g2.fill(new RoundRectangle2D.Float(0, 0, getWidth(), getHeight(), CronixTheme.RADIUS_SM, CronixTheme.RADIUS_SM));
        g2.globalAlpha = 1.0;
        g2.setColor(getForeground());
        g2.draw(new RoundRectangle2D.Float(0, 0, getWidth() - 1, getHeight() - 1, CronixTheme.RADIUS_SM, CronixTheme.RADIUS_SM));
        g2.dispose();
        super.paintComponent(g);
    }

    private static Color resolveFg(Variant v) {
        return switch (v) {
            case SUCCESS -> CronixTheme.SUCCESS_TEXT;
            case WARNING -> CronixTheme.WARNING_TEXT;
            case ERROR -> CronixTheme.ERROR_TEXT;
            case INFO -> CronixTheme.INFO_TEXT;
            case ACCENT -> CronixTheme.ACCENT_TEXT;
            default -> CronixTheme.TEXT_MUTED;
        };
    }
}
