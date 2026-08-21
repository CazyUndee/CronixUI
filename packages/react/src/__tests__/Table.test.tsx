import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/Table';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
];

const data = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
];

describe('Table', () => {
  it('renders headers', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Table columns={columns} data={data} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
