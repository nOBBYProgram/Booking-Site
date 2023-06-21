
const Users = require('../Models/user')

const createUsers = async (req,res,next)=>{
    const newUsers = new Users(req.body);
    try{
    const savedUsers = await newUsers.save();
    res.status(200).send(savedUsers)
    }
    catch(err){
     next(err);
    }

}

const updateUsers = async (req,res,next)=>{
    try{
        const updatedUsers = await Users.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).send(updatedUsers);
        }
    catch(err){
     next(err);
    }

}
const DeleteUsers = async (req,res,next)=>{
   
    try{
        await Users.findByIdAndDelete(req.params.id);
       res.status(200).send("Users has been deleted succesfully.");
       }
    catch(err){
     next(err);
    }

}
const getUser = async (req,res,next)=>{
    try{
        const users = await Users.findById(req.params.id);
        res.status(200).send(users);
        }
    catch(err){
     next(err);
    }

}
const getUsers = async (req,res,next)=>{
    try{
        const users = await Users.find();
        res.status(200).send(users);
        }
    catch(err){
     next(err);
    }

}

module.exports ={createUsers,DeleteUsers,updateUsers,getUsers,getUser};
