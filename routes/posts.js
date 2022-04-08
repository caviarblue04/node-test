const express = require('express');
const { find } = require('../models/post');
const router = express.Router();
const Post = require('../models/post');


router.post('/', async (req, res) => {
    const post = new Post({
        FunCode: "1000",
        MachineID: req.body.MachineID,
        TradeNo: req.body.TradeNo,
        SlotNo: req.body.SlotNo,
        KeyNum: req.body.KeyNum,
        Status: "0",
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
    //res.json(savedPost);
    res.send(JSON.stringify({
        Status: "0",
        SlotNo: req.body.SlotNo,
        TradeNo: req.body.TradeNo,
        Err: ""
    }))
    }catch(err){
        res.send(JSON.stringify({
            Status: "1",
            SlotNo: req.body.SlotNo,
            TradeNo: req.body.TradeNo,
            Err: err
        }))
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