import React, { CSSProperties } from 'react';

import './index.scss';

/**
 * Button properties
 */
interface IButtonProps {
  /** Button type */
  type: 'button'|'submit'|'reset';
  /** Click handler */
  onClick?: () => void;
  /** Text that will appear inside the button */
  children: string;
  /** Class to be added if needed */
  className?: string;
  /** Inline css to be added if needed */
  style?: CSSProperties;
  /** Sets the disabled state on button */
  disabled?: boolean;
}

/**
 * Button component
 * 
 * @example ./index.md
 */
const Button = (props: IButtonProps) => {
  const { type, className, onClick, children, style, disabled = false } = props;

  return (
    <button 
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
