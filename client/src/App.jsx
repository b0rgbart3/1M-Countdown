import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pointerIcon from './assets/pointer.svg';
import './App.css';

function App() {
  const [data, setData] = useState({ 'block height': null, countdown: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const fetchBlockInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/block-info');
      setData(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching block info:', err);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockInfo();
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          fetchBlockInfo();
          return 60;
        }
        return prev - 1;
      });
    }, 1000); // Polling every 1 second to update the countdown
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : '---';
  };

  const calculateEstimatedDate = (countdown) => {
    if (!countdown) return '---';
    const totalMinutes = countdown * 10;
    const now = new Date();
    const estimatedDate = new Date(now.getTime() + totalMinutes * 60 * 1000);
    const day = String(estimatedDate.getDate()).padStart(2, '0');
    const month = String(estimatedDate.getMonth() + 1).padStart(2, '0');
    const year = estimatedDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="app-container">
      <a
        href="https://bartdorityportfolio.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="top-left-link"
      >
        Created by BD
      </a>
      <a
        href="https://moon-math.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="top-right-link"
      >
        &infin;
      </a>
      <div className="countdown-card">
        <h2 className="title">Bitcoin One Millionth Block<br />Countdown Counter</h2>

        <div className="content">
          <h3 className="subtitle">Blocks left to be mined<br />
            (before the one millionth block):</h3>

          <div className="counter-display">
            {loading ? '...' : error ? 'Error' : formatNumber(data.countdown)}
          </div>
          <div className="estimated-date">
            Estimated date: {calculateEstimatedDate(data.countdown)}
          </div>
          <div className="footer-info">
            Current Block:<span className="block-height">{formatNumber(data['block height'])}</span>

          </div>
        </div>
      </div>
      <div className="inspired-container">
        <img src={pointerIcon} alt="pointer" className="pointer-icon" />
        <a
          href="https://timechaincalendar.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inspired-link"
        >
          Inspired by: the Timechain Calendar
        </a>
      </div>
      <div className="interval-display">
        Syncing in: {secondsLeft}s
      </div>
    </div>
  );
}

export default App;
