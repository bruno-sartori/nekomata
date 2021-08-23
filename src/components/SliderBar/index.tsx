import React from 'react';

interface ISliderBarProps {
  value: number | string;
  max: number;
  loading?: boolean;
  noControls?: boolean;
  handleChange: (e: any) => void;
  handleMouseUp?: (e: any) => void;
  handleMouseDown?: (e: any) => void;
}

const SliderBar: React.FC<ISliderBarProps> = (props) => {
  const { 
    value,
    max,
    loading = false,
    noControls = false,
    handleChange, 
    handleMouseUp,
    handleMouseDown
  } = props;

  if (loading) {
    return (
      <div className="progress progress-striped active">
        <div role="progressbar" className="progress-bar"></div>
      </div>
    );
  }

  return (
    <div className="slider-bar">
      {!noControls && (
        <input
          type="range"
          value={value}
          max={max}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onInput={handleChange}
        />
      )}
      <progress
        value={value}
        max={max}
      />
    </div>
  );
};

export default SliderBar;
