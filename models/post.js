const mongoose = require ('mongoose');

const PostSchema = mongoose.Schema({
    Status: {
        type: Int,
        require: true
    },
    SlotNo: {
        type: String,
        require: true
    },
    TradeNo: {
        type: String,
        require: true
    },

});

module.exports = mongoose.model('Posts', PostSchema);
