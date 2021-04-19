import React from 'react';

/**
 * Card properties
 */
interface ICardProps {
  /** Card`s children element */
  children: JSX.Element;
}

/**
 * Card component
 *
 * @example ./index.md
 */
const Card: React.FC<ICardProps> = (props) => {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

export default Card;
