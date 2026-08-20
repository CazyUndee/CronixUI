//! Footer layout component.

use egui::Ui;
use crate::tokens::*;

/// Render a footer section.
pub fn footer(ui: &mut Ui, add_contents: impl FnOnce(&mut Ui)) {
    let frame = egui::Frame::new()
        .fill(colors::surface())
        .inner_margin(egui::Margin::symmetric(16.0, 12.0))
        .stroke(egui::Stroke::new(1.0, colors::border()));

    frame.show(ui, |ui| {
        add_contents(ui);
    });
}
