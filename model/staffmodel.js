var mongoose = require('mongoose');

var staffschema= new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        type:String
    },
    slo_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "school"
    }

})

module.exports = mongoose.model('staff',staffschema)