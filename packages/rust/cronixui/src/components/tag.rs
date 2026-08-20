//! Tag component for labels with optional removal.

use egui::Ui;
use crate::tokens::*;

/// Render a tag widget.
pub fn tag(ui: &mut Ui, label: &str, on_remove: Option<&mut dyn FnMut()>) -> egui::Response {
    let frame = egui::Frame::new()
        .fill(colors::surface_light())
        .rounding(tokens::ROUNDING_SM)
        .inner_margin(egui::vec2(8.0, 4.0));

    frame.show(ui, |ui| {
        ui.horizontal(|ui| {
            ui.label(
                egui::RichText::new(label)
                    .size(10.0)
                    .color(colors::text()),
            );

            if let Some(callback) = on_remove {
                if ui
                    .small_button("✕")
                    .on_hover_text("Remove")
                    .clicked()
                {
                    callback();
                }
            }
        });
    }).response
}
