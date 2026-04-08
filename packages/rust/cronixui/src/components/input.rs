//! Input component

use egui::{TextEdit, Ui};

use crate::tokens::*;

pub fn input(ui: &mut Ui, text: &mut String, placeholder: &str) -> egui::Response {
    ui.add(TextEdit::singleline(text).hint_text(placeholder).desired_width(f32::INFINITY))
}

pub fn textarea(ui: &mut Ui, text: &mut String, placeholder: &str) -> egui::Response {
    ui.add(TextEdit::multiline(text).hint_text(placeholder))
}

pub fn password(ui: &mut Ui, text: &mut String, placeholder: &str) -> egui::Response {
    ui.add(TextEdit::singleline(text).hint_text(placeholder).password(true))
}

pub fn search(ui: &mut Ui, text: &mut String) -> egui::Response {
    ui.add(TextEdit::singleline(text).hint_text("Search...").desired_width(f32::INFINITY))
}
