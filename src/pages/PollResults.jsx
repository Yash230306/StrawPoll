import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoll } from '../store';
import { Copy, AlertCircle } from 'lucide-react';

const PollResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const foundPoll = getPoll(id);
    if (foundPoll) {
      // Sort options by votes descending
      const sortedPoll = {
        ...foundPoll,
        options: [...foundPoll.options].sort((a, b) => b.votes - a.votes)
      };
      setPoll(sortedPoll);
    } else {
      setError('Poll not found');
    }
  }, [id]);

  const copyToClipboard = () => {
    const url = `${window.location.origin}/poll/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <div className="card animate-fade-in" style={{ textAlign: 'center' }}>
        <div className="card-top-bar"></div>
        <div className="card-content">
          <AlertCircle size={48} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
          <h1 className="card-title">Oops!</h1>
          <p className="card-subtitle">{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Create a New Poll
          </button>
        </div>
      </div>
    );
  }

  if (!poll) return null;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="card animate-fade-in">
      <div className="card-top-bar"></div>
      <div className="card-content">
        <h1 className="card-title">{poll.question}</h1>
        <p className="card-subtitle">{totalVotes} votes</p>

        <div className="results-list">
          {poll.options.map((option, index) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            
            return (
              <div key={index} className="result-item animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="result-header">
                  <span>{option.text}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{option.votes} votes</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                  <span className="result-percentage">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="share-box">
          <input type="text" readOnly value={`${window.location.origin}/poll/${id}`} />
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn btn-secondary" style={{ border: 'none', background: 'transparent' }} onClick={() => navigate('/')}>
            Create a poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
