// Here lies a test case for Showcase.js

import React from 'react';
import {
  render,
  screen,
  cleanup,
  act,
  waitForElementToBeRemoved
} from '@testing-library/react';

import Showcase from './Showcase';

afterEach(cleanup);

const flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
};

async function renderTreesContainer() {
  render(<Showcase />);
  await act(() => flushPromises());
  return screen.getByTestId(/trees-container/i);
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        trees: [
          {
            name: 'Baobab',
            species_name: 'Adansonia',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/3/36/Baobab_Adansonia_digitata.jpg'
          },
          {
            name: 'Red Mangrove',
            species_name: 'Rhizophora mangle',
            image:
              'https://upload.wikimedia.org/wikipedia/en/1/16/Red_mangrove-everglades_natl_park.jpg'
          },
          {
            name: 'Common Hornbeam',
            species_name: 'Carpinus betulus',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/2/2c/Carpinus_betulus_-_Hunsr%C3%BCck_001.jpg'
          },
          {
            name: 'Turkey Oak',
            species_name: 'Quercus cerris',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/3/34/Quercus_cerris.JPG'
          },
          {
            name: 'Japanese red pine',
            species_name: 'Pinus densiflora',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/f/f0/Pinus_syluestriformis_%28Takenouchi%29T.Wang_ex_Cheng.JPG'
          }
        ]
      })
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('Loading spinner exists in first load', async () => {
  render(<Showcase />);
  const spinnerContainer = screen.getByTestId(/spinner-container/i);

  expect(spinnerContainer).toBeInTheDocument();

  await waitForElementToBeRemoved(() =>
    screen.getByTestId(/spinner-container/i)
  );
});

test('Mocking fetch API', async () => {
  const treesContainer = await renderTreesContainer();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(treesContainer.childElementCount).toBe(5);
});

it('Mocking fetch API failure', async () => {
  fetch.mockImplementationOnce(() => Promise.reject('API is down'));
  render(<Showcase />);
  const spinnerContainer = screen.getByTestId(/spinner-container/i);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(spinnerContainer).toBeInTheDocument();
});
