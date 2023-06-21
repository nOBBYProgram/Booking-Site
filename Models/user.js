const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
email:{
    type :String,
    required:true
},
password :{
    type:String,
    required:true
},
isadmin:{
    type:Boolean,
    default:false
}
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;