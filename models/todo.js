const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: { type: String },
    date: {type: Date},
    completed: {type: Boolean},
    
});

module.exports = mongoose.model("Todo", todoSchema)