import { mergeProps, For, createSignal } from 'solid-js';

function TreeNodeItem(props) {
  const merged = mergeProps({ level: 0, selectedId: '', onSelect: () => {}, onExpand: () => {} }, props);
  const [expanded, setExpanded] = createSignal(props.node.expanded ?? true);
  const hasChildren = () => props.node.children?.length > 0;

  return (
    <div class="cn-tree-node">
      <div
        class="cn-tree-node-content"
        classList={{ 'cn-tree-node-selected': props.node.id === merged.selectedId }}
        style={{ 'padding-left': `${merged.level * 20}px` }}
        onClick={() => merged.onSelect(props.node.id)}
      >
        {hasChildren() ? (
          <span class="cn-tree-toggle" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded()); }}>
            {expanded() ? '▼' : '▶'}
          </span>
        ) : (
          <span class="cn-tree-spacer" />
        )}
        <span class="cn-tree-label">{props.node.label}</span>
      </div>
      {hasChildren() && expanded() && (
        <div class="cn-tree-children">
          <For each={props.node.children}>
            {(child) => (
              <TreeNodeItem node={child} level={merged.level + 1} selectedId={merged.selectedId} onSelect={merged.onSelect} />
            )}
          </For>
        </div>
      )}
    </div>
  );
}

export function TreeView(props) {
  const merged = mergeProps({ nodes: [], selectedId: '', onSelect: () => {} }, props);

  return (
    <div class="cn-treeview" role="tree">
      <For each={merged.nodes}>
        {(node) => <TreeNodeItem node={node} level={0} selectedId={merged.selectedId} onSelect={merged.onSelect} />}
      </For>
    </div>
  );
}
