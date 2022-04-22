const { request } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
    //console.log(req.query.MachineID);
    var funcode = req.body.FunCode;
    var machineid = req.body.MachineID;
    var tradeno = "00000000001";
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
    var sessioncode = req.body.sessioncode;
    var account = req.body.Account;
    var pwd = req.body.PWD;
    var imageurl = req.body.ImageUrl;
    var MsgType = "0";
    var post = new Array({
        funcode, machineid, tradeno, slotno, keynum, status, quantity, stock, capacity, productid, price, type, introduction, name, pwd, account, sessioncode, imageurl
    });
    try{
    console.log(JSON.stringify(post))

    if (funcode === '1000'){
        //Check status of the machine, all var provided in the machine
        res.send({
            Status: "0",
            SlotNo: slotno,
            TradeNo: tradeno,
            Err:'Success'
        })
    }

    else if (funcode === '2000'){
        if (sessioncode = "1214"){        
            res.send(({
            Status: "0",
            SlotNo: "17",
            ProductID: productid,
            TradeNo: tradeno,
            Err:'Success'
            }))
        }
        else if (sessioncode = "1215"){        
            res.send(({
            Status: "0",
            SlotNo: "18",
            ProductID: productid,
            TradeNo: tradeno,
            Err:'Success'
            }))
        }

    }

    else if (funcode === "4000"){
        //Funcode 4000 is ping receive from the machine to change/not change product
        if(MsgType === '0'){
            //MsgType 0 = No changes made to the machine
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
            //MsgType 1 = change product setting in the machine
            //All var should be filled out, else the machine wont make it.
            res.send(({
                Status: "0",
                MsgType: "1",
                SlotNo: "19",
                TradeNo: "00000000001",
                Capacity: "20",
                Quanitity: "20",
                ProductID: "15142",
                Name: "Cat",
                Price: "25",
                Type: "animal",
                Introduction: "introduction of product",
                //Picture link should be in PNG format else the machine wont receive
                ImageUrl: "https://www.pngall.com/wp-content/uploads/2016/06/Nyan-Cat-Free-Download-PNG.png", 
                ImageDetailUrl: "Cat",
                Err: "Success"
            })) 
        }
    }

    else if (funcode === '5000'){
        //No 
        res.send(({
            Status: "0",
            SlotNo: slotno,
            TradeNo: tradeno,
            Err:'Success'
        }))
    }

    else if (funcode === '5001'){
        //Funcode 5001 to confirm the changes in the machine (?)
        res.send(({
            Status: "0",
            SlotNo: slotno,
            TradeNo: tradeno,
            Err:'Success'
        }))
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