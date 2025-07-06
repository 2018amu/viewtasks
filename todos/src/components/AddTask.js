import React, { useState,useEffect } from 'react';
import './AddTask.css';

function AddTask() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([]);

  // const handleAddTask = () => {
  //   if (!title.trim() || !desc.trim()) return;

  //   const newTask = {
  //     id: Date.now(),
  //     title,
  //     description: desc
  //   };

  //   setTasks([newTask, ...tasks]);
  //   setTitle('');
  //   setDesc('');
  // };
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks');
      const data = await response.json();
      setTasks(data); // 🔁 This repopulates the grid
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  const handleAddTask = async () => {
    if (!title.trim() || !desc.trim()) return;
  
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description: desc }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Task added successfully');
        // Optionally fetch the updated task list from server here
        setTitle('');
        setDesc('');
        await fetchTasks();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Frontend error:', error);
      alert('Error adding task');
    }
  };
  

  // const handleMarkDone = (id) => {
  //   const updatedTasks = tasks.filter((task) => task.id !== id);
  //   setTasks(updatedTasks);
  // };

  const handleMarkDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Remove from UI immediately
        setTasks(tasks.filter(task => task.id !== id));
      } else {
        alert('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task');
    }
  };
  

  return (
    <div className="task-container">
      <h3>Add the Task</h3>
      <div className="form">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter task description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="grid">
        {tasks.map((task) => (
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

export default AddTask;
