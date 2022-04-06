const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require ('dotenv/config');

//Import Routes
const postsRoutes = require('./routes/posts');

//Middleware
app.use( bodyparser.json());
app.use( '/posts', postsRoutes);


app.listen(3000);

app.get('/', (req, res) => {
    res.send('~HOME~');
});


//Connect db
mongoose.connect(
    process.env.DB_connection, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});