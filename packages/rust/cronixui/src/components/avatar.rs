//! Avatar component

pub struct Avatar {
    pub initials: String,
    pub size: AvatarSize,
}

#[derive(Clone, Copy)]
pub enum AvatarSize {
    SM,
    MD,
    LG,
    XL,
}

impl Avatar {
    pub fn new(initials: impl Into<String>) -> Self {
        Self {
            initials: initials.into(),
            size: AvatarSize::MD,
        }
    }

    pub fn size(mut self, size: AvatarSize) -> Self {
        self.size = size;
        self
    }
}
