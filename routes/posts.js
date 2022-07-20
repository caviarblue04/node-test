const { request } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const sql = require('mssql');
const fb = require('firebase-admin');
const bodyparser = require ('body-parser');
const Post = require('../models/post');
const path = require('path')
var OpenCode = '1';
var numberSlot = '';
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended: true}))

var serviceAccount = require("./vending-maching-db-firebase-adminsdk-2a81o-8726cd2e35.json");

fb.initializeApp({
    credential: fb.credential.cert(serviceAccount),
    databaseURL: "https://vending-maching-db-default-rtdb.asia-southeast1.firebasedatabase.app"
});

router.post('/', async (req, res) => {
  
    //console.log(req.body);
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
        if (sessioncode === '1111'){        
            res.send(({
            Status: "0",
            SlotNo: "13",
            ProductID: productid,
            TradeNo: tradeno,
            Err:'Success'
            }))
    }
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
    res.sendFile(path.join(__dirname, '/main.html'));
})

router.get('/firebase', (req, res) => {
    console.log('Get Firebase');
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

        //Take Database
        fb.database().ref("Slot/").once("value", function(snapshot){
            res.json(snapshot);
        })
        .catch(error => {
            res.json({ message: error });
        })
    
});

router.post('/firebase', (req, res) => {
    console.log('Post Firebase');
    var Slotdb = parseInt(req.body.DbSlotNo)
    var MsgType = parseInt(req.body.MsgType)
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        //Take Database
        var firebaseDb = fb.database();

        firebaseDb.ref("Slot/").set(Slotdb)
        firebaseDb.ref("MsgType/").set(MsgType)
        res.send(`Slot No: ${Slotdb} -- MsgType : ${MsgType}`)
        .catch(error => {
            res.json({ message: error });
        })
    
});

router.get('/all-data', (req, res) => {
    Post.find()
    .then((result) => {
        res.send(result);
    })
})

router.get('/test-data', (req, res) => {
        res.send("test-data");
        console.log("test-data")
})

module.exports = router; 