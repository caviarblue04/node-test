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

const port = process.env.port || 3000; 
app.listen(port, () => {
    console.log('Port connected')
});

app.get('/', (req, res) => {
    res.send('Testing Homepage');
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