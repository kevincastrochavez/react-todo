import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DataTable } from './DataTable';

describe('DataTable', () => {
  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Age', accessorKey: 'age' },
  ];

  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 35 },
  ];

  test('renders table with data', () => {
    const { getByText } = render(
      <DataTable
        columns={columns}
        data={data}
        emptyTodoText='No data'
        emptyTodoButton='Add'
      />
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();
    expect(getByText('Alice')).toBeInTheDocument();
    expect(getByText('Bob')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
    expect(getByText('35')).toBeInTheDocument();
  });

  test('renders table with empty state', () => {
    const { getByText } = render(
      <DataTable
        columns={columns}
        data={[]}
        emptyTodoText='No data'
        emptyTodoButton='Add'
      />
    );

    expect(getByText('No data')).toBeInTheDocument();
    expect(getByText('Add')).toBeInTheDocument();
  });
});
