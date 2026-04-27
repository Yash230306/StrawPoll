import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../store';
import { GripVertical, X, Image as ImageIcon, Plus, ChevronDown, Settings2, Shield, Calendar, AlignLeft, EyeOff, Lock, MonitorOff, UserX } from 'lucide-react';

const RankingPoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Settings
  const [requireNames, setRequireNames] = useState(false);
  const [votingSecurity, setVotingSecurity] = useState('ip'); // ip, none, browser
  const [blockVPN, setBlockVPN] = useState(false);
  const [useCaptcha, setUseCaptcha] = useState(false);
  const [hideResults, setHideResults] = useState(false);
  const [allowComments, setAllowComments] = useState(true);

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
    if (!title.trim() || validOptions.length < 2) {
      alert('Please enter a title and at least two options.');
      return;
    }

    const pollId = createPoll(title.trim(), validOptions);
    navigate(`/poll/${pollId}`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Poll Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border-t-4 border-yellow-400 mb-12">
          <form onSubmit={handleSubmit}>
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Title Section */}
              <div>
                <label htmlFor="title" className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Title
                </label>
                <div className="relative">
                  <textarea
                    id="title"
                    rows={2}
                    className="w-full text-lg sm:text-xl border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 focus:ring-0 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors resize-none placeholder-gray-400"
                    placeholder="Type your question here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <button type="button" className="mt-3 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                  <Plus className="h-4 w-4 mr-1" /> Add description or image
                </button>
              </div>

              {/* Poll Type Section */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Poll type
                </label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 pr-10 text-gray-700 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-indigo-500 font-medium"
                    defaultValue="ranking"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'meeting') navigate('/meetings');
                      else if (val === 'multiple') navigate('/');
                      else if (val === 'ranking') navigate('/ranking');
                      else if (val === 'image') navigate('/image');
                    }}
                  >
                    <option value="multiple">Multiple choice</option>
                    <option value="meeting">Meeting poll</option>
                    <option value="ranking">Ranking poll</option>
                    <option value="image">Image poll</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Answer Options Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100">
                    Answer Options (Items to rank)
                  </label>
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                    Paste answers
                  </button>
                </div>
                
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 group">
                      <div className="cursor-grab p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="relative flex-1 flex items-center">
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 pr-10 focus:ring-0 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400"
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          required={index < 2}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
                          <button type="button" className="p-1 text-gray-400 hover:text-indigo-500 transition-colors">
                            <ImageIcon className="h-5 w-5" />
                          </button>
                          {options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              title="Remove option"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center space-x-4 pl-8">
                  <button
                    type="button"
                    onClick={addOption}
                    className="inline-flex items-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Add option
                  </button>
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                    Add "Other"
                  </button>
                </div>
              </div>

              {/* Settings Divider */}
              <div className="border-t-2 border-gray-100 dark:border-gray-700 pt-8 mt-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Settings</h3>
                
                <div className="space-y-6">
                  {/* Basic Settings */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <label className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                        <UserX className="h-5 w-5 mr-2 text-gray-400" />
                        Require participant names
                      </label>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 ml-7">Voters must enter their name before voting.</p>
                    </div>
                    <div className="flex items-center h-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={requireNames} onChange={() => setRequireNames(!requireNames)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="text-base font-medium text-gray-900 dark:text-white flex items-center mb-2">
                      <Shield className="h-5 w-5 mr-2 text-gray-400" />
                      Voting security
                    </label>
                    <div className="ml-7 relative">
                      <select
                        className="block w-full appearance-none border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 pr-10 text-gray-700 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-indigo-500 font-medium"
                        value={votingSecurity}
                        onChange={(e) => setVotingSecurity(e.target.value)}
                      >
                        <option value="ip">One vote per IP address</option>
                        <option value="browser">One vote per browser session</option>
                        <option value="none">No security (not recommended)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <label className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                        <MonitorOff className="h-5 w-5 mr-2 text-gray-400" />
                        Block VPN users
                      </label>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 ml-7">Prevent voting from known VPNs or proxies.</p>
                    </div>
                    <div className="flex items-center h-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={blockVPN} onChange={() => setBlockVPN(!blockVPN)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Advanced Settings Toggle */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="text-base font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center"
                    >
                      {showAdvanced ? 'Hide advanced settings' : 'Show advanced settings'}
                      <ChevronDown className={`h-5 w-5 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Advanced Settings Panel */}
                  {showAdvanced && (
                    <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-700 animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <label className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <EyeOff className="h-5 w-5 mr-2 text-gray-400" />
                            Hide results
                          </label>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 ml-7">Results are hidden from voters.</p>
                        </div>
                        <div className="flex items-center h-6">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={hideResults} onChange={() => setHideResults(!hideResults)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <label className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <AlignLeft className="h-5 w-5 mr-2 text-gray-400" />
                            Allow comments
                          </label>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 ml-7">Voters can leave comments on the poll.</p>
                        </div>
                        <div className="flex items-center h-6">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={allowComments} onChange={() => setAllowComments(!allowComments)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Submit Button Area */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 sm:p-8 border-t-2 border-gray-100 dark:border-gray-700 flex flex-col items-center sm:flex-row sm:justify-end sm:items-center space-y-4 sm:space-y-0">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium mr-6"
              >
                Save as draft
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Create Ranking Poll
              </button>
            </div>
          </form>
        </div>

        {/* Post Form Landing Page Content */}
        
        {/* Statistics Section */}
        <div className="py-12 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">10M+</p>
              <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">Users</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">2M+</p>
              <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">Polls Created</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">50M+</p>
              <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">Votes Cast</p>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="py-16 text-center">
          <h3 className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-2">Getting Started</h3>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-12">How to use StrawPoll in three simple steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="relative">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">1</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Create your poll</h4>
              <p className="text-gray-500 dark:text-gray-400">Fill out the form above. Add your question, options, and configure the settings to match your needs.</p>
            </div>
            <div className="relative">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">2</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Share with your audience</h4>
              <p className="text-gray-500 dark:text-gray-400">Copy the generated link and share it on social media, in your Discord server, or via email.</p>
            </div>
            <div className="relative">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">3</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Analyze results</h4>
              <p className="text-gray-500 dark:text-gray-400">Watch the votes come in live in real-time. Use our detailed analytics to understand your audience.</p>
            </div>
          </div>
        </div>

      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-t border-b border-indigo-100 dark:border-indigo-800/30 py-16 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Ready to get started? Make your first poll today.</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
              Create your poll
            </button>
            <button onClick={() => navigate('/signup')} className="px-8 py-3 text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 transition-colors flex items-center">
              Sign up <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RankingPoll;
