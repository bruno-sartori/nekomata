import React from 'react';
import { Field } from 'redux-form';

// Components
import Card from '@components/Card';

// Styles
import './index.scss';
import TextField from '@components/TextField';

declare interface ILoginForm {
  onSubmit: () => void;
}

const LoginForm = (props: ILoginForm) => {
  const { onSubmit } = props;

  return (
    <div className="login-form">
      <Card>
        <form onSubmit={onSubmit}>
          <Field
            className="login-form__input"
            label="Usuario"
            name='userName'
            component={TextField}
            type="text"
          />

          <Field
            className="login-form__input"
            label="Senha"
            name='password'
            component={TextField}
            type="text"
          />

          <button type="submit">Sign In</button>

        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
