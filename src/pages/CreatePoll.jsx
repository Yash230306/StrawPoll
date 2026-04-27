import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GripVertical, X } from 'lucide-react';
import { createPoll } from '../store';

const CreatePoll = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [requireNames, setRequireNames] = useState(false);

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

  return (
    <div className="card animate-fade-in">
      <div className="card-top-bar"></div>
      <div className="card-content">
        <h1 className="card-title">Create a Poll</h1>
        <p className="card-subtitle">Complete the below fields to create your poll.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="question">Question</label>
            <textarea
              id="question"
              className="textarea-input"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Answers</label>
            <div className="options-list">
              {options.map((option, index) => (
                <div key={index} className="option-item animate-slide-in">
                  <div className="option-handle"><GripVertical size={16} /></div>
                  <input
                    type="text"
                    className="text-input"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required={index < 2}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => removeOption(index)}
                      title="Remove option"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="option-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addOption}
                style={{ flex: 1 }}
              >
                Add Option
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="settings-title">Settings</h2>
            <div className="settings-grid">
              
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Allow multiple answers</span>
                  <span className="setting-desc">Voters can select more than one option.</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={allowMultiple} 
                    onChange={() => setAllowMultiple(!allowMultiple)} 
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Require participant names</span>
                  <span className="setting-desc">Voters must enter their name before voting.</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={requireNames} 
                    onChange={() => setRequireNames(!requireNames)} 
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Create poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
