const mongoose = require('mongoose');

const cupload = new mongoose.Schema({
    from: {
        type:String,
        required:true,
    
    },
    to: {
        type:String,
        required:true,
    },
    noday: {
        type:Number,
        required:true
    },
    
    nonight: {
        type:Number,
        required:true
    },

    price: {
        type:Number,
        required:true
    }
    

})

const Codet = mongoose.model('CODET',cupload);
module.exports = Codet;