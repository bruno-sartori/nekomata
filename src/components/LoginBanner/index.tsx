import React from 'react';

import './index.scss';

declare interface ILoginBanner {
  title: string;
  imageUrl: string;
  copyright: string;
};

const LoginBanner = (props: ILoginBanner) => {
  const { title, imageUrl, copyright } = props;

  return (
    <div className="login-banner">
      <h1 className="login-banner__title">
        {title}
      </h1>
      <figure className="login-banner__image">
        <img src={imageUrl} width={100} height={100} />
      </figure>
      <span className="login-banner__copyright">
        {copyright}
      </span>
    </div>
  );
};

export default LoginBanner;
