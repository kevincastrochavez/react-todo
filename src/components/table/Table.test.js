import React from 'react';
import { render } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table';

describe('Table', () => {
  test('renders table components', () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Row 1 Cell 1</TableCell>
            <TableCell>Row 1 Cell 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2 Cell 1</TableCell>
            <TableCell>Row 2 Cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();

    const tableHeaders = container.querySelectorAll('thead');
    expect(tableHeaders).toHaveLength(1);

    const tableBodies = container.querySelectorAll('tbody');
    expect(tableBodies).toHaveLength(1);

    const tableRows = container.querySelectorAll('tr');
    expect(tableRows).toHaveLength(3);

    const tableCells = container.querySelectorAll('td');
    expect(tableCells).toHaveLength(4);
  });
});
