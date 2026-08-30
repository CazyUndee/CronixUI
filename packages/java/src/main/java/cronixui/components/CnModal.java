package cronixui.components;

import cronixui.theme.CronixTheme;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.RoundRectangle2D;

/**
 * CronixUI modal dialog with focus trap and backdrop.
 */
public class CnModal extends JDialog {

    private JPanel contentPanel;
    private Runnable onClose;

    public CnModal(JFrame parent, String title) {
        super(parent, title, true);
        setDefaultCloseOperation(DO_NOTHING_ON_CLOSE);
        setBackground(new Color(0, 0, 0, 180));
        setUndecorated(true);
        setResizable(false);

        contentPanel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2 = (Graphics2D) g.create();
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                g2.setColor(CronixTheme.SURFACE);
                g2.fill(new RoundRectangle2D.Float(0, 0, getWidth(), getHeight(),
                    CronixTheme.RADIUS_LG, CronixTheme.RADIUS_LG));
                g2.setColor(CronixTheme.BORDER);
                g2.draw(new RoundRectangle2D.Float(0, 0, getWidth() - 1, getHeight() - 1,
                    CronixTheme.RADIUS_LG, CronixTheme.RADIUS_LG));
                g2.dispose();
                super.paintComponent(g);
            }
        };
        contentPanel.setOpaque(false);
        contentPanel.setLayout(new BorderLayout());
        contentPanel.setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));
        setContentPane(contentPanel);

        addKeyListener(new KeyAdapter() {
            @Override public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ESCAPE) close();
            }
        });
    }

    public JPanel getContentPanel() { return contentPanel; }

    public CnModal setOnClose(Runnable r) { this.onClose = r; return this; }

    public CnModal setBody(JComponent body) {
        contentPanel.add(body, BorderLayout.CENTER);
        return this;
    }

    public CnModal setFooter(JComponent footer) {
        contentPanel.add(footer, BorderLayout.SOUTH);
        return this;
    }

    public void open() {
        JFrame parent = (JFrame) getOwner();
        setSize(Math.min(500, parent.getWidth() - 80), Math.min(400, parent.getHeight() - 80));
        setLocationRelativeTo(parent);
        setVisible(true);
    }

    public void close() {
        setVisible(false);
        if (onClose != null) onClose.run();
    }
}
