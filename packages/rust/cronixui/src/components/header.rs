//! Header layout component.

use egui::Ui;
use crate::tokens::*;

/// Render a header section.
pub fn header(ui: &mut Ui, title: &str, add_contents: impl FnOnce(&mut Ui)) {
    let frame = egui::Frame::new()
        .fill(colors::surface())
        .inner_margin(egui::Margin::symmetric(16.0, 12.0));

    frame.show(ui, |ui| {
        ui.horizontal(|ui| {
            ui.label(
                egui::RichText::new(title)
                    .size(16.0)
                    .strong()
                    .color(colors::text()),
            );
            ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                add_contents(ui);
            });
        });
    });
}
