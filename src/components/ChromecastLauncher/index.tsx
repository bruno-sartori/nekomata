import React from 'react';

interface IChromecastLauncherProps {
  onClick: () => void;
}

const ChromecastLauncher: React.FC<IChromecastLauncherProps> = (props) => {
  const { onClick } = props;

  return (
    <div
      className="chromecast-launcher"
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: '<google-cast-launcher></google-cast-launcher>' }}
    />
  );
};

export default ChromecastLauncher;
