const express = require('express');
const { find } = require('../models/post');
const router = express.Router();
const Post = require('../models/post');


router.post('/', async (req, res) => {
    const post = new Post({
        FunCode: req.body.FunCode,
        MachineID: req.body.MachineID,
        TradeNo: req.body.TradeNo,
        SlotNo: req.body.SlotNo,
        KeyNum: req.body.KeyNum,
        Status: req.body.Status,
        Quantity: req.body.Quantity,
        Stock: req.body.Stock,
        Capacity: req.body.Capacity,
        ProductID: req.body.ProductID,
        Price: req.body.Price,
        Type: req.body.Price,
        Introduction: req.body.Introduction,
        Name: req.body.Name
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost),
    res.send(savedPost);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/', async (req, res) => {
    Post.findOne({
        Status: req.body.Status,
        SlotNo: req.body.SlotNo,
        TradeNo: req.body.TradeNo
    })
    .then((result) => {
        res.send(result);
    })
})


router.get('/all-data', (req, res) => {
    Post.find()
    .then((result) => {
        res.send(result);
    })
})

module.exports = router; 