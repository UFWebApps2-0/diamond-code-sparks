import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import PauseBreaks from './PauseBreaks';
import TextBox from './TextBox';

const VideoEditor = ({ videoLink }) => {
    const [pauseBreaks, setPauseBreaks] = useState([]);
    const [isVideoPaused, setIsVideoPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [textSubmissions, setTextSubmissions] = useState([]);

    const playerRef = useRef();
  
    const handleProgress = (state) => {
      setCurrentTime(state.playedSeconds);
    };
  
    const handleAddPauseBreak = (time) => {
      setPauseBreaks([...pauseBreaks, time]);
    };
  
    const handleRemovePauseBreak = (time) => {
      setPauseBreaks(pauseBreaks.filter((pb) => pb !== time));
    };
  
    const handleInteractionSubmit = (pauseBreakTime, interactionText) => {
      setTextSubmissions([...textSubmissions, { time: pauseBreakTime, text: interactionText }]);
      console.log(`Text at time ${pauseBreakTime}: ${interactionText}`);
    };

    const renderTextForCurrentTime = () => {
      const submission = textSubmissions.find(sub => Math.abs(currentTime - sub.time) < 0.5);
      if (submission) {
          return <div className="text-overlay">{submission.text}</div>;
      }
      return null;
    };



    useEffect(() => {
      const nearPauseBreak = pauseBreaks.find((pauseBreak) => Math.abs(currentTime - pauseBreak) < 0.5);
      if (nearPauseBreak !== undefined && !isVideoPaused) {
        setIsVideoPaused(true);
      }
    }, [currentTime, pauseBreaks, isVideoPaused]);
  
    return (
      <div className="video-editor">
        <ReactPlayer
          ref={playerRef}
          url={videoLink}
          width= '460px'
          height= '315px'
          controls={true}
          onProgress={handleProgress}
          playing={!isVideoPaused}
          onPlay={() => setIsVideoPaused(false)}
          onPause={() => setIsVideoPaused(true)}
          onError={() => console.error('Error playing video')}
        />
  
        <PauseBreaks
          pauseBreaks={pauseBreaks}
          onAddPauseBreak={handleAddPauseBreak}
          onRemovePauseBreak={handleRemovePauseBreak}
          playerRef={playerRef}
          isVideoPaused={isVideoPaused}
        />
        
        <TextBox
            pauseBreaks={pauseBreaks}
            isVideoPaused={isVideoPaused}
            currentTime={currentTime}
            onInteractionSubmit={handleInteractionSubmit}
        />

      </div>
    );
  };
  
  export default VideoEditor;
