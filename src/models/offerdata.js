const mongoose = require('mongoose');

const offerdata = new mongoose.Schema({
    nadult: {
        type:Number,
        required:true,
    
    },
    nchild: {
        type:Number,
        required:true,
    },
    nmobile: {
        type:Number,
        required:true
    },
    
    nemail: {
        type:String,
        required:true
    },

    nam: {
        type:String,
        required:true
    }
    

})

const Tripdet = mongoose.model('TRIPDET',offerdata);
module.exports = Tripdet;