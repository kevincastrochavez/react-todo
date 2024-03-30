import React from 'react';
import { render } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  test('renders with default variant and size', () => {
    const { container } = render(<Button>Hello</Button>);
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2'
    );
    expect(button).toHaveTextContent('Hello');
  });

  test('renders with specified variant and size', () => {
    const { container } = render(
      <Button variant='destructive' size='lg'>
        Delete
      </Button>
    );
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90 h-10 rounded-md px-8'
    );
    expect(button).toHaveTextContent('Delete');
  });
});
