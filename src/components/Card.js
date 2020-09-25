import React, { useState, useEffect } from 'react';

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
  const { data } = props;
  const [state, setState] = useState(data);

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

  /**
   * This useEffect is responsible for updating the tree list 
   * whenever the data from the parent changed.
   */
  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <div className='card-container'>
      <div className={`header ${!state.imageVisibilityStatus ? 'centre' : ''}`}>
        <h2 className='heading-02'>{state.name}</h2>
        <h3 className='heading-03'>{state.species_name}</h3>
        {!state.imageVisibilityStatus && <div className='divider' />}
      </div>
      <div className='body'>
        {state.imageVisibilityStatus && (
          <Image
            src={state.image}
            alt={state.name}
            className={state.imageVisibilityStatus ? 'd-show' : 'd-none'}
          />
        )}
      </div>
      <div className='footer'>
        <Button
          innerText={state.imageVisibilityStatus ? 'Hide Image' : 'Show Image'}
          onClick={(event) => imageVisibilityHandler(event)}
          data-type='primary'
        />
      </div>
    </div>
  );
}

export default Card;
