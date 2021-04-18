import React from 'react';

import './index.scss';

interface IGridItem {
  children: any;
  colSpan: number;
  rowSpan?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GridItem = (props: IGridItem) => {
  const {
    children,
    colSpan,
    rowSpan,
    className = '',
    style = {}
  } = props;

  const colSpanClassName = `grid-item__col--${colSpan}`;

  const rowSpanStyle: React.CSSProperties = typeof rowSpan === 'undefined' ? {} : { gridRow: `span ${rowSpan}` };

  return (
    <div
      className={`grid-item ${colSpanClassName} ${className}`}
      style={{
        ...rowSpanStyle,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default GridItem;
