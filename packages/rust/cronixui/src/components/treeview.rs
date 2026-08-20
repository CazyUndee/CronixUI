//! TreeView component

/// A node in the tree.
pub struct TreeNode {
    pub id: String,
    pub label: String,
    pub children: Vec<TreeNode>,
    pub expanded: bool,
}

impl TreeNode {
    pub fn new(id: &str, label: &str) -> Self {
        Self { id: id.to_string(), label: label.to_string(), children: vec![], expanded: true }
    }

    pub fn with_children(mut self, children: Vec<TreeNode>) -> Self {
        self.children = children;
        self
    }
}

/// TreeView widget for hierarchical data.
pub struct TreeView {
    pub nodes: Vec<TreeNode>,
    pub selected: Option<String>,
}

impl TreeView {
    pub fn new(nodes: Vec<TreeNode>) -> Self {
        Self { nodes, selected: None }
    }

    pub fn select(&mut self, id: &str) {
        self.selected = Some(id.to_string());
    }
}

impl Default for TreeView {
    fn default() -> Self {
        Self::new(vec![])
    }
}
