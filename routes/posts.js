const { request } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
    //console.log(req.query.MachineID);
    var funcode = req.body.FunCode;
    var machineid = req.body.MachineID;
    var tradeno = req.body.TradeNo;
    var slotno = req.body.SlotNo;
    var keynum = req.body.KeyNum;
    var status = "0";
    var quantity = req.body.Quantity;
    var stock = req.body.Stock;
    var capacity = req.body.Capacity;
    var productid = req.body.ProductID;
    var price = req.body.Price;
    var type = req.body.Type;
    var introduction = req.body.Introduction;
    var name = req.body.Name
    var post = new Array({
        funcode, machineid, tradeno, slotno, keynum, status, quantity, stock, capacity, productid, price, type, introduction, name
    });
    try{
    console.log(JSON.stringify(post))
    res.send(({
        Status: "0",
        SlotNo: slotno,
        TradeNo: tradeno}))
    }catch(err){
        res.send(({
            Status: "1",
            SlotNo: slotno,
            TradeNo: tradeno,
            Err: `${err}`
        }))  
    }
});

router.get('/', async (req, res) => {
    res.send('Post Page')
})


router.get('/all-data', (req, res) => {
    Post.find()
    .then((result) => {
        res.send(result);
    })
})

module.exports = router; 