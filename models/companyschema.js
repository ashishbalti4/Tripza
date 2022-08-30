const mongoose = require('mongoose');

const companyschema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    pass: {
        type:String,
        required:true
    },
    
    address: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    }
    

})

const Company = mongoose.model('COMPANY',companyschema);
module.exports = Company;