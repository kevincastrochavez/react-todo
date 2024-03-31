import { useEffect, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';
import { useSetTodosForms } from '../TodosProvider';
import { Button } from '../button/Button';
import { useLocalStorage } from '../lib/utils';

/**
 * Displays the DataTable component which shows the data in a table
 * @param {[Object]} columns - columns for the table
 * @param {[Object]} data - data for the table rows
 * @param {String} emptyTodoText - text to display when there is no data on the pending todos
 * @returns {JSX} the DataTable component
 */
export function DataTable({ columns, data, emptyTodoText }) {
  const [rowSelection, setRowSelection] = useState({});
  const { setIsAddFormOpen } = useSetTodosForms();
  const todosKey = 'todos';
  const [todos] = useLocalStorage(todosKey);
  const [checkedTodos, setCheckedTodos] = useLocalStorage(todosKey, 'checked');

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  // Updating the todos when the row selection changes
  useEffect(() => {
    console.log(rowSelection);
    const rowIdSelected = Object.keys(rowSelection);
    if (rowIdSelected.length === 0) return;

    const todoId = rowIdSelected[0];
    const todoToMove = todos.find((todo) => todo.id === todoId);
    const restOfTodos = todos.filter((todo) => todo.id !== todoId);
    todoToMove.completed = !todoToMove.completed;

    const newTodos = [...restOfTodos, todoToMove];
    setCheckedTodos(newTodos);

    // Setting the row selection to empty so that it does not get selected again
    setRowSelection({});
  }, [rowSelection]);

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-32 text-center'>
                <p className='mt-4 mb-3'>{emptyTodoText}</p>
                <Button onClick={() => setIsAddFormOpen(true)}>
                  <PlusIcon className='mr-2 h-5 w-5' /> Add Todo
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
