import React, { createContext, useContext, useState } from 'react';

const TodosContext = createContext({});
const TodosUpdateContext = createContext({});

/**
 *  Provides whole application with information about the todos
 * @param {[React.ReactNode]|React.ReactNode} children - React children
 * @returns {JSX.Element}
 */
export default function TodosProvider({ children }) {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  return (
    <TodosUpdateContext.Provider value={{ setPendingTodos, setCompletedTodos }}>
      <TodosContext.Provider value={{ pendingTodos, completedTodos }}>
        {children}
      </TodosContext.Provider>
    </TodosUpdateContext.Provider>
  );
}

/**
 * Returns the pendingTodos list and completedTodos
 *
 * @returns { pendingTodos, completedTodos }
 */
export function useTodos() {
  const { pendingTodos, completedTodos } = useTodosProvider('useTodos');
  return { pendingTodos, completedTodos };
}

/**
 * Updates the pending todos list and completed todos
 *
 * @returns { setPendingTodos, setCompletedTodos }
 */
export function useSetTodos() {
  const { setPendingTodos, setCompletedTodos } =
    useSetTodosProvider('useSetTodos');
  return { setPendingTodos, setCompletedTodos };
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
