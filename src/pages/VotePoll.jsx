import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoll, votePoll } from '../store';
import { AlertCircle } from 'lucide-react';

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

  return (
    <div className="card animate-fade-in">
      <div className="card-top-bar"></div>
      <div className="card-content">
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
              <div className="checkbox-square">
                {selectedOption === index && (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="vote-text">{option.text}</span>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleVote}
          disabled={selectedOption === null}
          style={{ opacity: selectedOption === null ? 0.5 : 1, cursor: selectedOption === null ? 'not-allowed' : 'pointer' }}
        >
          Vote
        </button>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button className="btn btn-secondary" style={{ border: 'none', background: 'transparent' }} onClick={navigateToResults}>
            Show results
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotePoll;
