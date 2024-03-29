import React from 'react';
import { Field } from 'redux-form';

// Components
import Card from '@components/Card';
import TextField from '@components/TextField';
import Button from '@components/Button';

interface ILoginForm {
  onSubmit: (e: any) => void;
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
            type="password"
          />

          <Button type="submit">Sign In</Button>

        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
