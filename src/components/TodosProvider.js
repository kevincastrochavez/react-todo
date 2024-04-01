import React, { createContext, useContext, useEffect, useState } from 'react';

import { getTodosFromLocalStorage } from './lib/utils';

const TodosContext = createContext({});
const TodosUpdateContext = createContext({});

/**
 * Handles whole application with information about the todos
 * @param {[React.ReactNode]|React.ReactNode} children - React children
 * @returns {JSX.Element}
 */
export default function TodosProvider({ children }) {
  const todosKey = 'todos';
  const [todos, setTodos] = useState(getTodosFromLocalStorage(todosKey));
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [uncheckedRowId, setUncheckedRowId] = useState('');

  useEffect(() => {
    if (!!uncheckedRowId) {
      const todoToMove = todos.find((todo) => todo.id === uncheckedRowId);
      const restOfTodos = todos.filter((todo) => todo.id !== uncheckedRowId);
      todoToMove.completed = !todoToMove.completed;
      const newTodos = [...restOfTodos, todoToMove];

      localStorage.setItem(todosKey, JSON.stringify(newTodos));
      setTodos(newTodos);
      setUncheckedRowId('');
    }
  }, [uncheckedRowId]);

  return (
    <TodosUpdateContext.Provider
      value={{
        setTodos,
        setIsAddingTodo,
        setIsAddFormOpen,
        setUncheckedRowId,
        setIsEditFormOpen,
        setIsEditingTodo,
      }}
    >
      <TodosContext.Provider
        value={{
          todos,
          isAddingTodo,
          isAddFormOpen,
          uncheckedRowId,
          isEditingTodo,
          isEditFormOpen,
        }}
      >
        {children}
      </TodosContext.Provider>
    </TodosUpdateContext.Provider>
  );
}

/**
 * Returns the todos list and the id of the unchecked todo
 *
 * @returns { todos, uncheckedRowId }
 */
export function useTodos() {
  const { todos, uncheckedRowId } = useTodosProvider('useTodos');
  return { todos, uncheckedRowId };
}

/**
 * Returns actions for adding, editing or removing todos
 *
 * @returns {  isAddingTodo, isEditingTodo }
 */
export function useTodosActions() {
  const { isAddingTodo, isEditingTodo } = useTodosProvider('useTodosActions');
  return { isAddingTodo, isEditingTodo };
}

/**
 * Returns if the add todo form is open, and if the edit todo form is open
 *
 * @returns { isAddFormOpen, isEditFormOpen }
 */
export function useTodosForms() {
  const { isAddFormOpen, isEditFormOpen } = useTodosProvider('useTodosForms');
  return { isAddFormOpen, isEditFormOpen };
}

/**
 * Updates the todos list and the id of the unchecked todo
 *
 * @returns { setTodos, setUncheckedRowId }
 */
export function useSetTodos() {
  const { setTodos, setUncheckedRowId } = useSetTodosProvider('useSetTodos');
  return { setTodos, setUncheckedRowId };
}

/**
 * Updates the actions for adding, editing or removing todos
 *
 * @returns {  setIsAddingTodo, setIsEditingTodo }
 */
export function useSetTodosActions() {
  const { setIsAddingTodo, setIsEditingTodo } =
    useSetTodosProvider('useSetTodosActions');
  return { setIsAddingTodo, setIsEditingTodo };
}

/**
 * Updates the state of the add todo form, and the state of the edit todo form
 *
 * @returns {  setIsAddFormOpen, setIsEditFormOpen }
 */
export function useSetTodosForms() {
  const { setIsAddFormOpen, setIsEditFormOpen } =
    useSetTodosProvider('useSetTodosForms');
  return { setIsAddFormOpen, setIsEditFormOpen };
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
