import React from 'react';

import styles from './loadingSpinner.module.scss';

/**
 *
 * @param {Boolean} parentDiv - if its true, the spinner will wrapped within the parent div
 * @param {String} display - the customized display class like d-none class
 * @param {String} stroke - color of stroke
 * @param {any} props - rest of props (like data attributes)
 *
 * @returns {HTMLDivElement} - it will return a loading spinner with the desired colored passed by stroke
 *
 */
function LoadingSpinner({
  parentDiv = false,
  display = '',
  stroke = 'path-animation-stroke-other',
  ...props
}) {
  return (
    <div
      className={`${
        parentDiv ? `${styles.custom_loader_container}` : ''
      } ${display}`}
      {...props}
    >
      <svg
        className={styles.spinner}
        width='35px'
        height='35px'
        viewBox='0 0 66 66'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          className={`${styles.path} ${styles[stroke]}`}
          fill='none'
          strokeWidth='5'
          strokeLinecap='round'
          cx='33'
          cy='33'
          r='30'
        />
      </svg>
    </div>
  );
}

export default LoadingSpinner;
