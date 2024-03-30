import React from 'react';
import { render } from '@testing-library/react';
import {
  Dialog,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';

describe('Dialog', () => {
  test('renders dialog components', () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <Dialog open onClose={handleClose}>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
        <DialogHeader>Header</DialogHeader>
        <DialogContent>Content</DialogContent>
        <DialogFooter>Footer</DialogFooter>
        <DialogTrigger>Trigger</DialogTrigger>
        <DialogOverlay>Overlay</DialogOverlay>
      </Dialog>
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Content')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
    expect(getByText('Trigger')).toBeInTheDocument();
    expect(getByText('Overlay')).toBeInTheDocument();
  });
});
