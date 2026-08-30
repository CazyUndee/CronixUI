package cronixui;

import cronixui.theme.CronixTheme;
import cronixui.components.*;
import javax.swing.*;
import java.awt.*;

/**
 * CronixUI - Dark-themed native Swing UI toolkit with crimson accents.
 *
 * <p>Usage:
 * <pre>
 *   CronixUI.init();
 *   JFrame frame = CronixUI.frame("My App");
 *   // ... add components ...
 *   frame.setVisible(true);
 * </pre>
 */
public final class CronixUI {

    private CronixUI() {}

    /**
     * Initialize the CronixUI look-and-feel.
     * Must be called on the EDT before creating any frames.
     */
    public static void init() {
        SwingUtilities.invokeLater(CronixTheme::install);
    }

    /**
     * Create a themed JFrame.
     */
    public static JFrame frame(String title) {
        return CronixTheme.frame(title);
    }

    /**
     * Apply the CronixUI theme to an existing JFrame.
     */
    public static void applyTo(JFrame frame) {
        CronixTheme.applyTo(frame);
    }

    /**
     * Apply the CronixUI theme to a JPanel.
     */
    public static void applyTo(JPanel panel) {
        CronixTheme.applyTo(panel);
    }

    /**
     * Show a toast notification.
     */
    public static void toast(Component parent, String message) {
        CnToast.show(parent, message, CnToast.Variant.DEFAULT);
    }

    /**
     * Show a toast notification with variant.
     */
    public static void toast(Component parent, String message, CnToast.Variant variant) {
        CnToast.show(parent, message, variant);
    }

