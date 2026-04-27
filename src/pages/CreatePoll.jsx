import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Send } from 'lucide-react';
import { createPoll } from '../store';

const CreatePoll = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);

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
    <div className="card glass-panel animate-fade-in">
      <h1 className="card-title">Create a Poll</h1>
      <p className="card-subtitle">Complete the fields below to create your poll.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="question">Question</label>
          <input
            id="question"
            type="text"
            className="text-input"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="options-list">
          <label className="input-label">Options</label>
          {options.map((option, index) => (
            <div key={index} className="option-item animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
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
                  className="btn-icon btn-danger"
                  onClick={() => removeOption(index)}
                  title="Remove option"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addOption}
          >
            <Plus size={18} /> Add Option
          </button>

          <button type="submit" className="btn btn-primary">
            Create Poll <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
