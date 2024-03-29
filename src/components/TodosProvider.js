import React, { createContext, useContext, useState } from 'react';

const TodosContext = createContext({});
const TodosUpdateContext = createContext({});

/**
 *  Provides whole application with information about the todos
 * @param {[React.ReactNode]|React.ReactNode} children - React children
 * @returns {JSX.Element}
 */
export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  console.log(todos);

  return (
    <TodosUpdateContext.Provider value={{ setTodos }}>
      <TodosContext.Provider value={{ todos }}>
        {children}
      </TodosContext.Provider>
    </TodosUpdateContext.Provider>
  );
}

/**
 * Returns the todos list
 *
 * @returns { todos }
 */
export function useTodos() {
  const { todos } = useTodosProvider('useTodos');
  return { todos };
}

/**
 * Updates the todos list
 *
 * @returns { setTodos }
 */
export function useSetTodos() {
  const { setTodos } = useSetTodosProvider('useSetTodos');
  return { setTodos };
}

/**
 * Private hook to return the Todos context
 * @param {String} functionName - name of function calling this hook
 * @returns {{}}
 */
function useTodosProvider(functionName) {
  const data = useContext(TodosContext);
  if (!data)
    throw new Error(
      `${functionName} must be used within a component wrapped by TodosProvider.`
    );
  return data;
}

/**
 * Enables making changes to the TodosContext (using the TodosUpdateContext)
 * @param {String} functionName - just for using in error reporting
 * @returns {{}}
 */
function useSetTodosProvider(functionName) {
  const data = useContext(TodosUpdateContext);
  if (!data)
    throw new Error(
      `${functionName} must be used within a component wrapped by TodosProvider.`
    );
  return data;
}
