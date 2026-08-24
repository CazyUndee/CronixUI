//! AI-focused components for building chat interfaces and AI-powered UIs.

use egui::{self, Color32, RichText, Ui, Rounding};
use crate::colors::Colors;
use crate::tokens::*;

/// Represents a chat message role.
#[derive(Debug, Clone, PartialEq)]
pub enum MessageRole {
    User,
    Assistant,
    System,
}

/// A single AI chat message.
#[derive(Debug, Clone)]
pub struct ChatMessage {
    pub id: String,
    pub role: MessageRole,
    pub content: String,
    pub timestamp: Option<String>,
    pub status: Option<String>,
}

impl ChatMessage {
    pub fn user(content: impl Into<String>) -> Self {
        Self {
            id: format!("msg_{}", js_sys::Date::now() as u64),
            role: MessageRole::User,
            content: content.into(),
            timestamp: None,
            status: None,
        }
    }

    pub fn assistant(content: impl Into<String>) -> Self {
        Self {
            id: format!("msg_{}", js_sys::Date::now() as u64),
            role: MessageRole::Assistant,
            content: content.into(),
            timestamp: None,
            status: None,
        }
    }
}

/// AI connection status.
#[derive(Debug, Clone, PartialEq)]
pub enum AIStatusType {
    Connected,
    Disconnected,
    Connecting,
    Error,
    RateLimited,
    Idle,
}

/// Renders an AI status indicator.
pub fn ai_status(ui: &mut Ui, status: &AIStatusType, latency: Option<u32>, model: Option<&str>) {
    let colors = Colors::default();
    
    let (label, color) = match status {
        AIStatusType::Connected => ("● Connected", colors.success_text),
        AIStatusType::Disconnected => ("○ Disconnected", colors.error_text),
        AIStatusType::Connecting => ("◐ Connecting...", colors.warning_text),
        AIStatusType::Error => ("✕ Error", colors.error_text),
        AIStatusType::RateLimited => ("⏱ Rate limited", colors.warning_text),
        AIStatusType::Idle => ("◌ Idle", colors.text_muted),
    };

    let frame = egui::Frame::none()
        .fill(colors.surface_2)
        .stroke(egui::Stroke::new(1.0, colors.border))
        .rounding(Rounding::same(RADIUS))
        .inner_margin(egui::Margin::symmetric(SPACE_3, SPACE_2));

    frame.show(ui, |ui| {
        ui.horizontal(|ui| {
            ui.label(RichText::new(label).color(color).size(FONT_SIZE_SM));

            if let Some(lat) = latency {
                ui.label(
                    RichText::new(format!("{}ms", lat))
                        .color(colors.text_muted)
                        .size(FONT_SIZE_SM),
                );
            }

            if let Some(m) = model {
                ui.label(
                    RichText::new(format!("| {}", m))
                        .color(colors.text_muted)
                        .size(FONT_SIZE_SM),
                );
            }
        });
    });
}

/// Renders a token counter with optional progress bar.
pub fn token_counter(ui: &mut Ui, count: usize, max_tokens: Option<usize>) {
    let colors = Colors::default();
    
    let format_count = |n: usize| -> String {
        if n >= 1_000_000 {
            format!("{:.1}M", n as f64 / 1_000_000.0)
        } else if n >= 1_000 {
            format!("{:.1}k", n as f64 / 1_000.0)
        } else {
            n.to_string()
        }
    };

    ui.horizontal(|ui| {
        ui.label(RichText::new("Tokens").color(colors.text_muted).size(FONT_SIZE_SM));
        ui.label(
            RichText::new(format_count(count))
                .color(colors.text)
                .strong()
                .size(FONT_SIZE_SM),
        );
        if let Some(max) = max_tokens {
            ui.label(
                RichText::new(format!("/ {}", format_count(max)))
                    .color(colors.text_dim)
                    .size(FONT_SIZE_XS),
            );
        }
    });

    if let Some(max) = max_tokens {
        let progress = (count as f32 / max as f32).clamp(0.0, 1.0);
        let bar_color = if progress >= 0.9 {
            colors.error
        } else if progress >= 0.7 {
            colors.warning
        } else {
            colors.accent
        };

        ui.add(
            egui::ProgressBar::new(progress)
                .fill(bar_color),
        );
    }
}

