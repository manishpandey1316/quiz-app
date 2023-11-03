import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer({totalSeconds, setTotalSeconds}) {
  

  useEffect(() => {
    const timer = setInterval(() => {
      if (totalSeconds > 0) {
        setTotalSeconds(totalSeconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [totalSeconds]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="timer-container">
      <div className="timer">
        <span id="minutes">{String(minutes).padStart(2, '0')}</span>:
        <span id="seconds">{String(seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

export default Timer;
