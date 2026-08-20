//! ColorPicker component

use egui::Color32;

/// Color picker with preset swatches.
pub struct ColorPicker {
    pub color: Color32,
    pub presets: Vec<Color32>,
}

impl ColorPicker {
    pub fn new() -> Self {
        Self {
            color: Color32::from_rgb(107, 35, 35),
            presets: vec![
                Color32::from_rgb(107, 35, 35),
                Color32::from_rgb(139, 58, 58),
                Color32::from_rgb(201, 122, 122),
                Color32::from_rgb(26, 26, 26),
                Color32::from_rgb(42, 42, 42),
                Color32::from_rgb(255, 255, 255),
            ],
        }
    }

    pub fn set_color(&mut self, color: Color32) {
        self.color = color;
    }

    pub fn get_color(&self) -> Color32 {
        self.color
    }
}

impl Default for ColorPicker {
    fn default() -> Self {
        Self::new()
    }
}
