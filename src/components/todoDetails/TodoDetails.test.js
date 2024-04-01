import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import extend-expect to use Jest DOM assertions
import TodoDetails from './TodoDetails';

describe('TodoDetails component', () => {
  it('renders the todo details correctly', () => {
    const todo = {
      name: 'Test Todo',
      description: 'This is a test todo',
      deadline: new Date(Date.now() + 3600 * 1000), // Deadline 1 hour from now
      completed: false,
    };

    const { getByText } = render(
      <TodoDetails
        name={todo.name}
        description={todo.description}
        deadline={todo.deadline}
        completed={todo.completed}
      />
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText(todo.name)).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText(todo.description)).toBeInTheDocument();
    expect(getByText('Deadline')).toBeInTheDocument();
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByText('No')).toBeInTheDocument();
  });
});
