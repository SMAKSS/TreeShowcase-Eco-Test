// Here lies a test case for Button.js

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { Button } from './index';

afterEach(cleanup);

function renderButton() {
  render(
    <Button
      innerText='Test Button'
      data-type='primary'
      onClick={(e) => {
        const target = e.target;
        target.textContent = 'Button';
      }}
      data-testid='test-button'
    />
  );
  return screen.getByTestId(/test-button/i);
}

test('Creating button', () => {
  const button = renderButton();

  expect(button).toBeInTheDocument();
  expect(button.textContent).toBe('Test Button');
});

test('Button onclick action', () => {
  const button = renderButton();
  const event = new window.Event('click', { bubbles: true });
  button.dispatchEvent(event);

  expect(button.textContent).toBe('Button');
});
