import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { formValueSelector, InjectedFormProps, getFormSyncErrors, reduxForm } from 'redux-form';

// Components
import LoginBanner from '@components/LoginBanner';
import LoginForm from '@components/LoginForm';
import GridContainer from '@components/GridContainer';
import GridItem from '@components/GridItem';

// Selectors
import { loginSelector } from '@store/selectors/login';

// Actions
import { clearLogin, loginAction } from '@store/actions/login';

// Utils
import { validateLoginForm } from '@utils/formValidation';

// Styles
import './index.scss';

declare interface ILoginFormProps {
  loginFormFields: ILoginFormFields; 
} 
declare interface IInjectedProps extends InjectedFormProps<ILoginFormFields, ILoginFormProps> { }
declare interface ILoginContainerComponentProps extends WithRouterProps, IInjectedProps, ILoginFormProps { }
declare interface ILoginContainerStateProps {
  isLoggedIn: boolean;
  loginState: any;
  formErrors: any;
}
declare interface ILoginContainerDispatchProps {
  logIn: (loginFormFields: ILoginFormFields, callback: any) => void;
  clearSignIn: () => void;
}
declare interface ILoginContainerProps extends ILoginContainerComponentProps, ILoginContainerStateProps, ILoginContainerDispatchProps {}

const FORM_NAME = 'login';

const LoginContainer = (props: ILoginContainerProps) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const { logIn, router, loginFormFields } = props;
    
    logIn(loginFormFields, (error: any) => {
      if (error) {
        console.error(error); // TODO: change to logger
      } else {
        router.push('/');
      }
    });
  };

  return (
    <section className="login-container">
      <GridContainer rows={1} gridGap={0}>
        <GridItem colStart={0} colEnd={6} className="login-container__left-section">
          <LoginBanner />
        </GridItem>
        <GridItem colStart={6} colEnd={12} className="login-container__right-section">
          <LoginForm 
            onSubmit={handleSubmit}
          />
        </GridItem>
      </GridContainer>
    </section>
  );
};


const mapStateToProps = (state: any, ownProps: any) => {
  const loginFormFields = formValueSelector(FORM_NAME)(state, 'userName', 'password');
  const formErrors = getFormSyncErrors(FORM_NAME)(state);
  const loginState = loginSelector(state);
  
  return ({
    formErrors,
    loginFormFields,
    loginState,
  });
};

const mapDispatchToProps = (dispatch: any) => {
  return ({
    logIn: (loginFormFields: ILoginFormFields, callback: any) => {
      dispatch(clearLogin());
      dispatch(loginAction(loginFormFields, callback));
    },
    clearLogin: () => {
      dispatch(clearLogin());
    },
  });
};

export default reduxForm<ILoginFormFields>({
  form: FORM_NAME,
  validate: validateLoginForm,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(connect(mapStateToProps, mapDispatchToProps)(withRouter<ILoginContainerProps>(LoginContainer)));

