/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChevronLeftIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { useSetTodosForms, useTodos } from '../../components/TodosProvider';
import TodoDetails from '../../components/todoDetails/TodoDetails';
import EditTodo from '../../components/editTodo/EditTodo';
import DeleteTodo from '../../components/deleteTodo/DeleteTodo';

const todoPageContainerCSS = css`
  padding: 30px 20px;
`;

const backButtonCSS = css`
  margin-bottom: 20px;
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
    <main css={todoPageContainerCSS}>
      <Link to={'/'}>
        <Button css={backButtonCSS}>
          <ChevronLeftIcon className='mr-2 h-5 w-5' /> Back to All
        </Button>
      </Link>
      <h1>Todo Details</h1>

      <TodoDetails {...todoObj} />
      <EditTodo {...todoObj} />
      <DeleteTodo id={todoObj.id} />

      <Button className='mt-8 w-full' onClick={() => setIsEditFormOpen(true)}>
        <Pencil2Icon className='mr-2 h-5 w-5' />
        Edit
      </Button>

      <Button
        variant='destructive'
        className='mt-4 w-full'
        onClick={() => setIsDeleteFormOpen(true)}
      >
        <TrashIcon className='mr-2 h-5 w-5' />
        Delete
      </Button>
    </main>
  );
}

export default TodoDetailsPage;
