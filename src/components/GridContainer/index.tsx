import React, { CSSProperties } from 'react';
import './index.scss';

declare interface IGridContainer {
  rows: number;
  children: any;
  gridGap?: number;
  className?: string;
  style?: CSSProperties;
}

const GridContainer = (props: IGridContainer) => {
  const { rows, children, gridGap = 30, className = '', style = {} } = props;

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
