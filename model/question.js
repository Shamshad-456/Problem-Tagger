const { default: mongoose } = require("mongoose");

const questionSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:true
    },
    problem:{
        type:String,
        required:true
    },
    user_tag:{
        type:Array
    },
    author:{
        type:String
    }

});

module.exports = mongoose.model('question',questionSchema);