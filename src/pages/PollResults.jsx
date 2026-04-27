import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoll } from '../store';
import { Share2, Copy, AlertCircle, PlusCircle } from 'lucide-react';

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
      <div className="card glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
        <AlertCircle size={48} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
        <h1 className="card-title">Oops!</h1>
        <p className="card-subtitle">{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Create a New Poll
        </button>
      </div>
    );
  }

  if (!poll) return null;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="card glass-panel animate-fade-in">
      <h1 className="card-title">{poll.question}</h1>
      <p className="card-subtitle">Total Votes: {totalVotes}</p>

      <div className="results-list">
        {poll.options.map((option, index) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          
          return (
            <div key={index} className="result-item animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="result-header">
                <span>{option.text}</span>
                <span className="result-votes">{option.votes} votes ({percentage}%)</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-bar" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="share-section">
        <p style={{ color: 'var(--text-secondary)' }}>Share this poll to get more votes:</p>
        <div className="share-url">
          <span>{`${window.location.origin}/poll/${id}`}</span>
          <button className="btn-icon copy-btn" onClick={copyToClipboard} title="Copy URL">
            {copied ? <span style={{ color: 'var(--success)' }}>Copied!</span> : <Copy size={20} />}
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-secondary" onClick={() => navigate(`/poll/${id}`)}>
             Vote Again
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Create New Poll <PlusCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
