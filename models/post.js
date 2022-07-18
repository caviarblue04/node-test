const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    randCode: {
        type: String,
        require: true
    },
    numSlot: {
        type: String,
        require: true
    },
    Usability: {
        type: String,
        require: true,
        default: "0"
    }
} , {timestamps: true});

const Post = mongoose.model('codeGeneration', postSchema)
module.exports = Post;