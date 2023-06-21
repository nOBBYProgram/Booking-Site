const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title:{
        type:String,
        required:true
    },

    maxPeople:{
        type:Number,
        required:true
    },

 desc:{
        type:String,
        required:true
    },
  
  
    price:{
        type:Number,
        required:true
    },
roomNumbers:[{numbers:Number,Unavailble:{type:[Date]}}],
},
{timestamps:true}
)

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;