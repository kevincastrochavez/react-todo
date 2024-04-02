/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  CaretSortIcon,
  ChevronRightIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

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

  display: flex;
  align-items: center;

  & svg {
    margin-right: 8px;
  }
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='pl-0'
        >
          Name
          <CaretSortIcon className='h-4 w-4' />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='pl-0'
        >
          Deadline
          <CaretSortIcon className='h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateFormatted = formatDistance(row.original.deadline, new Date());
      return (
        <span css={deadlineCellCSS}>
          <StopwatchIcon className='h-4 w-4' /> {dateFormatted}
        </span>
      );
    },
  },
  {
    id: 'show',
    cell: ({ row }) => (
      <Link to={row.original.id}>
        <Button variant='ghost' size='icon'>
          <ChevronRightIcon className='h-5 w-5' />
        </Button>
      </Link>
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='pl-0'
        >
          Name
          <CaretSortIcon className='h-4 w-4' />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='pl-0'
        >
          Deadline
          <CaretSortIcon className='h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateFormatted = formatDistance(row.original.deadline, new Date());
      return (
        <span css={deadlineCellCSS}>
          <StopwatchIcon className='h-4 w-4' /> {dateFormatted}
        </span>
      );
    },
  },
  {
    id: 'show',
    cell: ({ row }) => (
      <Link to={row.original.id}>
        <Button variant='ghost' size='icon'>
          <ChevronRightIcon className='h-5 w-5' />
        </Button>
      </Link>
    ),
  },
];
