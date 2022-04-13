const { request } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
    //console.log(req.headers.machineid);
    var post = new Post({
        FunCode: "1000",
        MachineID: req.headers.machineid,
        TradeNo: req.headers.tradeno,
        SlotNo: req.headers.slotno,
        KeyNum: req.headers.keynum,
        Status: "0",
        Quantity: req.headers.quantity,
        Stock: req.headers.stock,
        Capacity: req.headers.capacity,
        ProductID: req.headers.productid,
        Price: req.headers.price,
        Type: req.headers.type,
        Introduction: req.headers.introduction,
        Name: req.headers.name
    });
    try{
    post.save();
    res.send(({
        Status: "0",
        SlotNo: req.body.SlotNo,
        TradeNo: req.body.TradeNo}))
    }catch(err){
        res.send(({
            Status: "1",
            SlotNo: req.body.SlotNo,
            TradeNo: req.body.TradeNo,
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