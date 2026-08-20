//! Header layout component.

use egui::Ui;
use crate::colors::*;

/// Render a header section.
pub fn header(ui: &mut Ui, title: &str, add_contents: impl FnOnce(&mut Ui)) {
    let frame = egui::Frame::default()
        .fill(SURFACE)
        .inner_margin(egui::Margin::symmetric(16.0, 12.0));

    frame.show(ui, |ui| {
        ui.horizontal(|ui| {
            ui.label(
                egui::RichText::new(title)
                    .size(16.0)
                    .strong()
                    .color(TEXT),
            );
            ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                add_contents(ui);
            });
        });
    });
}
