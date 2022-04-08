const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    FunCode: {
        type: String,
        default: "1000"
    },
    MachineID: {
        type: String,
        require: true
    },
    TradeNo: {
        type: String,
        require: true
    },
    SlotNo: {
        type: String,
        require: true
    },
    KeyNum: {
        type: Number,
        require: true
    },
    Status: {
        type: Number,
        default : "0"
    },
    Quantity: {
        type: Number,
        require: true
    },
    Stock: {
        type: Number,
        require: true
    },
    Capacity: {
        type: String,
        require: true
    },
    ProductID: {
        type: String,
        require: true
    },
    Price: {
        type: String,
        require: true
    },
    Type: {
        type: String,
        require: true
    },
    Introduction: {
        type: String,
        require: true
    },
    Name: {
        type: String,
        require
    }

} , {timestamps: true});

const Post = mongoose.model('Posts', postSchema)
module.exports = Post;