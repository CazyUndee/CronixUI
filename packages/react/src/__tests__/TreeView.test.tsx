import { render, screen, fireEvent } from '@testing-library/react';
import { TreeView, TreeNode } from '../components/TreeView';

const sampleNodes: TreeNode[] = [
  {
    id: '1',
    label: 'Root 1',
    children: [
      { id: '1-1', label: 'Child 1-1' },
      { id: '1-2', label: 'Child 1-2', children: [{ id: '1-2-1', label: 'Grandchild 1-2-1' }] },
    ],
  },
  { id: '2', label: 'Root 2' },
];

describe('TreeView Component', () => {
  test('renders all nodes', () => {
    render(<TreeView nodes={sampleNodes} />);
    expect(screen.getByText('Root 1')).toBeInTheDocument();
    expect(screen.getByText('Root 2')).toBeInTheDocument();
    expect(screen.getByText('Child 1-1')).toBeInTheDocument();
    expect(screen.getByText('Child 1-2')).toBeInTheDocument();
    expect(screen.getByText('Grandchild 1-2-1')).toBeInTheDocument();
  });

  test('calls onSelect when node is clicked', () => {
    const onSelect = jest.fn();
    render(<TreeView nodes={sampleNodes} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Root 1'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  test('highlights selected node', () => {
    render(<TreeView nodes={sampleNodes} selectedId="1" />);
    const selectedNode = screen.getByText('Root 1').closest('.cn-tree-node-content');
    expect(selectedNode).toHaveClass('cn-tree-node-selected');
  });

  test('collapses children when toggle clicked', () => {
    render(<TreeView nodes={sampleNodes} />);
    const toggles = screen.getAllByText('▼');
    fireEvent.click(toggles[0]);
    expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();
  });

  test('has correct ARIA roles', () => {
    render(<TreeView nodes={sampleNodes} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
    const treeItems = screen.getAllByRole('treeitem');
    expect(treeItems.length).toBeGreaterThanOrEqual(2);
  });

  test('selected node has aria-selected', () => {
    render(<TreeView nodes={sampleNodes} selectedId="1" />);
    const selected = screen.getByText('Root 1').closest('[role="treeitem"]');
    expect(selected).toHaveAttribute('aria-selected', 'true');
  });

  test('keyboard Enter selects node', () => {
    const onSelect = jest.fn();
    render(<TreeView nodes={sampleNodes} onSelect={onSelect} />);
    const nodeContent = screen.getByText('Root 1');
    fireEvent.keyDown(nodeContent, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
