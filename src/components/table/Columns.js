import { Checkbox } from '../checkbox/Checkbox';

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
