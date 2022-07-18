const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const CodeDB = require('../models/post')
require('dotenv/config');
var OpenCode = '1';
var numberSlot = '';



router.get('/', async (req, res) => {
    const max = 9999
    const min = 1000
    const result = Math.random() * (max - min) + min
    OpenCode = Math.floor(result);


    function getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
        return item;
    }

    const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
    const result2 = getRandomItem(array);
    numberSlot = result2;

    const post = new CodeDB({
        randCode: OpenCode,
        numSlot: numberSlot
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        })

})

module.exports = router; 