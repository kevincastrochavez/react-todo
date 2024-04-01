import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../alertDialog/AlertDialog';
import { useLocalStorage } from '../lib/utils';
import { useSetTodosForms, useTodosActions } from '../TodosProvider';

/**
 * Displays the Delete Todo form
 * @param {String} id - The id of the todo to be deleted
 * @returns {JSX.Element}
 */
function DeleteTodo({ id }) {
  const navigate = useNavigate();
  const { isDeleteFormOpen } = useTodosActions();
  const { setIsDeleteFormOpen } = useSetTodosForms();
  const todosKey = 'todos';
  const [todos] = useLocalStorage(todosKey);
  const [checkedTodos, setCheckedTodos] = useLocalStorage(todosKey, 'checked');

  function handleDeleteTodo() {
    const restOfTodos = todos.filter((todo) => todo.id !== id);
    setCheckedTodos(restOfTodos);
    navigate('/');
  }

  return (
    <AlertDialog
      open={isDeleteFormOpen}
      onOpenChange={() => setIsDeleteFormOpen(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You won't be able to recover this todo!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTodo}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTodo;
