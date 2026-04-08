//! Tabs component

use egui::Ui;

pub struct Tabs {
    pub active: usize,
}

impl Tabs {
    pub fn new() -> Self {
        Self { active: 0 }
    }

    pub fn set_active(&mut self, index: usize) {
        self.active = index;
    }

    pub fn active(&self) -> usize {
        self.active
    }

    pub fn show(&mut self, ui: &mut Ui, labels: &[&str]) {
        ui.horizontal(|ui| {
            for (i, label) in labels.iter().enumerate() {
                let is_active = i == self.active;
                let text = if is_active {
                    format!("▶ {}", label)
                } else {
                    label.to_string()
                };
                if ui.button(&text).clicked() {
                    self.active = i;
                }
            }
        });
    }
}

impl Default for Tabs {
    fn default() -> Self {
        Self::new()
    }
}
