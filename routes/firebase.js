const express = require('express');
const router = express.Router();
const fb = require('firebase-admin');

router.get('/', async (req, res) =>{
    console.log('Test');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = fb.initializeApp({
        apiKey: "AIzaSyBEGblVRX9BREN-Yb64vUBQvBfyAA4KnDk",
        authDomain: "vending-maching-db.firebaseapp.com",
        databaseURL: "https://vending-maching-db-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "vending-maching-db",
        storageBucket: "vending-maching-db.appspot.com",
        messagingSenderId: "784240175190",
        appId: "1:784240175190:web:0545dab88e32610b3f73f7",
        measurementId: "G-G913QTQZ2M"
    })
  
    //Take Database
    var firebaseDb = fb.database();
  
    const dbref = ref(firebaseDb);
    dbref.once("value", function(snapshot){
        res.json(snapshot);
    })
    .catch(error => {
        res.json({ message: error });
    })

});

module.exports = router; 