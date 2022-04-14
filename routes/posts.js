const { request } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
    console.log(req);
    //console.log(req.query.MachineID);
    var post = new Post({
        FunCode: "1000",
        MachineID: req.query.MachineID,
        TradeNo: req.query.TradeNo,
        SlotNo: req.query.SlotNo,
        KeyNum: req.query.KeyNum,
        Status: "0",
        Quantity: req.query.Quantity,
        Stock: req.query.Stock,
        Capacity: req.query.Capacity,
        ProductID: req.query.ProductID,
        Price: req.query.Price,
        Type: req.query.Type,
        Introduction: req.query.Introduction,
        Name: req.query.Name
    });
    try{
    post.save();
    res.send(({
        Status: "0",
        SlotNo: req.query.SlotNo,
        TradeNo: req.query.TradeNo}))
    }catch(err){
        res.send(({
            Status: "1",
            SlotNo: req.query.SlotNo,
            TradeNo: req.query.TradeNo,
            Err: `${err}`
        }))  
    }
});

router.get('/', async (req, res) => {
    const MachineID1 = req.headers.MachineID;
    res.send(`${MachineID1}`)
})


router.get('/all-data', (req, res) => {
    Post.find()
    .then((result) => {
        res.send(result);
    })
})

module.exports = router; 