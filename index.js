const express = require('express');
const app = express();
const mongoose = require ('mongoose');


const port = process.env.port || 8080; 
app.listen(port, () => {
    console.log('Port connected')
});

app.get('/', (req, res) => {
    res.send('Testing Homepage');
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

app.get('/', async (req, res) => {
    const post = new Post({
        Status: res.body.Status,
        SlotNo: res.body.SlotNo,
        TradeNo: res.body.TradeNo
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});


app.post('/', async (req, res) => {
    const post = new Post({
        Status: req.body.Status,
        SlotNo: req.body.SlotNo,
        TradeNo: req.body.TradeNo
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});


const PostSchema = mongoose.Schema({
    Status: {
        type: Number,
        require: true
    },
    SlotNo: {
        type: String,
        require: true
    },
    TradeNo: {
        type: String,
        require: true
    },

});

module.exports = mongoose.model('Posts', PostSchema);
