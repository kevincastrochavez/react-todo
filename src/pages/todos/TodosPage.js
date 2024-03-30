/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlusIcon } from '@radix-ui/react-icons';

import { columns } from '../../components/table/Columns';
import { Button } from '../../components/button/Button';
import { DataTable } from '../../components/table/DataTable';
import { useTodos } from '../../components/TodosProvider';

const todoPageContainerCSS = css`
  padding: 30px 20px;
`;

const headerContainerCSS = css`
  display: grid;

  & h1 {
    font-size: 40px;
    margin-bottom: 20px;
  }

  & button {
    justify-self: end;
  }
`;

const mainContainerCSS = css`
  margin-top: 30px;

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
  const { pendingTodos, completedTodos } = useTodos();

  return (
    <div css={todoPageContainerCSS}>
      <header css={headerContainerCSS}>
        <h1>All Todos</h1>
        <Button>
          <PlusIcon className='mr-2 h-5 w-5' /> Add Todo
        </Button>
      </header>
      <main css={mainContainerCSS}>
        <h2>Pending</h2>
        <DataTable
          columns={columns}
          data={pendingTodos}
          emptyTodoText='No Todos are pending at the time'
          emptyTodoButton='Add Todo'
        />
        <h2>Completed</h2>
        <DataTable
          columns={columns}
          data={completedTodos}
          emptyTodoText='No Todos are completed yet. Add one and complete it!'
          emptyTodoButton='Add Todo'
        />
      </main>
    </div>
  );
}

export default TodosPage;
