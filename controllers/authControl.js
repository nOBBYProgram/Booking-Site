const Users = require('../Models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const register = async (req,res,next)=>{
   
    try{
        const existingUser = await Users.findOne({ userName: req.body.userName });

        if (existingUser) {
          // Return an error response if a user with the same userName already exists
          return res.status(400).json({ error: 'User with that userName already exists' });
        }
const hashedPassword = await bcrypt.hash(req.body.password,10)
        const newUsers = new Users({
            userName : req.body.userName,
            email : req.body.email,
            password : hashedPassword
        });
        console.log(newUsers)
        await newUsers.save();
        res.status(200).send("User saved successfully!");
    }
    catch(err){
     next(err);
    }

}
const login = async (req,res,next)=>{
    try{
        const user = await Users.findOne({userName:req.body.userName})
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(404).send("Invalid Creditials")
        }
        const token = jwt.sign({id:user._id, isadmin:user.isadmin},process.env.special);
        res.cookie('token',token,{httpOnly:true,  path: '/'});
        const{ password, isadmin, ...otherDetails } = user._doc
        res.status(200).json({otherDetails,success:"You have logged in"})
        res.status(200).send("You have successfully login")
    }
    catch(err){
        next(err);
    }
}
module.exports = {register,login};