import * as React from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  data: T[];
  sortable?: boolean;
  onSort?: (key: string) => void;
}

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns = [],
  data = [],
  sortable = false,
  onSort,
  className = '',
  ...props
}: TableProps<T>): React.ReactElement {
  const handleSort = (column: TableColumn<T>) => {
    if (!sortable || !column.sortable) return;
    onSort?.(column.key);
  };

  return (
    <div className={`cn-table-wrapper ${sortable ? 'cn-table-sortable' : ''} ${className}`.trim()} {...props}>
      <table className="cn-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                onClick={() => handleSort(col)}
                data-sort={col.key}
              >
                {col.header}
                {col.sortable && ' ↕'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';

export default Table;
