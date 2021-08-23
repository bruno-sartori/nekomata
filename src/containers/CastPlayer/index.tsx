import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { closeCastPlayerAction, setCastPlayerPlayAction } from '@actions/cast-player';
// Lib
import ChromecastManager from '@lib/external/ChromecastManager';
// Components
import CastPlayer from '@components/CastPlayer';
import MobileCastPlayer from '@components/MobileCastPlayer';

const CastPlayerContainer: React.FC = () => {
  const chromecastManager = new ChromecastManager();
  // selectors
  const chromecast = useSelector((state: IPrismState) => state.chromecast);
  const castPlayer = useSelector((state: IPrismState) => state.castPlayer);
  // state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isDragging, setIsDragging] = useState(false);
  // dispatch
  const dispatch = useDispatch();
  const isPlaying = chromecast.videoContent.playerState === 'PLAYING';
  const display = chromecast.active && castPlayer.isShowing;

  useEffect(() => {
    if (chromecast.videoContent.currentTime && !isDragging) {
      setCurrentTime(chromecast.videoContent.currentTime);
    }
  }, [chromecast.videoContent.currentTime]);

  const togglePlay = (event: any) => {
    event.preventDefault();

    if (chromecast.active && isPlaying) {
      chromecastManager.sendPauseMessage();
    } else {
      chromecastManager.sendPlayMessage();
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = (event: any) => {
    setIsDragging(false);
    chromecastManager.sendSeekToMessage(event.target.value);
  };

  const handleTimeline = (event: any) => {
    event.preventDefault();
    setCurrentTime(event.target.value);
  };

  const handleForward = (event: any) => {
    event.preventDefault();
    chromecastManager.sendForwardMessage();
  };

  const handleBackward = (event: any) => {
    event.preventDefault();
    chromecastManager.sendRewindMessage();
  };

  const handleVolume = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setVolume(value);
    chromecastManager.setVolume(value / 100);
  };

  const toggleMute = (event: any) => {
    event.preventDefault();
    const isMute = Number(volume) === 0;
    
    if (isMute) {
      setVolume(prevVolume);
      chromecastManager.setVolume(prevVolume / 100);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      chromecastManager.setVolume(0);
    }
  };

  const closePlayer = () => {
    setCurrentTime(0);
    setDuration(0);
    dispatch(closeCastPlayerAction());
    chromecastManager.sendStopMessage();
  };

  const onPlayerLoaded = () => {
    const chromecastVolume = chromecastManager.getVolume();
    setCurrentTime(0);
    setDuration(chromecast.videoContent.duration);
    setVolume(chromecastVolume * 100);
    dispatch(setCastPlayerPlayAction());
  };

  return (
    <>
      <CastPlayer
        display={display}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        volume={volume}
        deviceName={chromecast.deviceName}
        content={chromecast.content}
        onPlayerLoaded={onPlayerLoaded}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        handleTimeline={handleTimeline}
        handleBackward={handleBackward}
        handleForward={handleForward}
        handleVolume={handleVolume}
        handleClose={closePlayer}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
      />
      <MobileCastPlayer
        display={display}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        volume={volume}
        deviceName={chromecast.deviceName}
        content={chromecast.content}
        onPlayerLoaded={onPlayerLoaded}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        handleTimeline={handleTimeline}
        handleBackward={handleBackward}
        handleForward={handleForward}
        handleVolume={handleVolume}
        handleClose={closePlayer}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
      />
    </>
  );
};

export default CastPlayerContainer;
