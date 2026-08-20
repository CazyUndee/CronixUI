//! Sidebar layout component.

use egui::Ui;
use crate::colors::*;

/// Render a sidebar with navigation items.
pub fn sidebar(ui: &mut Ui, width: f32, items: &[&str], active: usize, on_select: impl Fn(usize)) {
    let frame = egui::Frame::default()
        .fill(SURFACE)
        .inner_margin(egui::Margin::symmetric(0.0, 8.0))
        .stroke(egui::Stroke::new(1.0, BORDER));

    frame.show(ui, |ui| {
        ui.set_width(width);
        for (i, item) in items.iter().enumerate() {
            let is_active = i == active;
            let text_color = if is_active { ACCENT } else { TEXT_MUTED };

            let btn = ui.add(
                egui::Button::new(
                    egui::RichText::new(*item)
                        .size(14.0)
                        .color(text_color),
                )
                .fill(if is_active { SURFACE_3 } else { egui::Color32::TRANSPARENT })
                .rounding(6.0),
            );

            if btn.clicked() {
                on_select(i);
            }
        }
    });
}
