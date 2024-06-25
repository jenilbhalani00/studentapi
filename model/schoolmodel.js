var mongoose = require('mongoose');

var schoolschema= new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        type:String
    },

   
})

module.exports = mongoose.model('school',schoolschema)