import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pointerIcon from './assets/pointer.svg';
import './App.css';

function App() {
  const [data, setData] = useState({ 'block height': null, countdown: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [showIntro, setShowIntro] = useState(true);
  const [startContentFade, setStartContentFade] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const fetchBlockInfo = async (animate = false) => {
    if (animate) {
      setIsRefreshing(true);
      // Wait for fade out (approx 1s)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    try {
      const response = await axios.get('/api/block-info');
      if (response.data?.countdown !== data.countdown) {
        setAnimationKey(prev => prev + 1);
      }
      setData(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching block info:', err);
      setError('Failed to fetch data');
      setLoading(false);
    }

    if (animate) {
      // The animation total duration is 3s. We waited 1s already.
      // Wait 2 more seconds before removing the class.
      setTimeout(() => {
        setIsRefreshing(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchBlockInfo();
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          fetchBlockInfo(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000); // Polling every 1 second to update the countdown
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Start fading content at the same time as portalExpand (3s)
    const fadeTimer = setTimeout(() => {
      setStartContentFade(true);
    }, 1200);

    // Completely remove intro after expansion finishes (4.5s)
    const removeTimer = setTimeout(() => {
      setShowIntro(false);
    }, 5400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
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
    <>
      {showIntro && (
        <div className={`intro-overlay ${startContentFade ? 'transparent-bg' : ''}`}>
          <div className="portal-circle"></div>
        </div>
      )}
      <div className={`app-container ${startContentFade ? 'fade-in' : ''}`}>
        {animationKey > 0 && (
          <div key={animationKey} className="animation-overlay">
            <div className="expanding-ring"></div>
          </div>
        )}
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

            <div className={`counter-display ${isRefreshing ? 'refreshing' : ''}`}>
              {loading ? '...' : error ? 'Error' : formatNumber(data.countdown)}
            </div>
            <div className="estimated-date">
              Estimated date: {calculateEstimatedDate(data.countdown)}
            </div>
            <div className="footer-info">
              Current Block: <span className="block-height">{formatNumber(data['block height'])}</span>
            </div>
            <button className="more-info-btn" onClick={() => setIsModalOpen(true)}>
              More Info
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>millionthblock-countdown.com</h3>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="modal-section">
                  <h4 className="modal-subtitle">What is the One Millionth Block?</h4>
                  <p className="modal-text">
                    The one millionth block represents a historic milestone in the Bitcoin network.
                    Since its genesis in 2009, Bitcoin has been reliably producing blocks approximately
                    every 10 minutes, creating an immutable record of global transactions.
                  </p>
                </div>
                <div className="modal-section">
                  <h4 className="modal-subtitle">How is the date estimated?</h4>
                  <p className="modal-text">
                    This countdown calculates the estimated arrival time by multiplying the remaining
                    blocks by the average 10-minute block interval. As the network's hash rate fluctuates,
                    the actual date may arrive slightly sooner or later than projected.
                    <br />
                    This counter syncs with the mempool every 60 seconds.  As we get closer to the millionth block,
                    we will adjust this to sync more frequently.
                  </p>
                </div>
                <div className="modal-section">
                  <h4 className="modal-subtitle">How was this site created?</h4>
                  <p className="modal-text">
                    This countdown was created by <a href='https://bartdorityportfolio.online/' target='_blank' rel='noopener noreferrer'>Bart Dority</a>.
                    <br />It was inspired by the <a href=' https://timechaincalendar.com' target='_blank' rel='noopener noreferrer'>Timechain Calendar</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
    </>
  );
}

export default App;
