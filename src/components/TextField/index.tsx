import React from 'react';
import './index.scss';

declare interface ITextField {
  input: any;
  label: string;
  type: string;
  readOnly: boolean;
  className?: string;
  meta: any;
}

const TextField = (props: ITextField) => {
  const {
    input,
    label,
    type,
    readOnly,
    className,
    meta: { touched, error },
  } = props;


  console.log(input);

  return (
    <div className={`text-field ${className}`}>
      <label htmlFor={label} className={`text-field__label ${input.disabled ? 'text-field__label--disabled' : ''}`}>{label}</label>
      <input 
        className={!input.disabled && touched && error ? 'text-field--error' : ''} 
        id={label} 
        {...input} 
        type={type} readOnly={readOnly}
      />
      {!input.disabled && touched && error && (
        <span className="text-field__validation-text">{error}</span>
      )}
    </div>
  );
};

export default TextField;
