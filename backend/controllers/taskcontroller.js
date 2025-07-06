const { poolConnect, sql } = require('../db');

// GET all tasks
const getTasks = async (req, res) => {
  await poolConnect;
  try {
    const result = await pool.request().query('SELECT * FROM tasks');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new task
const createTask = async (req, res) => {
  const { title, description, isCompleted } = req.body;
  await poolConnect;
  try {
    await pool.request()
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description)
      .input('isCompleted', sql.Bit, isCompleted || 0)
      .query('INSERT INTO tasks (title, description, isCompleted) VALUES (@title, @description, @isCompleted)');
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  await poolConnect;
  try {
    await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description)
      .input('isCompleted', sql.Bit, isCompleted)
      .query('UPDATE tasks SET title=@title, description=@description, isCompleted=@isCompleted WHERE id=@id');
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await poolConnect;
  try {
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM tasks WHERE id = @id');
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
