package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI progress bar component.
 */
public class CnProgress extends JComponent {

    private int value = 0;
    private int max = 100;
    private boolean indeterminate = false;
    private float indeterminatePos = 0f;
    private Timer indeterminateTimer;

    public CnProgress() {
        setPreferredSize(new Dimension(200, 8));
        setMinimumSize(new Dimension(100, 8));
    }

    public CnProgress(int value) {
        this();
        setValue(value);
    }

    public int getValue() { return value; }
    public int getMax() { return max; }

    public void setValue(int v) {
        this.value = Math.max(0, Math.min(max, v));
        this.indeterminate = false;
        if (indeterminateTimer != null) indeterminateTimer.stop();
        repaint();
    }

    public void setMax(int m) { this.max = m; repaint(); }

    public void setIndeterminate(boolean ind) {
        this.indeterminate = ind;
        if (ind) {
            if (indeterminateTimer == null) {
                indeterminateTimer = new Timer(16, e -> {
                    indeterminatePos = (indeterminatePos + 0.02f) % 1.2f;
                    repaint();
                });
            }
            indeterminateTimer.start();
        } else if (indeterminateTimer != null) {
            indeterminateTimer.stop();
        }
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int w = getWidth();
        int h = getHeight();
        int arc = h;

        // Track
        g2.setColor(CronixTheme.SURFACE_3);
        g2.fill(new RoundRectangle2D.Float(0, 0, w, h, arc, arc));

        // Fill
        int fillW;
        float startX = 0;
        if (indeterminate) {
            fillW = (int) (w * 0.3f);
            startX = (indeterminatePos * (w + fillW)) - fillW;
        } else {
            fillW = (int) ((float) value / max * w);
        }
        if (fillW > 0) {
            g2.setColor(CronixTheme.ACCENT);
            g2.fill(new RoundRectangle2D.Float(startX, 0, Math.max(fillW, arc), h, arc, arc));
        }

        g2.dispose();
    }
}
