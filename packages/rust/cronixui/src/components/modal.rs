//! Modal component

use egui::Ui;

pub struct Modal {
    pub open: bool,
}

impl Modal {
    pub fn new() -> Self {
        Self { open: false }
    }

    pub fn open(&mut self) {
        self.open = true;
    }

    pub fn close(&mut self) {
        self.open = false;
    }

    pub fn is_open(&self) -> bool {
        self.open
    }

    pub fn show<F: FnOnce(&mut Ui)>(&mut self, ui: &mut Ui, add_contents: F) {
        if self.open {
            egui::Area::new(egui::Id::new("modal"))
                .interactable(true)
                .show(ui.ctx(), |ui| {
                    add_contents(ui);
                });
        }
    }
}

impl Default for Modal {
    fn default() -> Self {
        Self::new()
    }
}
