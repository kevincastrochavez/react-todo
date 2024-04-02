/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChevronLeftIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { useSetTodosForms, useTodos } from '../../components/TodosProvider';
import TodoDetails from '../../components/todoDetails/TodoDetails';
import EditTodo from '../../components/editTodo/EditTodo';
import DeleteTodo from '../../components/deleteTodo/DeleteTodo';

const todoPageContainerCss = css`
  padding: 30px 20px;
  max-width: 1024px;
  margin: auto;
`;

const backButtonCss = css`
  margin-bottom: 20px;
  background-color: #767474;
`;

const buttonContainerCss = css`
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    justify-content: end;
    flex-direction: row;
    gap: 20px;
  }
`;

/**
 * Displays the Todo details page for a specific todo
 * @returns {JSX.Element}
 */
function TodoDetailsPage() {
  const todoId = window.location.pathname.split('/').pop();
  const { todos } = useTodos();
  const todoObj = todos.find((todo) => todo.id === todoId);

  const { setIsEditFormOpen, setIsDeleteFormOpen } = useSetTodosForms();

  return (
    <main css={todoPageContainerCss}>
      <Link to={'/'}>
        <Button css={backButtonCss}>
          <ChevronLeftIcon className='mr-2 h-5 w-5' /> Back to All
        </Button>
      </Link>
      <h1>Todo Details</h1>

      <TodoDetails {...todoObj} />
      <EditTodo {...todoObj} />
      <DeleteTodo id={todoObj.id} />

      <div css={buttonContainerCss}>
        <Button
          className='mt-8 w-full sm:w-fit'
          onClick={() => setIsEditFormOpen(true)}
        >
          <Pencil2Icon className='mr-2 h-5 w-5' />
          Edit
        </Button>

        <Button
          variant='destructive'
          className='mt-4 sm:mt-8 w-full sm:w-fit'
          onClick={() => setIsDeleteFormOpen(true)}
        >
          <TrashIcon className='mr-2 h-5 w-5' />
          Delete
        </Button>
      </div>
    </main>
  );
}

export default TodoDetailsPage;
