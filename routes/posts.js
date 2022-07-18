const { request } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const sql = require('mssql');
const fb = require('firebase-admin');
const bodyparser = require ('body-parser');
const Post = require('../models/post');
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
  
    console.log(req.body);
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
    var MsgType = "0";
    var chosenslot = "5";
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
        const sql = require('mssql');
        const config  = {
            user: 'user_js',
            password: 'abc123',
            database: 'vending machine database',
            server: 'JOHANES-ASUS\\SQLEXPRESS',
            options: {
                trustedConnection: true,
                trustServerCertificate: true,
            },
        };

        console.log(keynum)
        var inputnumber = sessioncode
  
        function getKeyNumber() {
        var dbConn = new sql.ConnectionPool(config);
            dbConn.connect().then(function() {
                var request = new sql.Request(dbConn);
        
            request.query(`SELECT SlotNo FROM Slot WHERE KeyNum = ${inputnumber}`).then(function (data){
                console.log(data);
                var SlotOpen = data.recordset[0].SlotNo;
                console.log(data.recordset[0].SlotNo);
                dbConn.close();
                res.send(({
                    Status: "0",
                    SlotNo: SlotOpen,
                    ProductID: productid,
                    TradeNo: tradeno,
                    Err:'Success'
                    }))
            }).catch(function (err){
                res.send(({
                    Status: "1",
                    SlotNo: "",
                    ProductID: "",
                    TradeNo: tradeno,
                    Err:'Invalid Code'
                    }))
                console.log(err);
                dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        })
        }
        getKeyNumber();    
    }
    else if (funcode === '4000'){
        //Funcode 4000 is ping receive from the machine to change/not change product
        if(MsgType === '0'){
            //Take Database
            fb.database().ref("Slot/").once("value", function(snapshot){
                console.log(`Slot No : ${snapshot}`)
                res.send(({
                    Status: "0",
                    MsgType: "0",
                    TradeNo: tradeno,
                    SlotNo: snapshot,
                    ProductID: productid,
                    Err:'Success'
                }))
            })
            .catch(error => {
                res.json({ message: error });
            })
            //MsgType 0 = No changes made to the machine
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


router.post('/testingurl', function (req, res) {
    console.log(req.body.FunCode);
})

router.get('/', async (req, res) => {


    const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']

    for (let i=0; i < array.length; i++) {
        const max = 99999
        const min= 10000
        const result = Math.random()*(max - min) + min
        OpenCode = Math.floor(result);
    
    
        function getRandomItem(arr){
            const randomIndex = Math.floor(Math.random()* arr.length);
            const item = arr[randomIndex];
            return item;
        }
        res.send(
        console.log({
            Code: OpenCode, 
            SlotNo: array[i]})
        )
    }
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
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        //Take Database
        var firebaseDb = fb.database();

        firebaseDb.ref("Slot/").set(Slotdb)
        res.send(`Slot No: ${Slotdb}`)
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

module.exports = router; 