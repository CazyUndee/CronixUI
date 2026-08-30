package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.Ellipse2D;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI toggle switch component.
 */
public class CnToggle extends JComponent {

    private boolean selected = false;
    private float animProgress = 0f;
    private Timer animTimer;

    public CnToggle() {
        setPreferredSize(new Dimension(44, 24));
        setMinimumSize(new Dimension(44, 24));
        setMaximumSize(new Dimension(44, 24));
        setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        setToolTipText("Toggle");

        addMouseListener(new java.awt.event.MouseAdapter() {
            @Override
            public void mouseClicked(java.awt.event.MouseEvent e) {
                setSelected(!selected);
            }
        });
    }

    public boolean isSelected() { return selected; }

    public void setSelected(boolean sel) {
        if (this.selected == sel) return;
        this.selected = sel;
        if (animTimer != null && animTimer.isRunning()) animTimer.stop();
        animProgress = sel ? 1f : 0f;
        repaint();
    }

    public CnToggle addToggleListener(Runnable listener) {
        addMouseListener(new java.awt.event.MouseAdapter() {
            @Override
            public void mouseClicked(java.awt.event.MouseEvent e) {
                listener.run();
            }
        });
        return this;
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int w = getWidth();
        int h = getHeight();
        int trackH = 20;
        int trackW = 36;
        int thumbSize = 16;
        int trackY = (h - trackH) / 2;
        int trackX = (w - trackW) / 2;

        // Track
        g2.setColor(selected ? CronixTheme.ACCENT : CronixTheme.SURFACE_4);
        g2.fill(new RoundRectangle2D.Float(trackX, trackY, trackW, trackH, trackH, trackH));

        // Border
        g2.setColor(selected ? CronixTheme.ACCENT_LIGHT : CronixTheme.BORDER);
        g2.setStroke(new BasicStroke(1f));
        g2.draw(new RoundRectangle2D.Float(trackX, trackY, trackW, trackH, trackH, trackH));

        // Thumb
        int thumbX = selected ? trackX + trackW - thumbSize - 2 : trackX + 2;
        int thumbY = trackY + (trackH - thumbSize) / 2;
        g2.setColor(selected ? CronixTheme.TEXT : CronixTheme.TEXT_MUTED);
        g2.fill(new Ellipse2D.Float(thumbX, thumbY, thumbSize, thumbSize));

        g2.dispose();
    }
}
