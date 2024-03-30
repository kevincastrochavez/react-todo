import React from 'react';
import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  test('renders input element with correct attributes', () => {
    const { getByRole } = render(
      <Input
        type='text'
        placeholder='Enter your name'
        className='custom-class'
      />
    );

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter your name');
    expect(inputElement).toHaveClass('custom-class');
  });
});
