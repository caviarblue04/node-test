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
    var sessioncode = req.body.SessionCode;
    var account = req.body.Account;
    var pwd = req.body.PWD;
    var imageurl = req.body.ImageUrl;
    var MsgType = "1";
    var post = new Array({
        funcode, machineid, tradeno, slotno, keynum, status, quantity, stock, capacity, productid, price, type, introduction, name, pwd, account, sessioncode, imageurl
    });
    try{
    console.log(JSON.stringify(post))

    if (funcode === '1000'){
        res.send({
            Status: "0",
            SlotNo: slotno,
            TradeNo: tradeno,
            Err:'Success'
        })
    }

    else if (funcode === '2000'){
        res.send(({
            Status: "0",
            SlotNo: slotno,
            ProductID: productid,
            TradeNo: tradeno,
            Err:'Success'
        }))
    }

    else if (funcode === "4000"){
        if(MsgType === '0'){
            res.send(({
                Status: "0",
                MsgType: "0",
                TradeNo: tradeno,
                SlotNo: slotno,
                ProductID: productid,
                Err:'Success'
            }))
        }
        else if(MsgType === '1'){
            res.send(({
                Status: "0",
                MsgType: "1",
                SlotNo: "19",
                TradeNo: tradeno,
                Capacity: capacity,
                Quanitity: quantity,
                ProductID: productid,
                Name: "Cat",
                Price: price,
                Type: type,
                Introduction: "introduction of product",
                ImageUrl: "https://i.imgur.com/PxZqLUR.jpeg",
                ImageDetailUrl: "Image Details",
                Err: "Success"
            })) 
        }
    }

    else if (funcode === '5000'){

    }

    else if (funcode === '5001'){

    }

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