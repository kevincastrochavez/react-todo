/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '../../components/button/button';

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

/**
 * Displays the Todos page, which contains a list of todos separated by status
 * @returns {JSX.Element}
 */
function TodosPage() {
  return (
    <div css={todoPageContainerCSS}>
      <header css={headerContainerCSS}>
        <h1>All Todos</h1>
        <Button>
          <PlusIcon className='mr-2 h-4 w-4' /> Add Todo
        </Button>
      </header>
      <main></main>
    </div>
  );
}

export default TodosPage;
