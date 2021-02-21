const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.js");

//INDEX route

router.get("/", (req, res) => {
    Todo.find({}, (err, foundTodos) => {
        if(err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundTodos)
    });
});


//CREATE route 
router.post("/", (req, res) => {
    Todo.create(req.body, (error, createdTodo) => {
        if(err) {
            res.status(400).json({ error: error.message});
        } 
        res.status(200).json(createdTodo);
    });
});


//DELETE route
router.delete("/:id", (req,res) => {
    Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
        if(err) {
            res.status(400).json({ error: err.message});
        }
        res.status(200).json(deletedTodo);
    });
});


//UPDATE 
router.put(":id", (req, res) => {
    Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true},
        (err, updatedTodo) => {
            if(err) {
                res.status(400).json({ error: err.message});
            }
            res.status(200).json(updatedTodo);
        }
    );
});

module.exports = router; 