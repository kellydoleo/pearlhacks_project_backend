const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


///controllers 
const todoController = require("./controller/todo.js")

// Error / Disconnection
mongoose.connection.on("error", err =>
  console.log(err.message + " is Mongodb not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect("mongodb+srv://sei:sei2020@sei.rqdkr.azure.mongodb.net/sticky_note_backend?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// middleware
app.use(express.json()); //use .json(), not .urlencoded()

// const whitelist = ['http://localhost:4500', 'https://fathomless-sierra-68956.herokuapp.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors()) // Note: all routes are now exposed. If you want to limit access for specific verbs like POST or DELETE you can look at the npm documentaion for cors (for example with OMDB - it's ok for anyone to see the movies, but you don't want just anyone adding a movie)


// /todo routes
app.use("/todo", todoController);


// Web server:
app.listen(PORT, () => {
  console.log(`🎉🎊 celebrations happening on port ${PORT} 🎉🎊`);
});

