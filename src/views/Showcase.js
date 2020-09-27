import React, { useCallback, useEffect, useState } from 'react';

import { UUID, SearchArrays } from '../Utils';
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '../components/Card';
import { Input } from '../components/form';
import Search from '../components/icons/Search';
import Clear from '../components/icons/Clear';

import './Showcase.scss';

/**
 * This is the main view of the tree showcase application
 * which responsible for the main and only page of it
 *
 * @returns {HTMLDivElement} - it can be a loading spinner (During the API call or its failing),
 * all of the showcases (Default), filtered showcases (If user search for anything by the search input)
 */
function Showcase() {
  const [state, setState] = useState({
    trees: [],
    searchText: '',
    filteredTrees: [],
    notFoundStatus: false
  });

  /**
   * This function is responsible for fetching trees from the server.
   */
  const fetchShowcases = useCallback((abortController) => {
    fetch(process.env.REACT_APP_URL, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => {
        const trees = data.trees.map((tree) => ({
          ...tree,
          id: UUID(),
          imageVisibilityStatus: false
        }));
        setState((prev) => ({ ...prev, trees: trees }));
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          console.error(`Following error has been thrown
          ${error}`);
        }
      });
  }, []);

  /**
   * This function is responsible for searching the table to match provided keywords by user.
   * We just use a regex here and an i flag to avoid inconsistency between upper and lower case searches.
   */
  const searchHandler = useCallback(() => {
    const filtered = SearchArrays({
      searchText: state.searchText,
      array: state.trees,
      keys: ['name', 'species_name']
    });

    if (filtered.length === 0) {
      setState((prev) => ({
        ...prev,
        filteredTrees: filtered,
        notFoundStatus: true
      }));
    } else {
      setState((prev) => ({
        ...prev,
        filteredTrees: filtered,
        notFoundStatus: false
      }));
    }
  }, [state.trees, state.searchText]);

  /**
   * This useEffect exists to run the fetchShowcases once the page loaded.
   */
  useEffect(() => {
    const abortController = new AbortController();
    fetchShowcases(abortController);
    return () => {
      abortController.abort();
    };
  }, [fetchShowcases]);

  /**
   * This useEffect is responsible for executing a keyword search with debouncing.
   */
  useEffect(() => {
    const timeOut = state.searchText
      ? setTimeout(() => {
          searchHandler();
        }, 300)
      : null;
    return () => clearTimeout(timeOut);
  }, [state.searchText, searchHandler]);

  const searchInput = (
    <Input
      value={state.searchText}
      name='search'
      id='search'
      placeholder='Search for a tree name or its specy'
      icon={<Search />}
      secondaryIcon={<Clear />}
      secondaryIconOnClick={() =>
        setState((prev) => ({ ...prev, searchText: '', filteredTrees: [] }))
      }
      onChange={(e) => {
        const target = e.target;

        if (target.value) {
          setState((prev) => ({ ...prev, searchText: target.value }));
        } else {
          setState((prev) => ({
            ...prev,
            searchText: target.value,
            filteredTrees: []
          }));
        }
      }}
    />
  );

  if (state.trees.length === 0 && state.filteredTrees.length === 0) {
    return (
      <LoadingSpinner
        parentDiv={true}
        stroke={'path-animation-stroke-other'}
        data-testid='spinner-container'
      />
    );
  } else if (
    state.trees.length !== 0 &&
    state.filteredTrees.length === 0 &&
    state.searchText !== '' &&
    state.notFoundStatus
  ) {
    return (
      <>
        {searchInput}
        <div className='no-result-container' data-testid='no-result-container'>
          <span className='heading-01'>
            {`Unfortunately, I couldn't find anything for you here, what a
            disastah for me! `}
            <span role='img' aria-label='Sad face'>
              😢 🤷‍♀️ 🤦‍♂️
            </span>
          </span>
        </div>
      </>
    );
  } else {
    return (
      <>
        {searchInput}
        <div className='title-container'>
          <span className='heading-01'>{'Tree Showcase'}</span>
          <div className='divider' />
        </div>
        <div className='trees-container' data-testid='trees-container'>
          {state.searchText
            ? state.filteredTrees.map((filteredTree) => (
                <Card key={filteredTree.id} data={filteredTree} />
              ))
            : state.trees.map((tree) => <Card key={tree.id} data={tree} />)}
        </div>
      </>
    );
  }
}

export default Showcase;
