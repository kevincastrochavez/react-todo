/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  CheckIcon,
  Pencil1Icon,
  StopwatchIcon,
  TextAlignJustifyIcon,
} from '@radix-ui/react-icons';
import { formatDistance } from 'date-fns';

const todoDetailsCss = css`
  display: grid;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  padding: 30px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  & p {
    display: flex;
    color: #71717a;
    align-items: center;

    @media (min-width: 640px) {
      margin-bottom: 8px;
    }
  }

  & span {
    margin-left: 2px;
  }
`;

/**
 * Displays the Todo details page for a specific todo
 * @param {String} name - The name of the todo
 * @param {String} description - The description of the todo
 * @param {Date} deadline - The deadline of the todo
 * @param {Boolean} completed - Whether the todo is completed or not
 * @return {[Object]} The existing todos array.
 */
function TodoDetails({ name, description, deadline, completed }) {
  return (
    <div css={todoDetailsCss}>
      <div>
        <p>
          <Pencil1Icon className='mr-1 h-5 w-5' />
          Name
        </p>
        <span>{name}</span>
      </div>
      <div>
        <p>
          {' '}
          <TextAlignJustifyIcon className='mr-1 h-5 w-5' />
          Description
        </p>
        <span>{description}</span>
      </div>
      <div>
        <p>
          <StopwatchIcon className='mr-1 h-5 w-5' />
          Deadline
        </p>
        <span>{formatDistance(deadline, new Date())}</span>
      </div>
      <div>
        <p>
          <CheckIcon className='mr-1 h-5 w-5' />
          Completed
        </p>
        <span>{completed ? 'Yes' : 'No'}</span>
      </div>
    </div>
  );
}

export default TodoDetails;
