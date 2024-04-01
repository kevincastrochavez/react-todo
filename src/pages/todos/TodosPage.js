/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlusIcon } from '@radix-ui/react-icons';

import { useSetTodosForms, useTodos } from '../../components/TodosProvider';
import {
  pendingColumns,
  completedColumns,
} from '../../components/table/Columns';
import { DataTable } from '../../components/table/DataTable';
import AddTodo from '../../components/addTodo/AddTodo';
import { Button } from '../../components/button/Button';

const todoPageContainerCSS = css`
  padding: 30px 20px;
`;

const headerContainerCSS = css`
  display: grid;

  & button {
    justify-self: end;
  }
`;

const mainContainerCSS = css`
  margin-top: 30px;
  display: grid;
  gap: 30px;

  & h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

/**
 * Displays the Todos page, which contains a list of todos separated by status
 * @returns {JSX.Element}
 */
function TodosPage() {
  const { todos } = useTodos();
  const { setIsAddFormOpen } = useSetTodosForms();

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div css={todoPageContainerCSS}>
      <header css={headerContainerCSS}>
        <h1>All Todos</h1>
        <Button onClick={() => setIsAddFormOpen(true)}>
          <PlusIcon className='mr-2 h-5 w-5' /> Add Todo
        </Button>
        <AddTodo />
      </header>
      <main css={mainContainerCSS}>
        <section>
          <h2>Pending</h2>
          <DataTable
            key='1'
            columns={pendingColumns}
            data={pendingTodos}
            emptyTodoText='No Todos are pending at the time'
            emptyTodoButton='Add Todo'
          />
        </section>
        <section>
          <h2>Completed</h2>
          <DataTable
            key='2'
            columns={completedColumns}
            data={completedTodos}
            emptyTodoText='No Todos are completed yet. Add one and complete it!'
          />
        </section>
      </main>
    </div>
  );
}

export default TodosPage;
