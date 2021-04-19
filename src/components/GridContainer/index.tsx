import React from 'react';

/**
 * GridContainer properties
 */
interface IGridContainerProps {
  /** Number of rows in grid container */
  rows?: number;
  /** Container`s children elements */
  children: JSX.Element | JSX.Element[];
  /** Space between columns */
  gridGap?: number;
  /** Custom classname if needed */
  className?: string;
  /** Custom inline style if needed */
  style?: React.CSSProperties;
}

/**
 * GridContainer component
 * 
 * @example ./index.md
 */
const GridContainer: React.FC<IGridContainerProps> = (props) => {
  const { rows = 1, children, gridGap = 0, className = '', style = {} } = props;

  return (
    <div
      className={`grid-container grid-container--rows--${rows} ${className}`}
      style={{ ...style, gridGap }}
    >
      {children}
    </div>
  );
};

export default GridContainer;
