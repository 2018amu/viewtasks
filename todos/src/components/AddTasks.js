import React, { useEffect, useState } from 'react';
import './AddTask.css';

function AddTasks() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on mount, only incomplete ones
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks');
      const data = await response.json();
      // Filter tasks where completed === false
      const incompleteTasks = data.filter(task => !task.completed);
      setTasks(incompleteTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add new task API call
  const handleAddTask = async () => {
    if (!title.trim() || !desc.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc, completed: false }),
      });
      if (response.ok) {
        setTitle('');
        setDesc('');
        fetchTasks(); // Refresh list
      } else {
        const data = await response.json();
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Add task error:', error);
      alert('Error adding task');
    }
  };

  // Mark task done — update completed=true in DB
  const handleMarkDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PATCH', // or PUT if you prefer
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
      if (response.ok) {
        // Remove task from frontend list
        setTasks(tasks.filter(task => task.id !== id));
      } else {
        alert('Error marking task as done');
      }
    } catch (error) {
      console.error('Mark done error:', error);
      alert('Error marking task as done');
    }
  };

  return (
    <div className="task-container">
      <div className="form">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter task description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="grid">
        {tasks.map(task => (
          <div className="card" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button className="done-btn" onClick={() => handleMarkDone(task.id)}>Done</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddTasks;
