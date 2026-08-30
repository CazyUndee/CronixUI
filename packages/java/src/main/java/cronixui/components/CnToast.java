package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI toast notification that auto-dismisses.
 */
public class CnToast extends JWindow {

    public enum Variant { DEFAULT, SUCCESS, WARNING, ERROR, INFO }

    public CnToast(String message, Variant variant) {
        JPanel panel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2 = (Graphics2D) g.create();
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                g2.setColor(CronixTheme.SURFACE);
                g2.fill(new RoundRectangle2D.Float(0, 0, getWidth(), getHeight(),
                    CronixTheme.RADIUS, CronixTheme.RADIUS));
                g2.setColor(resolveBorder(variant));
                g2.setStroke(new BasicStroke(1f));
                g2.draw(new RoundRectangle2D.Float(0, 0, getWidth() - 1, getHeight() - 1,
                    CronixTheme.RADIUS, CronixTheme.RADIUS));
                g2.dispose();
            }
        };
        panel.setOpaque(false);
        panel.setLayout(new BorderLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(12, 16, 12, 16));

        JLabel label = new JLabel(message);
        label.setForeground(resolveFg(variant));
        label.setFont(CronixTheme.FONT);
        panel.add(label, BorderLayout.CENTER);

        setContentPane(panel);
        setSize(Math.max(200, message.length() * 8 + 40), 44);
    }

    public void show(Component parent, int durationMs) {
        Point loc = parent.getLocationOnScreen();
        setLocation(loc.x + parent.getWidth() - getWidth() - 16, loc.y + parent.getHeight() - getHeight() - 16);
        setVisible(true);
        Timer timer = new Timer(durationMs, e -> setVisible(false));
        timer.setRepeats(false);
        timer.start();
    }

    public static void show(Component parent, String message, Variant variant) {
        new CnToast(message, variant).show(parent, 3000);
    }

    private static Color resolveFg(Variant v) {
        return switch (v) {
            case SUCCESS -> CronixTheme.SUCCESS_TEXT;
            case WARNING -> CronixTheme.WARNING_TEXT;
            case ERROR -> CronixTheme.ERROR_TEXT;
            case INFO -> CronixTheme.INFO_TEXT;
            default -> CronixTheme.TEXT;
        };
    }

    private static Color resolveBorder(Variant v) {
        return switch (v) {
            case SUCCESS -> CronixTheme.SUCCESS;
            case WARNING -> CronixTheme.WARNING;
            case ERROR -> CronixTheme.ERROR;
            case INFO -> CronixTheme.INFO;
            default -> CronixTheme.BORDER;
        };
    }
}
