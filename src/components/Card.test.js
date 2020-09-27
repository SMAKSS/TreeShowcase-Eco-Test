// Here lies the test case for Card.js

import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import uuid from 'uuid/v4';

import Card from './Card';

jest.mock('uuid/v4');

afterEach(cleanup);

const tree = {
  name: 'Baobab',
  species_name: 'Adansonia',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/3/36/Baobab_Adansonia_digitata.jpg',
  id: uuid.mockImplementation(() => index),
  imageVisibilityStatus: false
};

function renderCard() {
  render(<Card data={tree} data-testid='test-card' />);
  return screen.getByTestId(/test-card/i);
}

test('Creating cards', () => {
  const card = renderCard();

  expect(card).toBeInTheDocument();
  expect(card.querySelector('h2').textContent).toBe(tree.name);
  expect(card.querySelector('h3').textContent).toBe(tree.species_name);
  expect(card.querySelector('img')).not.toBeInTheDocument();
  expect(card.querySelector('button').textContent).toBe('Show Image');
});

test('Card onclick action', async () => {
  const card = renderCard();
  const button = card.querySelector('button');
  const event = new window.Event('click', { bubbles: true });
  button.dispatchEvent(event);
  const image = card.querySelector('img');

  expect(image).toBeInTheDocument();
  expect(image.src).toBe(tree.image);
  expect(button.textContent).toBe('Hide Image');
});
