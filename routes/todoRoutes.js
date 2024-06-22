const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

// GET all todos for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const cacheKey = `todos_${userId}`;
        const cachedTodos = req.cache.get(cacheKey);

        if (cachedTodos) {
            return res.json(cachedTodos);
        }

        const todos = await Todo.find({ userId });
        req.cache.set(cacheKey, todos, 60); // Cache for 1 minute
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single todo
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;
        const cacheKey = `todo_${userId}_${todoId}`;
        const cachedTodo = req.cache.get(cacheKey);

        if (cachedTodo) {
            return res.json(cachedTodo);
        }

        const todo = await Todo.findOne({ _id: todoId, userId });
        if (todo) {
            req.cache.set(cacheKey, todo, 60); // Cache for 1 minute
        }
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
        // Invalidate cache for the user's todos list
        req.cache.del(`todos_${req.user.id}`);
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH update a todo
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;
        const todo = await Todo.findOne({ _id: todoId, userId });

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
        // Invalidate cache for the updated todo and the user's todos list
        req.cache.del(`todo_${userId}_${todoId}`);
        req.cache.del(`todos_${userId}`);
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a todo
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;
        const todo = await Todo.findOneAndDelete({ _id: todoId, userId });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Invalidate cache for the deleted todo and the user's todos list
        req.cache.del(`todo_${userId}_${todoId}`);
        req.cache.del(`todos_${userId}`);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
