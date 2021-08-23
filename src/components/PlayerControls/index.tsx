import React from 'react';
// Helpers
import { formatTime } from '@utils/string';
// Components
import PlayPauseButton from '@components/PlayPauseButton';
import SliderBar from '@components/SliderBar';
// Icons
import BackwardIcon from '@images/icons/backward.svg';
import ForwardIcon from '@images/icons/forward.svg';
import NextIcon from '@images/icons/next-episode.svg';
import PrevIcon from '@images/icons/prev-episode.svg';

interface IPlayerControlsProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  hasPrev?: boolean;
  hasNext?: boolean;
  handleChange: (e: any) => void;
  togglePlay: (e: any) => void;
  handleForward: (e: any) => void;
  handleBackward: (e: any) => void;
  handlePrev?: () => void;
  handleNext?: () => void;
  handleMouseUp?: (e: any) => void;
  handleMouseDown?: (e: any) => void;
}

const PlayerControls: React.FC<IPlayerControlsProps> = (props) => {
  const {
    currentTime,
    duration,
    isPlaying,
    hasPrev,
    hasNext,
    handleChange,
    togglePlay,
    handleForward,
    handleBackward,
    handlePrev,
    handleNext,
    handleMouseUp,
    handleMouseDown,
  } = props;
  const isLoading = (currentTime === 0 && duration === 0);

  const Previous = () => (
    <img
      className="controls__prev"
      alt="controles: anterior"
      src={PrevIcon}
      onClick={handlePrev}
    />
  );

  const Backward = () => (
    <img
      className="controls__backward"
      alt="controles: retroceder"
      src={BackwardIcon}
      onClick={handleBackward}
    />
  );

  const Forward = () => (
    <img
      className="controls__forward"
      alt="controles: avançar"
      src={ForwardIcon}
      onClick={handleForward}
    />
  );

  const Next = () => (
    <img
      className="controls__next"
      alt="controles: próximo"
      src={NextIcon}
      onClick={handleNext}
    />
  );

  return (
    <div className="timeline">
      <div className={`timeline-control ${duration === Infinity && 'timeline-control--disabled'}`}>
        <div className="timeline-timers">
          <span>{isLoading ? <>&nbsp;</> : formatTime(currentTime)}</span>
          <span>{isLoading ? <>&nbsp;</> : formatTime(duration)}</span>
        </div>
        <SliderBar
          loading={isLoading}
          value={currentTime}
          max={duration}
          handleChange={handleChange}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
        />
      </div>
      <div className="controls">
        {hasPrev && (
          <Previous />
        )}
        {duration !== Infinity && (
          <Backward />
        )}
        <PlayPauseButton 
          isPlaying={isPlaying}
          onClick={togglePlay}
        />
        {duration !== Infinity && (
          <Forward />
        )}
        {hasNext && (
          <Next />
        )}
      </div>
    </div>
  );
};

export default PlayerControls;
