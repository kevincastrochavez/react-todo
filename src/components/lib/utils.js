import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    const existingTodos = JSON.parse(localStorage.getItem(key)) || []; // Get existing todos from localStorage or initialize an empty array
    existingTodos.push(newTodo); // Add the new todo to the existing todos array
    localStorage.setItem(key, JSON.stringify(existingTodos)); // Set the updated todos array back to localStorage
  } catch (error) {
    console.error(`Error adding Todo to localStorage: ${error}`);
  }
}
