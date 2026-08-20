//! Container layout component.

use egui::Ui;
use crate::colors::*;
use crate::tokens::*;

/// Render content in a styled container with optional background and border.
pub struct ContainerConfig {
    pub background: Option<egui::Color32>,
    pub border: bool,
    pub padding: f32,
    pub rounding: f32,
}

impl Default for ContainerConfig {
    fn default() -> Self {
        Self {
            background: Some(SURFACE),
            border: true,
            padding: 16.0,
            rounding: RADIUS,
        }
    }
}

/// Render a container widget.
pub fn container(ui: &mut Ui, config: &ContainerConfig, add_contents: impl FnOnce(&mut Ui)) {
    let mut frame = egui::Frame::default()
        .inner_margin(egui::Margin::same(config.padding))
        .rounding(config.rounding);

    if let Some(bg) = config.background {
        frame = frame.fill(bg);
    }

    if config.border {
        frame = frame.stroke(egui::Stroke::new(1.0, BORDER));
    }

    frame.show(ui, |ui| {
        add_contents(ui);
    });
}
