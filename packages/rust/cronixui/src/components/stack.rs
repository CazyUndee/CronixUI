//! Stack layout components for vertical and horizontal stacking.

use egui::Ui;

/// Layout direction for stacks.
#[derive(Clone, Copy, PartialEq)]
pub enum StackDirection {
    Vertical,
    Horizontal,
}

/// Render children in a vertical stack with spacing.
pub fn stack(ui: &mut Ui, spacing: f32, add_contents: impl FnOnce(&mut Ui)) {
    ui.vertical(|ui| {
        ui.spacing_mut().item_spacing.y = spacing;
        add_contents(ui);
    });
}

/// Render children in a horizontal stack with spacing.
pub fn hstack(ui: &mut Ui, spacing: f32, add_contents: impl FnOnce(&mut Ui)) {
    ui.horizontal(|ui| {
        ui.spacing_mut().item_spacing.x = spacing;
        add_contents(ui);
    });
}
