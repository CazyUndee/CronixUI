//! Spinner component

use egui::{Color32, Ui};

use crate::colors::ACCENT;

pub fn spinner(ui: &mut Ui, size: f32) {
    ui.add(egui::Spinner::new().size(size).color(ACCENT));
}

pub fn spinner_sm(ui: &mut Ui) {
    spinner(ui, 16.0);
}

pub fn spinner_md(ui: &mut Ui) {
    spinner(ui, 24.0);
}

pub fn spinner_lg(ui: &mut Ui) {
    spinner(ui, 40.0);
}
