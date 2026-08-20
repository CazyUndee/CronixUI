//! Typography components for headings and styled text.

use egui::Ui;
use crate::tokens::*;

/// Render an H1 heading.
pub fn h1(ui: &mut Ui, text: &str) {
    ui.label(
        egui::RichText::new(text)
            .size(32.0)
            .strong()
            .color(colors::text()),
    );
}

/// Render an H2 heading.
pub fn h2(ui: &mut Ui, text: &str) {
    ui.label(
        egui::RichText::new(text)
            .size(24.0)
            .strong()
            .color(colors::text()),
    );
}

/// Render an H3 heading.
pub fn h3(ui: &mut Ui, text: &str) {
    ui.label(
        egui::RichText::new(text)
            .size(20.0)
            .strong()
            .color(colors::text()),
    );
}

/// Render an H4 heading.
pub fn h4(ui: &mut Ui, text: &str) {
    ui.label(
        egui::RichText::new(text)
            .size(16.0)
            .strong()
            .color(colors::text()),
    );
}

/// Render an H5 heading.
pub fn h5(ui: &mut Ui, text: &str) {
    ui.label(
        egui::RichText::new(text)
            .size(14.0)
            .strong()
            .color(colors::text()),
    );
}

/// Render an H6 heading.
pub fn h6(ui: &mut Ui, text: &str) {
    ui.label(
        egui::RichText::new(text)
            .size(12.0)
            .strong()
            .color(colors::text()),
    );
}

/// Text variant.
#[derive(Clone, Copy, PartialEq)]
pub enum TextVariant {
    Default,
    Muted,
    Dim,
    Accent,
    Mono,
}

/// Render styled text.
pub fn text(ui: &mut Ui, text: &str, variant: TextVariant, size: f32) {
    let color = match variant {
        TextVariant::Default => colors::text(),
        TextVariant::Muted => colors::text_muted(),
        TextVariant::Dim => colors::text_dim(),
        TextVariant::Accent => colors::accent(),
        TextVariant::Mono => colors::text(),
    };

    let font_id = egui::FontId::new(size, egui::FontFamily::Proportional);

    ui.label(
        egui::RichText::new(text)
            .font(font_id)
            .color(color),
    );
}
