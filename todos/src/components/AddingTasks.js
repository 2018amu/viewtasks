import React, { useEffect, useState } from "react";
import "./AddTask.css";

function AddingTasks() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only incomplete tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      const data = await response.json();
      const incomplete = data.filter((task) => !task.completed);
      setTasks(incomplete);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim() || !desc.trim()) {
      alert("Please enter both title and description");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: desc, completed: false }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
        setTitle("");
        setDesc("");
      } else {
        const data = await response.json();
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Add task error:", error);
      alert("Error adding task");
    }
  };

  const handleMarkDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });

      if (response.ok) {
        // Remove from UI
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } else {
        alert("Failed to mark task as done");
      }
    } catch (error) {
      console.error("Error marking done:", error);
      alert("Error marking task as done");
    }
  };

  return (
    <div className="task-container">
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
        <button
          onClick={handleAddTask}
          disabled={!title.trim() || !desc.trim()}
        >
          Add Task
        </button>
      </div>

      <h3>Incomplete Tasks</h3>
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No incomplete tasks available.</p>
      ) : (
        <div className="grid">
          {tasks.map((task) => (
            <div className="card" key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button
                className="done-btn"
                onClick={() => handleMarkDone(task.id)}
              >
                Mark as Done
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddingTasks;
