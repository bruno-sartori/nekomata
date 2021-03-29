import React, { CSSProperties } from 'react';

import './index.scss';

declare interface IGridItem {
  children: any;
  colStart: number;
  colEnd: number;
  rowStart?: number;
  rowEnd?: number;
  className?: string;
  style?: CSSProperties;
}

const GridItem = (props: IGridItem) => {
  const { 
    children, 
    colStart, 
    colEnd, 
    rowStart, 
    rowEnd, 
    className = '', 
    style = {} 
  } = props;

  const colClassName = `grid-item__col--${colStart}--${colEnd}`;
  const rowClassName = (rowStart && rowEnd) ? `grid-item__row--${rowStart}--${rowEnd}` : '';

  return (
    <div 
      className={`grid-item ${colClassName} ${rowClassName} ${className}`} 
      style={style}
    >
      {children}
    </div>
  );
};

export default GridItem;
