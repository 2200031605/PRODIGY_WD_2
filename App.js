import React, { useState, useEffect } from 'react';
import './App.css';
import './style.css';

function App() {
  const [timer, setTimer] = useState(null);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const startStop = () => {
    if (running) {
      clearInterval(timer);
    } else {
      const newTimer = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Update time every 10 milliseconds
      }, 10);
      setTimer(newTimer);
    }
    setRunning(!running);
  };

  const reset = () => {
    clearInterval(timer);
    setTime(0);
    setRunning(false);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    let hours = Math.floor(time / 360000);
    let minutes = Math.floor((time % 360000) / 6000);
    let seconds = Math.floor((time % 6000) / 100);
    let milliseconds = time % 100;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
  };

  const pad = (number, width = 2) => {
    return String(number).padStart(width, '0');
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div id="display">{formatTime(time)}</div>
      <button id="startStop" onClick={startStop}>{running ? 'Stop' : 'Start'}</button>
      <button id="reset" onClick={reset}>Reset</button>
      <button id="lap" onClick={lap}>Lap</button>
      <ul id="laps">
        {laps.map((lapTime, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
