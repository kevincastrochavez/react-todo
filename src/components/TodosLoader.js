import React from 'react';

import TodosProvider from './TodosProvider';

/**
 * Loaders the whole application with information about the todos
 * @returns {JSX.Element}
 */

function TodosLoader({ children }) {
  return <TodosProvider>{children}</TodosProvider>;
}

export default TodosLoader;
