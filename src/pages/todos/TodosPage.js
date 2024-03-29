/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const mainContainerCSS = css`
  padding: 30px 20px;
`;

/**
 * Displays the Todos page, which contains a list of todos separated by status
 * @returns {JSX.Element}
 */
function TodosPage() {
  return (
    <main css={mainContainerCSS}>
      <h1>All Todos</h1>
    </main>
  );
}

export default TodosPage;
