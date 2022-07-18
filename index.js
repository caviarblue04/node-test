const express = require('express');
const app = express();
const bodyparser = require('body-parser');

//Import Routes
const postsRoutes = require('./routes/posts');
const codeRoutes = require('./routes/code');
const firebaseRoutes = require('./routes/firebase');

//Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use( '/posts', postsRoutes);
app.use( '/code', codeRoutes);
app.use( '/firebase', firebaseRoutes);
app.use(express.json);

app.get('/', function (req, res) {
    res.send('Testing Homepage');
});

app.post('/', function (req, res) {
    res.send(req.body.FunCode);
});

app.listen(8000, () => {
    console.log(`Port connected`)
});