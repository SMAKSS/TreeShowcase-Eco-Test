import React, { useCallback, useEffect, useState } from 'react';

import UUID from '../utils/UUID';
import Card from '../components/Card';

import './Showcase.scss';

/**
 * This is the main view of the tree showcase application
 * which responsible for the main and only page of it
 */
function Showcase() {
  const [state, setState] = useState({ trees: [] });

  /**
   * This function is responsible for fetching trees from the server.
   */
  const fetchShowcases = useCallback(() => {
    fetch(process.env.REACT_APP_URL)
      .then((response) => response.json())
      .then((data) => {
        const trees = data.trees.map((tree) => ({
          ...tree,
          id: UUID(),
          imageVisibilityStatus: false
        }));
        setState((prev) => ({ ...prev, trees: trees }));
      })
      .catch((error) => console.error(error));
  }, []);

  /**
   * This useEffect exists to run the fetchShowcases once the page loaded.
   */
  useEffect(() => {
    fetchShowcases();
  }, [fetchShowcases]);

  return (
    <>
      <div className='tree-container'>
        {state.trees.map((tree) => (
          <Card key={tree.id} data={tree} />
        ))}
      </div>
    </>
  );
}

export default Showcase;