/// Renders a code block with optional syntax highlighting and line numbers.
pub fn code_block(ui: &mut Ui, code: &str, language: Option<&str>) {
    let colors = Colors::default();
    
    let frame = egui::Frame::none()
        .fill(Color32::from_rgb(30, 30, 30))
        .stroke(egui::Stroke::new(1.0, Color32::from_rgb(64, 64, 64)))
        .rounding(Rounding::same(RADIUS))
        .inner_margin(egui::Margin::symmetric(SPACE_4, SPACE_3));

    frame.show(ui, |ui| {
        // Header
        ui.horizontal(|ui| {
            if let Some(lang) = language {
                ui.label(
                    RichText::new(lang.to_uppercase())
                        .color(colors.text_muted)
                        .size(FONT_SIZE_XS)
                        .strong(),
                );
            }
            ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                if ui.small_button("Copy").clicked() {
                    ui.output_mut(|o| o.copied_text = code.to_string());
                }
            });
        });

        ui.separator();

        // Code content
        egui::ScrollArea::horizontal().show(ui, |ui| {
            ui.horizontal(|ui| {
                // Line numbers
                let lines: Vec<&str> = code.lines().collect();
                let line_numbers: String = (1..=lines.len())
                    .map(|i| format!("{:>4} ", i))
                    .collect::<Vec<_>>()
                    .join("\n");

                ui.label(
                    RichText::new(line_numbers)
                        .color(Color32::from_rgb(133, 133, 133))
                        .monospace()
                        .size(FONT_SIZE_BASE),
                );

                ui.separator();

                // Code
                ui.label(
                    RichText::new(code)
                        .color(Color32::from_rgb(212, 212, 212))
                        .monospace()
                        .size(FONT_SIZE_BASE),
                );
            });
        });
    });
}

/// Renders a message bubble.
pub fn message_bubble(ui: &mut Ui, message: &ChatMessage) {
    let colors = Colors::default();
    let is_user = message.role == MessageRole::User;
    
    let bg_color = if is_user { colors.accent } else { colors.surface_2 };
    let text_color = colors.text;
    let align = if is_user {
        egui::Align::RIGHT
    } else {
        egui::Align::LEFT
    };

    let frame = egui::Frame::none()
        .fill(bg_color)
        .rounding(Rounding::same(RADIUS_XL))
        .inner_margin(egui::Margin::symmetric(SPACE_4, SPACE_3));

    ui.with_layout(egui::Layout::top_down(align), |ui| {
        // Role label
        let role_text = match message.role {
            MessageRole::User => "You",
            MessageRole::Assistant => "Assistant",
            MessageRole::System => "System",
        };
        ui.label(
            RichText::new(role_text)
                .color(colors.text_muted)
                .size(FONT_SIZE_XS),
        );

        // Message content
        frame.show(ui, |ui| {
            ui.label(RichText::new(&message.content).color(text_color).size(FONT_SIZE_MD));
        });

        // Status indicator
        if let Some(status) = &message.status {
            let status_icon = match status.as_str() {
                "sending" => "⏳",
                "sent" => "✓",
                "delivered" => "✓✓",
                "error" => "❌",
                _ => "",
            };
            ui.label(
                RichText::new(status_icon)
                    .color(colors.text_muted)
                    .size(FONT_SIZE_XS),
            );
        }
    });
}

/// Renders a prompt input field.
pub fn prompt_input(ui: &mut Ui, text: &mut String, placeholder: &str, on_submit: impl FnOnce()) {
    let colors = Colors::default();
    
    let frame = egui::Frame::none()
        .fill(colors.surface)
        .stroke(egui::Stroke::new(1.0, colors.border))
        .rounding(Rounding::same(RADIUS_LG))
        .inner_margin(egui::Margin::symmetric(SPACE_3, SPACE_2));

    frame.show(ui, |ui| {
        ui.horizontal(|ui| {
            let response = ui.add(
                egui::TextEdit::singleline(text)
                    .hint_text(placeholder)
                    .desired_width(ui.available_width() - 40.0),
            );

            if (ui.small_button("↑").clicked() || response.lost_focus() && ui.input(|i| i.key_pressed(egui::Key::Enter))) && !text.trim().is_empty() {
                on_submit();
            }
        });
    });
}

/// Renders a complete chat interface.
pub fn chat_interface(ui: &mut Ui, messages: &[ChatMessage], input_text: &mut String) -> bool {
    let mut submitted = false;
    
    let colors = Colors::default();
    let frame = egui::Frame::none()
        .fill(colors.bg)
        .stroke(egui::Stroke::new(1.0, colors.border))
        .rounding(Rounding::same(RADIUS_LG));

    frame.show(ui, |ui| {
        // Messages area
        egui::ScrollArea::vertical()
            .auto_shrink([false, false])
            .stick_to_bottom(true)
            .show(ui, |ui| {
                ui.vertical(|ui| {
                    for message in messages {
                        message_bubble(ui, message);
                        ui.add_space(SPACE_2);
                    }
                });
            });

        ui.separator();

        // Input area
        ui.horizontal(|ui| {
            let response = ui.add(
                egui::TextEdit::singleline(input_text)
                    .hint_text("Type a message...")
                    .desired_width(ui.available_width() - 40.0),
            );

            if (ui.button("↑").clicked() || response.lost_focus() && ui.input(|i| i.key_pressed(egui::Key::Enter))) && !input_text.trim().is_empty() {
                submitted = true;
            }
        });
    });

    submitted
}
