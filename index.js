const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port = process.env.port || 3000; 

//Import Routes
const postsRoutes = require('./routes/posts');

//Middleware
app.use( bodyparser.json());
app.use( '/posts', postsRoutes);
app.listen(port, () => {
    console.log(`Port connected ${port}`)
});
//Connect db
mongoose.connect(
    "mongodb+srv://dbAdmin:Abc123@cluster0.1um74.mongodb.net/Rest?retryWrites=true&w=majority", 
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

app.get('/', (req, res) => {
    res.send('Testing Homepage');
});
