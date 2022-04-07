const express = require('express');
const { find } = require('../models/post');
const router = express.Router();
const Post = require('../models/post');


router.get('/', (req,res) => {
    res.send('Importing JSON file')
})


router.post('/', async (req, res) => {
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

router.get('/all-data', (req, res) => {
    Post.find()
    .then((result) => {
        res.send(result);
    })
})

module.exports = router; 