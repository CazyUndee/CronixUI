package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import java.util.ArrayList;
import java.util.List;

/**
 * CronixUI tabs component with custom rendering.
 */
public class CnTabs extends JComponent {

    private final List<String> tabs = new ArrayList<>();
    private int selectedIndex = 0;
    private TabChangeListener listener;

    @FunctionalInterface
    public interface TabChangeListener {
        void tabChanged(int index);
    }

    public CnTabs(String... tabNames) {
        for (String name : tabNames) tabs.add(name);
        setPreferredSize(new Dimension(400, 40));
        setMinimumSize(new Dimension(200, 40));
        setLayout(null);

        addMouseListener(new java.awt.event.MouseAdapter() {
            @Override
            public void mouseClicked(java.awt.event.MouseEvent e) {
                int x = 0;
                for (int i = 0; i < tabs.size(); i++) {
                    int tabW = getFontMetrics(CronixTheme.FONT_BOLD).stringWidth(tabs.get(i)) + 24;
                    if (e.getX() >= x && e.getX() <= x + tabW) {
                        setSelectedIndex(i);
                        break;
                    }
                    x += tabW + 4;
                }
            }
        });
    }

    public int getSelectedIndex() { return selectedIndex; }
    public String getSelectedTab() { return tabs.get(selectedIndex); }

    public void setSelectedIndex(int i) {
        if (i < 0 || i >= tabs.size()) return;
        selectedIndex = i;
        if (listener != null) listener.tabChanged(i);
        repaint();
    }

    public CnTabs addTabChangeListener(TabChangeListener l) { this.listener = l; return this; }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int x = 0;
        int h = getHeight();
        FontMetrics fm = g2.getFontMetrics(CronixTheme.FONT_BOLD);

        for (int i = 0; i < tabs.size(); i++) {
            String tab = tabs.get(i);
            int tabW = fm.stringWidth(tab) + 24;
            boolean selected = i == selectedIndex;

            if (selected) {
                g2.setColor(CronixTheme.SURFACE_2);
                g2.fill(new RoundRectangle2D.Float(x, 2, tabW, h - 4, CronixTheme.RADIUS_SM, CronixTheme.RADIUS_SM));
            }

            g2.setColor(selected ? CronixTheme.TEXT : CronixTheme.TEXT_MUTED);
            g2.setFont(CronixTheme.FONT_BOLD);
            g2.drawString(tab, x + 12, h / 2 + 5);

            x += tabW + 4;
        }

        g2.dispose();
    }
}
