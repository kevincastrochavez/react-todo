import React from 'react';
import { render } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  test('renders label element with correct attributes', () => {
    const { getByText } = render(
      <Label htmlFor='input' className='custom-class'>
        First Name
      </Label>
    );

    const labelElement = getByText('First Name');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement).toHaveAttribute('for', 'input');
    expect(labelElement).toHaveClass('custom-class');
  });
});
