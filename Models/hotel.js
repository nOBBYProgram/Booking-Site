const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String]
       
    },

    desc:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    rooms:{
        type:[String]
    },
    cheapest:{
        type:Number
        
    },
    city:{
        type:String
    },
    featured:{
        type:Boolean
   
    }
})

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;