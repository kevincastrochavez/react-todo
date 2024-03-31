import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useSetTodos, useTodos } from '../TodosProvider';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Adds a new todo to the existing todos array stored in localStorage under the specified key.
 * @param {String} key - The key used to retrieve the existing todos array from localStorage.
 * @param {Object} newTodo - The new todo to be added to the existing todos array.
 * @return {void} This function does not return anything.
 */
export function addTodoToLocalStorage(key, newTodo) {
  try {
    const existingTodos = getTodosFromLocalStorage(key); // Get existing todos from localStorage
    existingTodos.push(newTodo); // Add the new todo to the existing todos array
    localStorage.setItem(key, JSON.stringify(existingTodos)); // Set the updated todos array back to localStorage
  } catch (error) {
    console.error(`Error adding Todo to localStorage: ${error}`);
  }
}

/**
 * Gets the existing todos array stored in localStorage under the specified key.
 * @param {String} key - The key used to retrieve the existing todos array from localStorage.
 * @return {[Object]} The existing todos array.
 */
export function getTodosFromLocalStorage(key) {
  try {
    const existingTodos = JSON.parse(localStorage.getItem(key)) || []; // Get existing todos from localStorage or initialize an empty array
    return existingTodos;
  } catch (error) {
    console.error(`Error getting Todos from localStorage: ${error}`);
  }
}

/**
 * Sets the new todos array stored in localStorage under the specified key.
 * @param {String} key - The key used to retrieve the existing todos array from localStorage.
 * @return {[Object]} The existing todos array.
 */
export function useLocalStorage(key) {
  const { todos } = useTodos();
  const { setTodos } = useSetTodos();

  function setStorage(todo) {
    const allTodos = [...todos, todo];
    localStorage.setItem(key, JSON.stringify(allTodos));
    setTodos(allTodos);
  }

  return [todos, setStorage];
}
