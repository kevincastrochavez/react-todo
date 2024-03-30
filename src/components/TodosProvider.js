import React, { createContext, useContext, useState } from 'react';

const TodosContext = createContext({});
const TodosUpdateContext = createContext({});

/**
 * Handles whole application with information about the todos
 * @param {[React.ReactNode]|React.ReactNode} children - React children
 * @returns {JSX.Element}
 */
export default function TodosProvider({ children }) {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <TodosUpdateContext.Provider
      value={{
        setPendingTodos,
        setCompletedTodos,
        setIsAddingTodo,
        setIsAddFormOpen,
      }}
    >
      <TodosContext.Provider
        value={{ pendingTodos, completedTodos, isAddingTodo, isAddFormOpen }}
      >
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
 * Returns actions for adding, editing or removing todos
 *
 * @returns {  isAddingTodo }
 */
export function useTodosActions() {
  const { isAddingTodo } = useTodosProvider('useTodosActions');
  return { isAddingTodo };
}

/**
 * Returns if the add todo form is open
 *
 * @returns {  isAddFormOpen }
 */
export function useTodosForms() {
  const { isAddFormOpen } = useTodosProvider('useTodosForms');
  return { isAddFormOpen };
}

/**
 * Updates the pending todos list and completed todos
 *
 * @returns { setPendingTodos, setCompletedTodos,  }
 */
export function useSetTodos() {
  const { setPendingTodos, setCompletedTodos } =
    useSetTodosProvider('useSetTodos');
  return { setPendingTodos, setCompletedTodos };
}

/**
 * Updates the actions for adding, editing or removing todos
 *
 * @returns {  setIsAddingTodo }
 */
export function useSetTodosActions() {
  const { setIsAddingTodo } = useSetTodosProvider('useSetTodosActions');
  return { setIsAddingTodo };
}

/**
 * Updates the state of the add todo form
 *
 * @returns {  setIsAddFormOpen }
 */
export function useSetTodosForms() {
  const { setIsAddFormOpen } = useSetTodosProvider('useSetTodosForms');
  return { setIsAddFormOpen };
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
