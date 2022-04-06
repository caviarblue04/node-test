const express = require('express');
const app = express();


//Import Routes
const postsRoutes = require('./routes/posts');

//Middleware
app.use( '/posts', postsRoutes);

const port = process.env.port || 8080; 
app.listen(port, () => {
    console.log('Port connected')
});

app.get('/', (req, res) => {
    res.send('Testing Homepage');
});

