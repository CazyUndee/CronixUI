//! Stat component for displaying numeric metrics.

use egui::Ui;
use crate::tokens::*;

/// Delta type for stat change indicators.
#[derive(Clone, Copy, PartialEq)]
pub enum DeltaType {
    Positive,
    Negative,
    Neutral,
}

/// Stat widget displaying a value with label and optional delta.
pub struct StatConfig {
    pub value: String,
    pub label: String,
    pub delta: String,
    pub delta_type: DeltaType,
}

impl Default for StatConfig {
    fn default() -> Self {
        Self {
            value: String::new(),
            label: String::new(),
            delta: String::new(),
            delta_type: DeltaType::Neutral,
        }
    }
}

/// Render a stat widget.
pub fn stat(ui: &mut Ui, config: &StatConfig) {
    ui.vertical(|ui| {
        ui.add_space(4.0);

        // Value
        ui.label(
            egui::RichText::new(&config.value)
                .size(28.0)
                .strong()
                .color(colors::text()),
        );

        // Label
        if !config.label.is_empty() {
            ui.label(
                egui::RichText::new(&config.label)
                    .size(12.0)
                    .color(colors::text_muted()),
            );
        }

        // Delta
        if !config.delta.is_empty() {
            let delta_color = match config.delta_type {
                DeltaType::Positive => colors::success(),
                DeltaType::Negative => colors::error(),
                DeltaType::Neutral => colors::text_muted(),
            };
            ui.label(
                egui::RichText::new(&config.delta)
                    .size(11.0)
                    .color(delta_color),
            );
        }

        ui.add_space(4.0);
    });
}
