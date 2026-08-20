//! Stepper component

/// A single step in a Stepper.
pub struct StepperStep {
    pub label: String,
    pub description: Option<String>,
}

impl StepperStep {
    pub fn new(label: &str) -> Self {
        Self { label: label.to_string(), description: None }
    }

    pub fn with_description(label: &str, description: &str) -> Self {
        Self { label: label.to_string(), description: Some(description.to_string()) }
    }
}

/// Stepper widget showing numbered steps with completion.
///
/// ## Example
/// ```no_run
/// use cronixui::components::{Stepper, StepperStep};
///
/// let steps = vec![
///     StepperStep::new("Step 1"),
///     StepperStep::new("Step 2"),
///     StepperStep::new("Step 3"),
/// ];
/// let mut stepper = Stepper::new(steps);
/// stepper.set_current(1);
/// ```
pub struct Stepper {
    pub steps: Vec<StepperStep>,
    pub current: usize,
}

impl Stepper {
    pub fn new(steps: Vec<StepperStep>) -> Self {
        Self { steps, current: 0 }
    }

    pub fn set_current(&mut self, step: usize) {
        self.current = step.min(self.steps.len().saturating_sub(1));
    }

    pub fn get_current(&self) -> usize {
        self.current
    }

    /// Render the stepper as text.
    pub fn render_text(&self) -> String {
        self.steps.iter().enumerate().map(|(i, step)| {
            if i < self.current {
                format!("✓ {}", step.label)
            } else if i == self.current {
                format!("▶ {}", step.label)
            } else {
                format!("  {}", step.label)
            }
        }).collect::<Vec<_>>().join("\n")
    }
}

impl Default for Stepper {
    fn default() -> Self {
        Self::new(vec![])
    }
}
