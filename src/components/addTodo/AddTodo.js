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

function AddTodo() {
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [date, setDate] = useState();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const isFormValid = Boolean(isNameValid && isDescriptionValid && date);

  const { isAddingTodo } = useTodosActions();
  const { setIsAddingTodo } = useSetTodosActions();
  const { isAddFormOpen } = useTodosForms();
  const { setIsAddFormOpen } = useSetTodosForms();
  const todosKey = 'todos';
  const [todos, setTodos] = useLocalStorage(todosKey);

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

  function onSubmit() {
    const todoId = uuidv4();

    setIsAddingTodo(true);
    setTimeout(() => {
      setTodos({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        deadline: date,
        completed: false,
        id: todoId,
      });
      setIsAddingTodo(false);
      setIsAddFormOpen(false);
    }, 1000);
  }

  return (
    <Dialog open={isAddFormOpen} onOpenChange={() => setIsAddFormOpen(false)}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>Add a new Todo to your list</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input
              ref={nameRef}
              onBlur={checkName}
              id='name'
              placeholder='Kitchen'
              className='col-span-3'
            />
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='message'>Description</Label>
            <Textarea
              ref={descriptionRef}
              onBlur={checkDescription}
              placeholder='Wash all dishes, dry them out and put them on their place'
              id='message'
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
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className='mw-full p-0' align='start'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <DialogClose className='mt-2'>
            <Button
              onClick={() => setIsAddFormOpen(false)}
              className='w-full'
              variant='outline'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!isFormValid} type='submit' onClick={onSubmit}>
            {!isAddingTodo ? (
              'Save Todo'
            ) : (
              <>
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTodo;
