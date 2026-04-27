import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createDemoPoll } from '../store';
import { Users, UserCircle2, CalendarDays } from 'lucide-react';

const Demo = () => {
  const navigate = useNavigate();

  const handleDemoClick = (type) => {
    const id = createDemoPoll(type);
    if (id) {
      navigate(`/poll/${id}`);
    }
  };

  return (
    <div className="animate-fade-in pb-12 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Live Demo
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          See how easy it is to conduct a poll with live results using StrawPoll.
        </p>
      </div>

      <div className="space-y-16">
        
        {/* Anonymous Polls */}
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <UserCircle2 className="h-8 w-8 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Anonymous polls</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Anonymous polls are mainly used to find out the majority opinion of a medium to large group. StrawPoll offers the setting options whether participants can submit one or more choices, or whether participants can add their own answers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => handleDemoClick('anonymous')}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-500 transition-all group"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                Poll your own followers
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A creator asking his/her followers about their preferences.
              </p>
            </div>
            <div 
              onClick={() => handleDemoClick('anonymous')}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-500 transition-all group"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                Monthly awards
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A company that wants to give back to its employees.
              </p>
            </div>
          </div>
        </section>

        {/* Group Polls */}
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Group polls</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Group polls are just the thing when the opinion of the individual is important. It is activated by enabling the "Require participant names" option. We offer a number of different voting types, which are recommended depending on the number of participants in the poll.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => handleDemoClick('group')}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-500 transition-all group"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                Small group decision
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A group of friends vote on weekend plans.
              </p>
            </div>
            <div 
              onClick={() => handleDemoClick('group')}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-500 transition-all group"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                Large group decision
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A school class votes on their graduation lunch.
              </p>
            </div>
          </div>
        </section>

        {/* Meeting Polls */}
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <CalendarDays className="h-8 w-8 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meeting polls</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Meeting polls (or scheduling polls) are basically group polls with the peculiarity that the answer options consist of dates or times. These are great for planning meetings or finding a common date with friends.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => handleDemoClick('meeting')}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-500 transition-all group"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                Meeting poll
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Find a date that suits everyone best.
              </p>
            </div>
            <div 
              onClick={() => handleDemoClick('meeting')}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-500 transition-all group"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                Custom option limits
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                An online course at various times, each with a limited number of slots.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Demo;
