import { Checkbox } from '../checkbox/Checkbox';

/**
 * Defines the columns for the table
 * @returns {JSX} the columns
 */
export const columns = [
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
