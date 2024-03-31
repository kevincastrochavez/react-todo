import { Checkbox } from '../checkbox/Checkbox';

/**
 * Defines the columns for the table in the pending todos
 * @returns {JSX} the columns
 */
export const pendingColumns = [
  {
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
  },
];

/**
 * Defines the columns for the table in the completed todos
 * @returns {JSX} the columns
 */
export const completedColumns = [
  {
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        defaultChecked
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
  },
];
