import React from 'react';
// Components
import SliderBar from '@components/SliderBar';
// Icons
import MuteIcon from '@images/icons/mute.svg';
import VolumeIcon from '@images/icons/volume.svg';

interface IVolumeControlProps {
  max: number;
  value: number | string;
  handleChange: (e: any) => void;
  onClick: (e: any) => void;
}

const VolumeControl: React.FC<IVolumeControlProps> = (props) => {
  const { max, value, handleChange, onClick } = props;
  const isMute = Number(value) === 0;
  const iconSrc = isMute ? MuteIcon : VolumeIcon;
  const muteClass = isMute ? '--mute' : '';

  return (
    <div className="volume-control">
      <img 
        src={iconSrc}
        className={`volume-control__icon${muteClass}`}
        onClick={onClick}
      />
      <SliderBar 
        max={max}
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};

export default VolumeControl;
