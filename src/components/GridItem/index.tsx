import React from 'react';

import './index.scss';

declare interface IGridItem {
  colStart: number;
  colEnd: number;
  children: any;
  rowStart?: number;
  rowEnd?: number;
}

const GridItem = (props: IGridItem) => {
  const { rowStart, rowEnd, colStart, colEnd, children } = props;

  return (
    <div className={`grid-item grid-item--${colStart}--${colEnd}`}>
      {children}
    </div>
  );
};

export default GridItem;
