import React, { useState } from 'react';
// Components
import PlayerControls from '@components/PlayerControls';
import VolumeControl from '@components/VolumeControl';
import String from '@components/String';


declare interface ICastPlayerProps {
  display: boolean,
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number | string;
  deviceName: string;
  content: IContent;
  onPlayerLoaded: (e: any) => void;
  togglePlay: (e: any) => void;
  toggleMute: (e: any) => void;
  handleTimeline: (e: any) => void;
  handleBackward: (e: any) => void;
  handleForward: (e: any) => void;
  handleVolume: (e: any) => void;
  handleClose: () => void;
  handleMouseUp: (e: any) => void;
  handleMouseDown: (e: any) => void;
}

const CastPlayer: React.FC<ICastPlayerProps> = (props) => {
  const {
    display,
    currentTime,
    duration,
    isPlaying,
    volume,
    deviceName,
    content,
    onPlayerLoaded,
    togglePlay,
    toggleMute,
    handleTimeline,
    handleBackward,
    handleForward,
    handleVolume,
    handleClose,
    handleMouseDown,
    handleMouseUp
  } = props;

  const [prevIsPlaying, setPrevIsPlaying] = useState(false);
  const poster = content?.imageSet?.length > 0 ? content?.imageSet?.find(o => o.type === 'BackgroundImage').url : null;
  const title = content?.snippet?.title;

  if (isPlaying !== prevIsPlaying) {
    setPrevIsPlaying(isPlaying);

    if (isPlaying) {
      onPlayerLoaded(null);
    }
  }

  const CloseIcon = () => (
    <svg 
      onClick={handleClose}
      className="cast-player__container-close-icon"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#FFFFFF" />
    </svg>
  );

  return (
    <div className={`cast-player ${display ? 'cast-player--visible' : ''}`}>
      {poster && (
        <div className="cast-player__background">
          <img src={poster} height="225" width="400" className="cast-player__background__image" />
        </div>
      )}
      <div className="cast-player__placeholder">
        <String value="chromecast.playingOnDevice" />{` '${deviceName}'`}
      </div>
      <div className="cast-player__container">
        <div className="cast-player__container-top">
          <CloseIcon />
          <div className="cast-player__container-volume">
            <VolumeControl
              value={volume}
              max={100}
              handleChange={handleVolume}
              onClick={toggleMute}
            />
          </div>
        </div>
        <div className="cast-player__container-controls">
          <PlayerControls
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            handleBackward={handleBackward}
            handleForward={handleForward}
            handleMouseUp={handleMouseUp}
            handleMouseDown={handleMouseDown}
            handleChange={handleTimeline}
          />
        </div>
      </div>
      <div className="cast-player__title-container">
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default CastPlayer;
