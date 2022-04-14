const { request } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
    //console.log(req.query.MachineID);
    var funcode = req.query.FunCode;
    var machineid = req.query.MachineID;
    var tradeno = req.query.TradeNo;
    var slotno = req.query.SlotNo;
    var keynum = req.query.KeyNum;
    var status = "0";
    var quantity = req.query.Quantity;
    var stock = req.query.Stock;
    var capacity = req.query.Capacity;
    var productid = req.query.ProductID;
    var price = req.query.Price;
    var type = req.query.Type;
    var introduction = req.query.Introduction;
    var name = req.query.Name
    var post = new Array({
        funcode, machineid, tradeno, slotno, keynum, status, quantity, stock, capacity, productid, price, type, introduction, name
    });
    try{
    console.log(post)
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