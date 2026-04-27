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
  const pollIndex = polls.findIndex(p => p.id === id);
  if (pollIndex === -1) return false;

  polls[pollIndex].options[optionIndex].votes += 1;
  savePolls(polls);
  return true;
};

// Generate fake sample demo polls
export const createDemoPoll = (type) => {
  const polls = getPolls();
  const id = crypto.randomUUID();
  let poll = null;

  if (type === 'anonymous') {
    poll = {
      id,
      question: 'What is your favorite weekend activity?',
      options: [
        { text: 'Watching Movies', votes: 142 },
        { text: 'Hiking/Outdoors', votes: 89 },
        { text: 'Gaming', votes: 215 },
        { text: 'Reading', votes: 45 }
      ],
      createdAt: new Date().toISOString()
    };
  } else if (type === 'group') {
    poll = {
      id,
      question: 'Where should we go for the graduation lunch?',
      options: [
        { text: 'Italian Restaurant', votes: 12 },
        { text: 'Sushi Buffet', votes: 8 },
        { text: 'Burger Joint', votes: 15 },
        { text: 'Mexican Grill', votes: 5 }
      ],
      createdAt: new Date().toISOString()
    };
  } else if (type === 'meeting') {
    poll = {
      id,
      question: 'Weekly Team Sync - Select best time',
      options: [
        { text: 'Mon, Oct 12 at 10:00 AM', votes: 5 },
        { text: 'Mon, Oct 12 at 02:00 PM', votes: 2 },
        { text: 'Tue, Oct 13 at 11:00 AM', votes: 8 },
        { text: 'Wed, Oct 14 at 09:00 AM', votes: 1 }
      ],
      createdAt: new Date().toISOString()
    };
  }

  if (poll) {
    polls.push(poll);
    savePolls(polls);
    return id;
  }
  return null;
};
