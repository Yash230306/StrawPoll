import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoll, votePoll } from '../store';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const VotePoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundPoll = getPoll(id);
    if (foundPoll) {
      setPoll(foundPoll);
    } else {
      setError('Poll not found');
    }
  }, [id]);

  const handleVote = () => {
    if (selectedOption === null) return;
    
    const success = votePoll(id, selectedOption);
    if (success) {
      navigate(`/poll/${id}/results`);
    } else {
      setError('Failed to cast vote');
    }
  };

  const navigateToResults = () => {
    navigate(`/poll/${id}/results`);
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

  return (
    <div className="card glass-panel animate-fade-in">
      <h1 className="card-title">{poll.question}</h1>
      <p className="card-subtitle">Make your choice and click vote.</p>

      <div className="vote-options">
        {poll.options.map((option, index) => (
          <div
            key={index}
            className={`vote-option animate-slide-in ${selectedOption === index ? 'selected' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedOption(index)}
          >
            <div className="radio-circle">
              <div className="radio-dot"></div>
            </div>
            <span className="vote-text">{option.text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={navigateToResults}>
          View Results
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleVote}
          disabled={selectedOption === null}
          style={{ opacity: selectedOption === null ? 0.5 : 1, cursor: selectedOption === null ? 'not-allowed' : 'pointer' }}
        >
          Vote <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default VotePoll;
