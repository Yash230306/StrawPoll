export const createPoll = (question, options) => {
  const id = crypto.randomUUID();
  const newPoll = {
    id,
    question,
    options: options.map((opt) => ({ text: opt, votes: 0 })),
    createdAt: new Date().toISOString(),
  };

  const polls = getPolls();
  polls.push(newPoll);
  savePolls(polls);

  return id;
};

export const getPolls = () => {
  const polls = localStorage.getItem('strawpolls');
  return polls ? JSON.parse(polls) : [];
};

export const savePolls = (polls) => {
  localStorage.setItem('strawpolls', JSON.stringify(polls));
};

export const getPoll = (id) => {
  const polls = getPolls();
  return polls.find((p) => p.id === id);
};

export const votePoll = (id, optionIndex) => {
  const polls = getPolls();
  const pollIndex = polls.findIndex((p) => p.id === id);
  if (pollIndex !== -1) {
    polls[pollIndex].options[optionIndex].votes += 1;
    savePolls(polls);
    return true;
  }
  return false;
};
