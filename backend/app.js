// backend/app.js
const express = require('express');
const cors = require('cors');
const { sql, pool, poolConnect } = require('./db'); // Must match db.js

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    await poolConnect; // Make sure DB is connected
    console.log("Connected to SQL Server");

    const result = await pool.request().query('SELECT id, title, description, completed FROM task');
    res.json(result.recordset);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    await poolConnect;
    const result = await pool
      .request()
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description)
      .query('INSERT INTO task (title, description) VALUES (@title, @description)');

    res.status(201).json({ message: 'Task inserted successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Database insert error' });
  }
});
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await poolConnect;
    await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM task WHERE id = @id');

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});
//
app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid completed value' });
  }

  try {
    await poolConnect;
    await pool.request()
      .input('id', sql.Int, id)
      .input('completed', sql.Bit, completed)
      .query('UPDATE task SET completed = @completed WHERE id = @id');

    res.json({ message: 'Task updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});




module.exports = app;
