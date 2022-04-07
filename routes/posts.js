const express = require('express');
const router = express.Router();
const Post = require('../models/post');


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

module.exports = router; 