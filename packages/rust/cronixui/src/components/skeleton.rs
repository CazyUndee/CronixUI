//! Skeleton loading placeholder

use egui::Color32;

use crate::colors::*;

pub struct Skeleton {
    pub width: f32,
    pub height: f32,
    pub variant: SkeletonVariant,
}

#[derive(Clone, Copy)]
pub enum SkeletonVariant {
    Text,
    Title,
    Avatar,
}

impl Skeleton {
    pub fn text() -> Self {
        Self { width: 100.0, height: 14.0, variant: SkeletonVariant::Text }
    }

    pub fn title() -> Self {
        Self { width: 150.0, height: 20.0, variant: SkeletonVariant::Title }
    }

    pub fn avatar() -> Self {
        Self { width: 40.0, height: 40.0, variant: SkeletonVariant::Avatar }
    }

    pub fn width(mut self, width: f32) -> Self {
        self.width = width;
        self
    }
}
