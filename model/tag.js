const { default: mongoose } = require("mongoose");

const tagSchema= mongoose.Schema({
    tag:{
        type:Array
    }
});

module.exports = mongoose.model('tag',tagSchema);