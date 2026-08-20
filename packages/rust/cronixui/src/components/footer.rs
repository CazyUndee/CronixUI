//! Footer layout component.

use egui::Ui;
use crate::colors::*;

/// Render a footer section.
pub fn footer(ui: &mut Ui, add_contents: impl FnOnce(&mut Ui)) {
    let frame = egui::Frame::default()
        .fill(SURFACE)
        .inner_margin(egui::Margin::symmetric(16.0, 12.0))
        .stroke(egui::Stroke::new(1.0, BORDER));

    frame.show(ui, |ui| {
        add_contents(ui);
    });
}
