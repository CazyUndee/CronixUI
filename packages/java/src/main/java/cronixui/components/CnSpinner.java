package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.Ellipse2D;

/**
 * CronixUI loading spinner / circular progress.
 */
public class CnSpinner extends JComponent {

    private int angle = 0;
    private Timer timer;
    private int speed = 8;

    public CnSpinner() {
        this(24);
    }

    public CnSpinner(int size) {
        setPreferredSize(new Dimension(size, size));
        setMinimumSize(new Dimension(size, size));
        setMaximumSize(new Dimension(size, size));
        start();
    }

    public void start() {
        if (timer != null && timer.isRunning()) return;
        timer = new Timer(16, e -> { angle = (angle + speed) % 360; repaint(); });
        timer.start();
    }

    public void stop() {
        if (timer != null) timer.stop();
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int size = Math.min(getWidth(), getHeight());
        int stroke = Math.max(2, size / 8);
        int padding = stroke;
        int arcSize = size - padding * 2;

        g2.setColor(CronixTheme.SURFACE_4);
        g2.setStroke(new BasicStroke(stroke, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g2.drawArc(padding, padding, arcSize, arcSize, 0, 360);

        g2.setColor(CronixTheme.ACCENT);
        g2.drawArc(padding, padding, arcSize, arcSize, -angle, 90);

        g2.dispose();
    }
}
