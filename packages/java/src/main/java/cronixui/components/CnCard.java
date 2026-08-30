package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI card container with rounded border and surface background.
 */
public class CnCard extends JPanel {

    public enum Padding { SM, MD, LG }

    public CnCard() {
        this(Padding.MD);
    }

    public CnCard(Padding padding) {
        setOpaque(false);
        setBackground(CronixTheme.SURFACE);
        setBorder(BorderFactory.createEmptyBorder(
            padding == Padding.SM ? 12 : padding == Padding.LG ? 24 : 16,
            padding == Padding.SM ? 12 : padding == Padding.LG ? 24 : 16,
            padding == Padding.SM ? 12 : padding == Padding.LG ? 24 : 16,
            padding == Padding.SM ? 12 : padding == Padding.LG ? 24 : 16
        ));
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2.setColor(getBackground() != null ? getBackground() : CronixTheme.SURFACE);
        g2.fill(new RoundRectangle2D.Float(0, 0, getWidth(), getHeight(), CronixTheme.RADIUS, CronixTheme.RADIUS));
        g2.setColor(CronixTheme.BORDER);
        g2.draw(new RoundRectangle2D.Float(0, 0, getWidth() - 1, getHeight() - 1, CronixTheme.RADIUS, CronixTheme.RADIUS));
        g2.dispose();
        super.paintComponent(g);
    }
}
