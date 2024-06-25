
var mongoose = require('mongoose');

var studentschema= new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        type:String
    },
    stlo_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff"
    }

})

module.exports = mongoose.model('student',studentschema)