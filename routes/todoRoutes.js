const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

// GET all todos for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single todo
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new todo
router.post('/', authMiddleware, async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        userId: req.user.id
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH update a todo
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (req.body.title != null) {
            todo.title = req.body.title;
        }
        if (req.body.completed != null) {
            todo.completed = req.body.completed;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a todo
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
