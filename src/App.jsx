import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreatePoll from './pages/CreatePoll';
import VotePoll from './pages/VotePoll';
import PollResults from './pages/PollResults';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CreatePoll />} />
          <Route path="poll/:id" element={<VotePoll />} />
          <Route path="poll/:id/results" element={<PollResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;