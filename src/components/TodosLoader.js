import React from 'react';

import TodosProvider from './TodosProvider';
import { getTodosFromLocalStorage } from './lib/utils';

/**
 * Loaders the whole application with information about the todos
 * @returns {JSX.Element}
 */

function TodosLoader({ children }) {
  const todosKey = 'todos';
  const todos = getTodosFromLocalStorage(todosKey);

  return <TodosProvider todos={todos}>{children}</TodosProvider>;
}

export default TodosLoader;
