import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoll } from '../store';
import { AlertCircle, Link as LinkIcon, Download } from 'lucide-react';

const PollResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const foundPoll = getPoll(id);
    if (foundPoll) {
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
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create a New Poll
        </button>
      </div>
    );
  }

  if (!poll) return null;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="animate-fade-in pb-12">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        
        <div className="p-4 sm:p-6 sm:pb-8 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{poll.question}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{totalVotes} votes</p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="space-y-6 mb-8">
            {poll.options.map((option, index) => {
              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
              const isWinner = index === 0 && option.votes > 0;
              
              return (
                <div key={index} className="relative">
                  <div className="flex justify-between items-end mb-1">
                    <span className={`text-base font-medium ${isWinner ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {option.text}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {option.votes} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-sm h-6 overflow-hidden">
                    <div 
                      className={`h-6 rounded-sm transition-all duration-1000 ease-out ${isWinner ? 'bg-indigo-500' : 'bg-gray-400 dark:bg-gray-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Share this poll to get more votes
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  readOnly
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={`${window.location.origin}/poll/${id}`}
                />
              </div>
              <button
                onClick={copyToClipboard}
                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-r-md text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <Copy className="h-4 w-4 text-gray-400" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Create a new poll
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PollResults;
