//! Timeline component

/// Timeline item variant.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TimelineVariant {
    Default,
    Success,
    Warning,
    Error,
    Info,
}

/// A single item in a Timeline.
pub struct TimelineItem {
    pub title: String,
    pub description: Option<String>,
    pub timestamp: Option<String>,
    pub variant: TimelineVariant,
}

impl TimelineItem {
    pub fn new(title: &str) -> Self {
        Self { title: title.to_string(), description: None, timestamp: None, variant: TimelineVariant::Default }
    }

    pub fn with_description(mut self, desc: &str) -> Self {
        self.description = Some(desc.to_string());
        self
    }

    pub fn with_timestamp(mut self, ts: &str) -> Self {
        self.timestamp = Some(ts.to_string());
        self
    }

    pub fn with_variant(mut self, v: TimelineVariant) -> Self {
        self.variant = v;
        self
    }
}

/// Timeline widget showing events in order.
pub struct Timeline {
    pub items: Vec<TimelineItem>,
}

impl Timeline {
    pub fn new(items: Vec<TimelineItem>) -> Self {
        Self { items }
    }

    /// Render as text.
    pub fn render_text(&self) -> String {
        self.items.iter().enumerate().map(|(i, item)| {
            let dot = match item.variant {
                TimelineVariant::Success => "●",
                TimelineVariant::Warning => "●",
                TimelineVariant::Error => "●",
                TimelineVariant::Info => "●",
                TimelineVariant::Default => "○",
            };
            let ts = item.timestamp.as_deref().unwrap_or("");
            let desc = item.description.as_deref().unwrap_or("");
            format!("{} {} {} {}", dot, item.title, ts, desc)
        }).collect::<Vec<_>>().join("\n")
    }
}

impl Default for Timeline {
    fn default() -> Self {
        Self::new(vec![])
    }
}
