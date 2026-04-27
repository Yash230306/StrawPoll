import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoll, votePoll } from '../store';
import { AlertCircle, Check } from 'lucide-react';

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
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create a New Poll
        </button>
      </div>
    );
  }

  if (!poll) return null;

  return (
    <div className="animate-fade-in pb-12">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        
        <div className="p-4 sm:p-6 sm:pb-8 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{poll.question}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Make your choice and click vote.</p>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="space-y-3 mb-6">
            {poll.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`flex items-center space-x-3 p-4 rounded-md border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center border ${
                    isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700'
                  }`}>
                    {isSelected && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <span className={`text-base ${isSelected ? 'font-medium text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-200'}`}>
                    {option.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <button
              onClick={handleVote}
              disabled={selectedOption === null}
              className={`w-full sm:w-auto inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Vote
            </button>
            <button
              onClick={navigateToResults}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Show results
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VotePoll;
