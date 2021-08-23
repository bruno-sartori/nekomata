import React from 'react';
// Components
import SliderBar from '@components/SliderBar';
import PlayPauseButton from '@components/PlayPauseButton';
import Image from '@components/Image';

declare interface IMobileCastMiniplayerProps {
  currentTime: number;
  duration: number;
  handleTimeline: (e: any) => void;
  content: IContent;
  isPlaying: boolean;
  togglePlay: (e: any) => void;
  toggleExpand: () => void;
}

const MobileCastMiniplayer: React.FC<IMobileCastMiniplayerProps> = (props) => {
  const {
    currentTime,
    duration,
    handleTimeline,
    content,
    isPlaying,
    togglePlay,
    toggleExpand,
  } = props;
  const isLoading = (currentTime === 0 && duration === 0);

  const poster = content?.imageSet?.length > 0 ? content?.imageSet?.find(o => o.type === 'BackgroundImage').url : null;
  const title = content?.snippet?.title;
  const description = content?.snippet?.description;
  
  return (
    <div className="mobile-cast-miniplayer">
      <div className="mobile-cast-miniplayer__timeline">
        <SliderBar
          noControls
          loading={isLoading}
          value={currentTime}
          max={duration}
          handleChange={handleTimeline}
        />
      </div>
      <div className="mobile-cast-miniplayer__container">
        <div className="mobile-cast-miniplayer__container-left" onClick={toggleExpand}>
          <div className="mobile-cast-miniplayer__container-left-poster">
            {poster && (
              <Image src={poster} height={61} width={110} alt="poster" />
            )}
          </div>
        </div>
        <div className="mobile-cast-miniplayer__container-title" onClick={toggleExpand}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="mobile-cast-miniplayer__container-control">
          <PlayPauseButton isPlaying={isPlaying} onClick={togglePlay} />
        </div>
      </div>
    </div>
  )
};

export default MobileCastMiniplayer;
