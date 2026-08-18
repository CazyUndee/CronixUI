//! CronixUI - A dark-themed UI toolkit for egui
//!
//! ## Example
//!
//! ```rust
//! use cronixui::{CronixUI, Colors, components::*};
//!
//! // In your egui app
//! fn update(&mut self, ctx: &egui::Context) {
//!     CronixUI::apply_theme(ctx);
//!     
//!     egui::CentralPanel::default().show(ctx, |ui| {
//!         // Use components
//!         if ui.button_primary("Click me").clicked() {
//!             // handle click
//!         }
//!     });
//! }
//! ```

#[cfg(test)]
pub mod tests;

pub mod colors;
pub mod tokens;
pub mod components;

pub use colors::*;
pub use tokens::*;
pub use components::*;

use egui::{Color32, Vec2, Rounding, FontFamily};

/// Current version
pub const VERSION: &str = "1.0.6";

/// Apply CronixUI theme to egui context
pub fn apply_theme(ctx: &egui::Context) {
    let colors = Colors::default();
    
    let mut style = (*ctx.style()).clone();
    
    // Visuals
    style.visuals.window_fill = colors.bg;
    style.visuals.panel_fill = colors.bg;
    style.visuals.extreme_bg_color = colors.surface;
    style.visuals.faint_bg_color = colors.surface_2;
    style.visuals.code_bg_color = colors.surface_3;
    
    // Widget colors
    style.visuals.widgets.noninteractive.bg_fill = colors.surface;
    style.visuals.widgets.noninteractive.bg_stroke.color = colors.border;
    style.visuals.widgets.noninteractive.fg_stroke.color = colors.text;
    
    style.visuals.widgets.inactive.bg_fill = colors.surface_2;
    style.visuals.widgets.inactive.bg_stroke.color = colors.border;
    style.visuals.widgets.inactive.fg_stroke.color = colors.text;
    
    style.visuals.widgets.hovered.bg_fill = colors.surface_3;
    style.visuals.widgets.hovered.bg_stroke.color = colors.border_hover;
    style.visuals.widgets.hovered.fg_stroke.color = colors.text;
    
    style.visuals.widgets.active.bg_fill = colors.accent;
    style.visuals.widgets.active.bg_stroke.color = colors.accent;
    style.visuals.widgets.active.fg_stroke.color = colors.text;
    
    style.visuals.widgets.open.bg_fill = colors.surface_3;
    style.visuals.widgets.open.bg_stroke.color = colors.accent;
    
    // Selection
    style.visuals.selection.bg_fill = colors.accent;
    style.visuals.selection.stroke.color = colors.accent_text;
    
    // Hyperlink
    style.visuals.hyperlink_color = colors.accent_text;
    
    // Window rounding
    style.visuals.window_rounding = Rounding::same(RADIUS_LG);
    
    // Spacing
    style.spacing.button_padding = Vec2::new(SPACE_4, SPACE_2);
    style.spacing.item_spacing = Vec2::new(SPACE_2, SPACE_2);
    style.spacing.indent = SPACE_4;
    
    ctx.set_style(style);
}

// ButtonExt trait is defined in components::button and re-exported via components::*
