// Here lies the test case for LoadingSpinner.js

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';

afterEach(cleanup);

test('Create a loading spinner', () => {
  render(
    <LoadingSpinner
      parentDiv={true}
      display='d-none'
      data-testid='test-spinner'
    />
  );
  const spinner = screen.getByTestId(/test-spinner/i);

  expect(spinner).toBeInTheDocument();
  expect(spinner.classList[1]).toBe('d-none');
  expect(spinner.querySelector('svg')).toBeInTheDocument();
});
