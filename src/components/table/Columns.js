/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { formatDistance } from 'date-fns';

import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import CheckboxWrapper from '../checkbox/CheckboxWrapper';

const cellContainerCSS = css`
  display: grid;

  & span:last-of-type {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #71717a;
  }
`;

const deadlineCellCSS = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
    cell: ({ row }) => {
      return (
        <div css={cellContainerCSS}>
          <span>{row.original.name}</span>
          <span>{row.original.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
    cell: ({ row }) => {
      const dateFormatted = formatDistance(row.original.deadline, new Date());
      return <span css={deadlineCellCSS}>{dateFormatted}</span>;
    },
  },
  {
    id: 'show',
    cell: () => (
      <Button variant='ghost' size='icon'>
        <ChevronRightIcon className='h-5 w-5' />
      </Button>
    ),
  },
];

/**
 * Defines the columns for the table in the completed todos
 * @returns {JSX} the columns
 */
export const completedColumns = [
  {
    id: 'select',
    cell: ({ row }) => <CheckboxWrapper row={row} />,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div css={cellContainerCSS}>
          <span>{row.original.name}</span>
          <span>{row.original.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
    cell: ({ row }) => {
      const dateFormatted = formatDistance(row.original.deadline, new Date());
      return <span css={deadlineCellCSS}>{dateFormatted}</span>;
    },
  },
  {
    id: 'show',
    cell: () => (
      <Button variant='ghost' size='icon'>
        <ChevronRightIcon className='h-5 w-5' />
      </Button>
    ),
  },
];