    /**
     * Launch the built-in demo showing all components.
     */
    public static void demo() {
        SwingUtilities.invokeLater(() -> {
            CronixTheme.install();

            JFrame frame = frame("CronixUI Demo");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(900, 700);
            frame.setLocationRelativeTo(null);

            JPanel root = new JPanel();
            root.setLayout(new BoxLayout(root, BoxLayout.Y_AXIS));
            root.setBackground(CronixTheme.BG);
            root.setBorder(BorderFactory.createEmptyBorder(24, 32, 24, 32));

            // Title
            JLabel title = new JLabel("CronixUI Component Demo");
            title.setFont(CronixTheme.FONT_XL);
            title.setForeground(CronixTheme.TEXT);
            title.setAlignmentX(Component.LEFT_ALIGNMENT);
            root.add(title);
            root.add(Box.createVerticalStrut(8));

            JLabel subtitle = new JLabel("Dark-themed native Swing components with crimson accents");
            subtitle.setFont(CronixTheme.FONT);
            subtitle.setForeground(CronixTheme.TEXT_MUTED);
            subtitle.setAlignmentX(Component.LEFT_ALIGNMENT);
            root.add(subtitle);
            root.add(Box.createVerticalStrut(24));

            // ── Buttons ──
            root.add(sectionLabel("Buttons"));
            JPanel btnRow = row(
                new CnButton("Default"),
                new CnButton("Primary", CnButton.Variant.PRIMARY),
                new CnButton("Ghost", CnButton.Variant.GHOST),
                new CnButton("Danger", CnButton.Variant.DANGER)
            );
            root.add(btnRow);
            root.add(Box.createVerticalStrut(24));

            // ── Inputs ──
            root.add(sectionLabel("Inputs"));
            JPanel inputRow = row(
                new CnTextField("Placeholder text..."),
                new CnTextField("Email address")
            );
            root.add(inputRow);
            root.add(Box.createVerticalStrut(24));

            // ── Toggles ──
            root.add(sectionLabel("Toggles"));
            CnToggle toggle1 = new CnToggle();
            CnToggle toggle2 = new CnToggle();
            toggle2.setSelected(true);
            JPanel toggleRow = row(toggle1, toggle2);
            root.add(toggleRow);
            root.add(Box.createVerticalStrut(24));

            // ── Badges ──
            root.add(sectionLabel("Badges"));
            JPanel badgeRow = row(
                new CnBadge("Default"),
                new CnBadge("Accent", CnBadge.Variant.ACCENT),
                new CnBadge("Success", CnBadge.Variant.SUCCESS),
                new CnBadge("Warning", CnBadge.Variant.WARNING),
                new CnBadge("Error", CnBadge.Variant.ERROR)
            );
            root.add(badgeRow);
            root.add(Box.createVerticalStrut(24));

            // ── Progress ──
            root.add(sectionLabel("Progress"));
            CnProgress progress = new CnProgress(65);
            progress.setAlignmentX(Component.LEFT_ALIGNMENT);
            progress.setMaximumSize(new Dimension(Integer.MAX_VALUE, 8));
            root.add(progress);
            root.add(Box.createVerticalStrut(24));

            // ── Spinner ──
            root.add(sectionLabel("Spinner"));
            CnSpinner spinner = new CnSpinner();
            JPanel spinnerRow = row(spinner);
            root.add(spinnerRow);
            root.add(Box.createVerticalStrut(24));

            // ── Tabs ──
            root.add(sectionLabel("Tabs"));
            CnTabs tabs = new CnTabs("Overview", "Analytics", "Settings", "Billing");
            tabs.setAlignmentX(Component.LEFT_ALIGNMENT);
            tabs.setMaximumSize(new Dimension(Integer.MAX_VALUE, 40));
            root.add(tabs);
            root.add(Box.createVerticalStrut(24));

            // ── Alerts ──
            root.add(sectionLabel("Alerts"));
            CnAlert info = new CnAlert("This is an info alert.", CnAlert.Variant.INFO);
            info.setAlignmentX(Component.LEFT_ALIGNMENT);
            info.setMaximumSize(new Dimension(Integer.MAX_VALUE, 50));
            root.add(info);
            root.add(Box.createVerticalStrut(8));
            CnAlert success = new CnAlert("Operation completed successfully.", CnAlert.Variant.SUCCESS);
            success.setAlignmentX(Component.LEFT_ALIGNMENT);
            success.setMaximumSize(new Dimension(Integer.MAX_VALUE, 50));
            root.add(success);
            root.add(Box.createVerticalStrut(24));

            // ── Toast & Modal buttons ──
            root.add(sectionLabel("Actions"));
            CnButton toastBtn = new CnButton("Show Toast", CnButton.Variant.PRIMARY);
            toastBtn.addActionListener(e -> CnToast.show(frame, "Saved successfully!", CnToast.Variant.SUCCESS));

            CnButton modalBtn = new CnButton("Show Modal");
            modalBtn.addActionListener(e -> {
                CnModal modal = new CnModal(frame, "Confirm Action");
                JLabel body = new JLabel("<html><div style='width:300px'>Are you sure you want to proceed with this action?</div></html>");
                body.setForeground(CronixTheme.TEXT);
                modal.setBody(body);
                CnButton confirm = new CnButton("Confirm", CnButton.Variant.PRIMARY);
                CnButton cancel = new CnButton("Cancel");
                JPanel footer = row(confirm, cancel);
                modal.setFooter(footer);
                confirm.addActionListener(ev -> {
                    modal.close();
                    CnToast.show(frame, "Action confirmed!", CnToast.Variant.SUCCESS);
                });
                cancel.addActionListener(ev -> modal.close());
                modal.open();
            });

            JPanel actionRow = row(toastBtn, modalBtn);
            root.add(actionRow);

            JScrollPane scroll = new JScrollPane(root);
            scroll.setBorder(null);
            scroll.getVerticalScrollBar().setUnitIncrement(16);
            frame.setContentPane(scroll);
            frame.setVisible(true);
        });
    }

    private static JLabel sectionLabel(String text) {
        JLabel label = new JLabel(text);
        label.setFont(CronixTheme.FONT_BOLD);
        label.setForeground(CronixTheme.ACCENT_TEXT);
        label.setAlignmentX(Component.LEFT_ALIGNMENT);
        return label;
    }

    private static JPanel row(Component... components) {
        JPanel row = new JPanel();
        row.setLayout(new FlowLayout(FlowLayout.LEFT, 12, 0));
        row.setOpaque(false);
        row.setAlignmentX(Component.LEFT_ALIGNMENT);
        row.setMaximumSize(new Dimension(Integer.MAX_VALUE, 50));
        for (Component c : components) row.add(c);
        return row;
    }
}
