import React from 'react';
import LoginBanner from '@components/LoginBanner';
import LoginForm from '@components/LoginForm';
import PschyLogo from '@images/psychology-logo.png';

import './index.scss';
import GridContainer from '@components/GridContainer';
import GridItem from '@components/GridItem';

const LoginContainer = (props: any) => {

  return (
    <section className="login-container">
      <GridContainer>
        <GridItem colStart={1} colEnd={6}>
          <LoginBanner 
            title="Nekomata"
            imageUrl={PschyLogo}
            copyright="Copyright &copy; 2021. Nekomata. All Rights Reserved."
          />
        </GridItem>
        <GridItem colStart={7} colEnd={12}>
          <LoginForm />
        </GridItem>
      </GridContainer>
    </section>
  );
};

export default LoginContainer;
