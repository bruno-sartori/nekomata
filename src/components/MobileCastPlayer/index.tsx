import React, { useState } from 'react';
// Components
import PlayerControls from '@components/PlayerControls';
import VolumeControl from '@components/VolumeControl';
import MobileCastMiniplayer from '@components/MobileCastMiniplayer';
// Icons
import CloseIcon from '@images/icons/close.svg';
import CollapseIcon from '@images/icons/collapse.svg';

declare interface IMobileCastPlayerProps {
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

const MobileCastPlayer: React.FC<IMobileCastPlayerProps> = (props) => {
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
  const [isExpanded, setIsExpanded] = useState(false);

  const poster = content?.imageSet?.length > 0 ? content?.imageSet?.find(o => o.type === 'BackgroundImage').url : null;
  const title = content?.snippet?.title;
  const description = content?.snippet?.description;

  if (isPlaying !== prevIsPlaying) {
    setPrevIsPlaying(isPlaying);

    if (isPlaying) {
      onPlayerLoaded(null);
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div>
      <div className={`mobile-cast-player ${display ? 'mobile-cast-player--visible' : ''} ${isExpanded ? 'mobile-cast-player--expanded' : ''}`}>
        {!isExpanded && (
          <MobileCastMiniplayer
            currentTime={currentTime}
            duration={duration}
            handleTimeline={handleTimeline}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            toggleExpand={toggleExpand}
            content={content}
          />
        )}
        {isExpanded && (
          <>
            {poster && (
              <>
                <div className="mobile-cast-player__background">
                  <img src={poster} className="mobile-cast-player__background__image" />
                  <div className="mobile-cast-player__placeholder">{`Tocando no dispositivo ${deviceName}.`}</div>
                  <img
                    className="mobile-cast-player__collapse-icon"
                    src={CollapseIcon}
                    alt="ícone colapsar player"
                    onClick={() => setIsExpanded(false)}
                  />
                  <img
                    className="mobile-cast-player__close-icon"
                    src={CloseIcon}
                    alt="ícone fechar"
                    onClick={() => {
                      setIsExpanded(false);
                      handleClose();
                    }}
                  />
                </div>
              </>
            )}

            <div className="mobile-cast-player__container">
              <div className="mobile-cast-player__info">
                <h1 className="mobile-cast-player__info__title">{title}</h1>
                {/*<span className="mobile-cast-player__info__date">{date}</span>*/}
                <p className="mobile-cast-player__info__description">{description}</p>
              </div>
              <div className="mobile-cast-player__controls">
                <div className="mobile-cast-player__controls__volume">
                  <VolumeControl
                    value={volume}
                    max={100}
                    handleChange={handleVolume}
                    onClick={toggleMute}
                  />
                </div>
              </div>
              <PlayerControls
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
                handleChange={handleTimeline}
                togglePlay={togglePlay}
                handleBackward={handleBackward}
                handleForward={handleForward}
                handleMouseUp={handleMouseUp}
                handleMouseDown={handleMouseDown}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileCastPlayer;
