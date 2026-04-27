import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../store';
import { GripVertical, X, Image as ImageIcon, Settings2, BarChart2, Calendar, Image as ImageTabIcon, ListOrdered } from 'lucide-react';

const CreatePoll = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [activeTab, setActiveTab] = useState('multiple');

  // Settings
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [requireNames, setRequireNames] = useState(false);
  const [hideResults, setHideResults] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (!question.trim() || validOptions.length < 2) {
      alert('Please enter a question and at least two options.');
      return;
    }

    const pollId = createPoll(question.trim(), validOptions);
    navigate(`/poll/${pollId}`);
  };

  const tabs = [
    { id: 'multiple', name: 'Multiple choice', icon: BarChart2 },
    { id: 'meeting', name: 'Meeting poll', icon: Calendar },
    { id: 'image', name: 'Image poll', icon: ImageTabIcon },
    { id: 'ranking', name: 'Ranking poll', icon: ListOrdered },
  ];

  return (
    <div className="animate-fade-in pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create a Poll</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Complete the below fields to create your poll.</p>

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center justify-center sm:flex-row sm:space-x-2 transition-colors ${
                    isActive
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400'}`} />
                  <span className="mt-1 sm:mt-0 hidden sm:block">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Question Field */}
            <div>
              <label htmlFor="question" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
                Question
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  id="question"
                  rows={2}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-3 transition-colors resize-y"
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Options List */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                  Answers
                </label>
              </div>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 group">
                    <div className="cursor-grab p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="relative flex-1 flex items-center">
                      <input
                        type="text"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-3 pr-10 shadow-sm"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required={index < 2}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-indigo-500">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                    </div>
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove option"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between pl-10">
                <button
                  type="button"
                  onClick={addOption}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Add option
                </button>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Add "Other"
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Settings2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Allow multiple answers</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Voters can select more than one option.</p>
                </div>
                <div className="ml-4 flex items-center h-5">
                  <label className="toggle-switch">
                    <input type="checkbox" checked={allowMultiple} onChange={() => setAllowMultiple(!allowMultiple)} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Require participant names</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Voters must enter their name before voting.</p>
                </div>
                <div className="ml-4 flex items-center h-5">
                  <label className="toggle-switch">
                    <input type="checkbox" checked={requireNames} onChange={() => setRequireNames(!requireNames)} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Hide results</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Results are hidden from voters.</p>
                </div>
                <div className="ml-4 flex items-center h-5">
                  <label className="toggle-switch">
                    <input type="checkbox" checked={hideResults} onChange={() => setHideResults(!hideResults)} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Create poll
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              By creating a poll, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
