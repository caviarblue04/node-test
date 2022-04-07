const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    Status: {
        type: String,
        require: true
    },
    SlotNo: {
        type: String,
        require: true
    },
    TradeNo: {
        type: String,
        require: true
    }
} , {timestamps: true});

const Post = mongoose.model('Posts', postSchema)
module.exports = Post;