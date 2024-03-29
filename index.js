const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = process.env.port || 8080;
var cors = require('cors');

//Import Routes
const postsRoutes = require('./routes/posts');
const codeRoutes = require('./routes/code');
const firebaseRoutes = require('./routes/firebase');

//Middleware
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use( '/posts', postsRoutes);
app.use( '/code', codeRoutes);
app.use( '/firebase', firebaseRoutes);
app.use(express.json);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/routes/main.html'));
});

app.post('/', function (req, res) {
    res.send(req.body.FunCode);
});

app.listen(port, () => {
    console.log(`Port connected `+ port)
});