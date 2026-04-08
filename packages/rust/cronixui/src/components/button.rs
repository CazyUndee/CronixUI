//! Button component

use egui::{Color32, Ui};

use crate::{colors::*, tokens::*};

pub enum ButtonVariant {
    Default,
    Primary,
    Ghost,
    Outline,
    Danger,
    Success,
}

pub trait ButtonExt {
    fn button_primary(&mut self, text: &str) -> egui::Response;
    fn button_danger(&mut self, text: &str) -> egui::Response;
    fn button_success(&mut self, text: &str) -> egui::Response;
    fn button_ghost(&mut self, text: &str) -> egui::Response;
    fn button_outline(&mut self, text: &str) -> egui::Response;
}

impl ButtonExt for Ui {
    fn button_primary(&mut self, text: &str) -> egui::Response {
        self.add(egui::Button::new(text).fill(ACCENT))
    }

    fn button_danger(&mut self, text: &str) -> egui::Response {
        self.add(egui::Button::new(text).fill(ERROR))
    }

    fn button_success(&mut self, text: &str) -> egui::Response {
        self.add(egui::Button::new(text).fill(SUCCESS))
    }

    fn button_ghost(&mut self, text: &str) -> egui::Response {
        self.add(egui::Button::new(text).fill(Color32::TRANSPARENT))
    }

    fn button_outline(&mut self, text: &str) -> egui::Response {
        self.add(egui::Button::new(text)
            .fill(Color32::TRANSPARENT)
            .stroke(egui::Stroke::new(1.0, BORDER)))
    }
}

pub fn button(ui: &mut Ui, text: &str) -> egui::Response {
    ui.button(text)
}

pub fn button_primary(ui: &mut Ui, text: &str) -> egui::Response {
    ui.button_primary(text)
}

pub fn button_danger(ui: &mut Ui, text: &str) -> egui::Response {
    ui.button_danger(text)
}

pub fn button_success(ui: &mut Ui, text: &str) -> egui::Response {
    ui.button_success(text)
}

pub fn button_ghost(ui: &mut Ui, text: &str) -> egui::Response {
    ui.button_ghost(text)
}

pub fn button_outline(ui: &mut Ui, text: &str) -> egui::Response {
    ui.button_outline(text)
}
