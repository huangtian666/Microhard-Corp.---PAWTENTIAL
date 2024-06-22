import React, { createContext, useState, useContext } from 'react';

interface TaskContextProps {
  todayTotalTasks: number;
  todayCompletedTasks: number;
  setTodayTotalTasks: (count: number) => void;
  setTodayCompletedTasks: (count: number) => void;
}

const TaskContext = createContext<TaskContextProps>({
  todayTotalTasks: 0,
  todayCompletedTasks: 0,
  setTodayTotalTasks: () => {},
  setTodayCompletedTasks: () => {}
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayTotalTasks, setTodayTotalTasks] = useState(0);
  const [todayCompletedTasks, setTodayCompletedTasks] = useState(0);

  return (
    <TaskContext.Provider value={{ todayTotalTasks, todayCompletedTasks, setTodayTotalTasks, setTodayCompletedTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
