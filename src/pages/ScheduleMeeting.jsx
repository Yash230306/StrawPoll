import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings2, Plus, X, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { createPoll } from '../store';

const ScheduleMeeting = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Array of dates: { date: Date string, isAllDay: boolean, times: string[] }
  const [selectedDates, setSelectedDates] = useState([]);

  // Settings
  const [requireNames, setRequireNames] = useState(false);
  const [hideResults, setHideResults] = useState(false);

  // Calendar logic
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const toggleDate = (day) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
    
    if (selectedDates.some(d => d.date === dateStr)) {
      setSelectedDates(selectedDates.filter(d => d.date !== dateStr));
    } else {
      setSelectedDates([...selectedDates, { date: dateStr, isAllDay: true, times: [] }]);
    }
  };

  const toggleAllDay = (index) => {
    const newDates = [...selectedDates];
    newDates[index].isAllDay = !newDates[index].isAllDay;
    if (!newDates[index].isAllDay && newDates[index].times.length === 0) {
      newDates[index].times = ['09:00'];
    }
    setSelectedDates(newDates);
  };

  const addTime = (index) => {
    const newDates = [...selectedDates];
    newDates[index].times.push('12:00');
    setSelectedDates(newDates);
  };

  const removeTime = (dateIndex, timeIndex) => {
    const newDates = [...selectedDates];
    newDates[dateIndex].times.splice(timeIndex, 1);
    if (newDates[dateIndex].times.length === 0) {
      newDates[dateIndex].isAllDay = true;
    }
    setSelectedDates(newDates);
  };

  const updateTime = (dateIndex, timeIndex, value) => {
    const newDates = [...selectedDates];
    newDates[dateIndex].times[timeIndex] = value;
    setSelectedDates(newDates);
  };

  const removeDate = (index) => {
    const newDates = [...selectedDates];
    newDates.splice(index, 1);
    setSelectedDates(newDates);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || selectedDates.length === 0) {
      alert('Please enter a title and select at least one date.');
      return;
    }

    // Convert dates to string options for the mock store
    const options = selectedDates.map(d => {
      if (d.isAllDay) return `${d.date} (All day)`;
      return `${d.date} at ${d.times.join(', ')}`;
    });

    const pollId = createPoll(title.trim(), options);
    navigate(`/poll/${pollId}`);
  };

  const renderCalendar = () => {
    const days = [];
    const todayStr = new Date().toDateString();

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), d).toDateString();
      const isSelected = selectedDates.some(sd => sd.date === dateStr);
      const isToday = dateStr === todayStr;

      days.push(
        <button
          type="button"
          key={d}
          onClick={() => toggleDate(d)}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            isSelected 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : isToday 
                ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400' 
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {d}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="animate-fade-in pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Schedule a Meeting</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Create a scheduling poll and find the best time for everyone.</p>

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Title & Location */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-3 transition-colors shadow-sm"
                  placeholder="E.g. Weekly Team Sync"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
                  Location (optional)
                </label>
                <input
                  type="text"
                  id="location"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2.5 transition-colors shadow-sm"
                  placeholder="Zoom link, physical location, etc."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

            {/* Calendar & Times Two-Column Layout */}
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Left Column: Calendar */}
              <div className="md:w-1/2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
                  Select Dates
                </label>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <button type="button" onClick={handlePrevMonth} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button type="button" onClick={handleNextMonth} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-xs font-medium text-gray-500 uppercase tracking-wider h-8 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 place-items-center">
                    {renderCalendar()}
                  </div>
                </div>
              </div>

              {/* Right Column: Selected Dates & Times */}
              <div className="md:w-1/2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
                  Add Times
                </label>

                {selectedDates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <Clock className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
                      Select dates on the calendar to add specific times.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDates.map((dateObj, dIndex) => (
                      <div key={dateObj.date} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {new Date(dateObj.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </h3>
                          <div className="flex items-center space-x-3">
                            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                              <span>All-day</span>
                              <div className="toggle-switch transform scale-75 origin-right">
                                <input type="checkbox" checked={dateObj.isAllDay} onChange={() => toggleAllDay(dIndex)} />
                                <span className="toggle-slider"></span>
                              </div>
                            </label>
                            <button type="button" onClick={() => removeDate(dIndex)} className="text-gray-400 hover:text-red-500">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {!dateObj.isAllDay && (
                          <div className="space-y-2">
                            {dateObj.times.map((time, tIndex) => (
                              <div key={tIndex} className="flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={time}
                                  onChange={(e) => updateTime(dIndex, tIndex, e.target.value)}
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm"
                                />
                                <button type="button" onClick={() => removeTime(dIndex, tIndex)} className="p-2 text-gray-400 hover:text-red-500">
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addTime(dIndex)}
                              className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add times
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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

export default ScheduleMeeting;
