import { useRef, useState } from 'react';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../button/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog/Dialog';
import { Input } from '../input/Input';
import { Label } from '../label/Label';
import { Textarea } from '../textarea/Textarea';
import { Calendar } from '../calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';
import { cn, useLocalStorage } from '../lib/utils';
import {
  useTodosActions,
  useSetTodosActions,
  useTodosForms,
  useSetTodosForms,
} from '../TodosProvider';

/**
 * Displays the EditTodo form for a specific todo
 * @param {String} name - The name of the todo
 * @param {String} description - The description of the todo
 * @param {Date} deadline - The deadline of the todo
 * @param {Boolean} completed - Whether the todo is completed or not
 * @param {String} id - The id of the todo
 * @return {[Object]} The edit form
 */
function EditTodo({ name, description, deadline, completed, id }) {
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef(deadline);
  const isFormValid = Boolean(
    isNameValid && isDescriptionValid && dateRef.current
  );
  const [hasAnythingChanged, setHasAnythingChanged] = useState(false);

  const { isEditingTodo } = useTodosActions();
  const { setIsEditingTodo } = useSetTodosActions();
  const { isEditFormOpen } = useTodosForms();
  const { setIsEditFormOpen } = useSetTodosForms();
  const todosKey = 'todos';
  const [todos] = useLocalStorage(todosKey);
  const [checkedTodos, setCheckedTodos] = useLocalStorage(todosKey, 'checked');

  /**
   * Checks if the name input is valid
   * @returns {void} sets the isNameValid state
   */
  function checkName() {
    const nameText = nameRef.current.value;
    const regex = /^(?:[a-zA-Z0-9]+\s?){3,20}$/; // 3-20 characters, whitespace separated, numbers and letters
    setIsNameValid(regex.test(nameText));
  }

  /**
   * Checks if the description text area is valid
   * @returns {void} sets the isDescriptionValid state
   */
  function checkDescription() {
    const descriptionText = descriptionRef.current.value;
    const regex = /^(?:[a-zA-Z0-9]+\s?){3,200}$/; // 3-200 characters, whitespace separated, numbers and letters
    setIsDescriptionValid(regex.test(descriptionText));
  }

  /**
   * Checks if any data has changed when an input is changed
   * @returns {void} sets the setHasAnythingChanged state and checks for valid inputs
   */
  function handleHasSomethingChanged() {
    const inputName = nameRef.current.value;
    const inputDescription = descriptionRef.current.value;
    const inputDate = dateRef.current;

    const isNameTheSame = name === inputName;
    const isDescriptionTheSame = description === inputDescription;
    let isDeadlineTheSame =
      typeof inputDate === 'string' && inputDate === deadline;

    if (typeof inputDate === 'object') {
      isDeadlineTheSame = inputDate.toISOString() === deadline;
      dateRef.current = inputDate.toISOString();
    }

    if (isNameTheSame && isDescriptionTheSame && isDeadlineTheSame)
      setHasAnythingChanged(false);
    else setHasAnythingChanged(true);

    checkName();
    checkDescription();
  }

  /**
   * Checks if the date has changed
   * @returns {void} sets the setHasAnythingChanged state and checks for valid inputs
   */
  function handlePickDate(newDate) {
    dateRef.current = newDate;
    handleHasSomethingChanged();
  }

  function onSubmit() {
    setIsEditingTodo(true);
    const editedTodoObj = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      deadline: dateRef.current,
      completed: completed,
      id: id,
    };

    const restOfTodos = todos.filter((todo) => todo.id !== id);
    const newTodos = [...restOfTodos, editedTodoObj];

    setTimeout(() => {
      setCheckedTodos(newTodos);

      setIsEditingTodo(false);
      setIsEditFormOpen(false);
    }, 1000);
  }

  return (
    <Dialog open={isEditFormOpen} onOpenChange={() => setIsEditFormOpen(false)}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>Edit the details of your todo</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input
              ref={nameRef}
              onChange={handleHasSomethingChanged}
              id='name'
              placeholder='Kitchen'
              className='col-span-3'
              defaultValue={name}
            />
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='message'>Description</Label>
            <Textarea
              ref={descriptionRef}
              onChange={handleHasSomethingChanged}
              placeholder='Wash all dishes, dry them out and put them on their place'
              id='message'
              defaultValue={description}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div className='grid w-full items-center gap-1.5'>
                <Label>Deadline</Label>
                <Button
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {dateRef.current ? (
                    format(dateRef.current, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className='mw-full p-0' align='start'>
              <Calendar
                mode='single'
                selected={dateRef.current}
                onSelect={(newDate) => handlePickDate(newDate)}
                ref={dateRef}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <DialogClose className='mt-2 sm:mt-0'>
            <Button
              onClick={() => setIsEditFormOpen(false)}
              className='w-full'
              variant='outline'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!isFormValid || !hasAnythingChanged}
            type='submit'
            onClick={onSubmit}
          >
            {!isEditingTodo ? (
              'Save Changes'
            ) : (
              <>
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                Saving...
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTodo;
