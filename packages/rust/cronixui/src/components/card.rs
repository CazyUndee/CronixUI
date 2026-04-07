//! Card component

use egui::*;
use crate::{colors::*, tokens::*};

/// Card component
pub struct Card {
    title: Option<String>,
    subtitle: Option<String>,
    clickable: bool,
}

impl Card {
    pub fn new() -> Self {
        Self {
            title: None,
            subtitle: None,
            clickable: false,
        }
    }
    
    pub fn title(mut self, title: impl Into<String>) -> Self {
        self.title = Some(title.into());
        self
    }
    
    pub fn subtitle(mut self, subtitle: impl Into<String>) -> Self {
        self.subtitle = Some(subtitle.into());
        self
    }
    
    pub fn clickable(mut self, clickable: bool) -> Self {
        self.clickable = clickable;
        self
    }
    
    pub fn show<R>(&self, ui: &mut Ui, add_contents: impl FnOnce(&mut Ui) -> R) -> Response {
        let colors = Colors::default();
        
        egui::Frame::none()
            .fill(colors.surface)
            .stroke(Stroke::new(1.0, colors.border))
            .rounding(Rounding::same(RADIUS_LG))
            .inner_margin(SPACE_5)
            .show(ui, |ui| {
                if let Some(title) = &self.title {
                    ui.horizontal(|ui| {
                        ui.label(
                            RichText::new(title)
                                .size(FONT_SIZE_MD)
                                .color(colors.text)
                        );
                    });
                    
                    if let Some(subtitle) = &self.subtitle {
                        ui.label(
                            RichText::new(subtitle)
                                .size(FONT_SIZE_SM)
                                .color(colors.text_muted)
                        );
                    }
                    
                    ui.add_space(SPACE_4);
                }
                
                add_contents(ui)
            })
            .response
    }
}
