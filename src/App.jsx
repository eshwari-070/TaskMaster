
import { useState, useEffect } from 'react';
import './App.css';

import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import ProgressTracker from './Components/ProgressTracker';

const STORAGE_KEY = 'taskmaster-tasks';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
      console.error('Unable to load saved tasks:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Unable to save tasks:', error);
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const toggleComplete = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <h1>TaskMaster</h1>
      <p><i>Friendly Task Manager</i></p>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />

      <ProgressTracker tasks={tasks} />
    </div>
  );
}
