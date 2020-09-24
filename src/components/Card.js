import React, { useState } from 'react';

import Image from './Image';
import { Button } from './form';

import './Card.scss';

/**
 *
 * @param {Object} props - related data to each card
 *
 * This function is responsible for card element
 */
function Card(props) {
  const [state, setState] = useState(props.data);

  /**
   *
   * @param {Object} event - event interface of the card button
   *
   * This function is responsible for card image display on card button clicks.
   */
  function imageVisibilityHandler(event) {
    event.preventDefault();
    setState((prev) => ({
      ...prev,
      imageVisibilityStatus: !state.imageVisibilityStatus
    }));
  }

  return (
    <div className='card-container'>
      <div className='header'>
        <h2>{state.name}</h2>
        <h3>{state.species_name}</h3>
      </div>
      <div className='body'>
        <Image
          src={state.image}
          alt={state.name}
          className={state.imageVisibilityStatus ? null : 'd-none'}
        />
      </div>
      <div className='footer'>
        <Button
          innerText={state.imageVisibilityStatus ? 'Hide Image' : 'Show Image'}
          onClick={(event) => imageVisibilityHandler(event)}
        />
      </div>
    </div>
  );
}

export default Card;
