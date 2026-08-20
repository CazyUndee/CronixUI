import * as React from 'react';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
  expanded?: boolean;
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onExpand?: (id: string, expanded: boolean) => void;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedId?: string;
  onSelect?: (id: string) => void;
  onExpand?: (id: string, expanded: boolean) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({ node, level, selectedId, onSelect, onExpand }) => {
  const [expanded, setExpanded] = React.useState(node.expanded ?? true);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    onExpand?.(node.id, next);
  };

  return (
    <div className="cn-tree-node">
      <div
        className={`cn-tree-node-content ${node.id === selectedId ? 'cn-tree-node-selected' : ''}`}
        style={{ paddingLeft: level * 20 }}
        onClick={() => onSelect?.(node.id)}
      >
        {hasChildren ? (
          <span className="cn-tree-toggle" onClick={(e) => { e.stopPropagation(); handleToggle(); }}>
            {expanded ? '▼' : '▶'}
          </span>
        ) : (
          <span className="cn-tree-spacer" />
        )}
        {node.icon && <span className="cn-tree-icon">{node.icon}</span>}
        <span className="cn-tree-label">{node.label}</span>
      </div>
      {hasChildren && expanded && (
        <div className="cn-tree-children">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onExpand={onExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({ nodes, selectedId, onSelect, onExpand, className = '', ...props }) => {
  return (
    <div className={`cn-treeview ${className}`.trim()} role="tree" {...props}>
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
          onExpand={onExpand}
        />
      ))}
    </div>
  );
};

TreeView.displayName = 'TreeView';
export default TreeView;
