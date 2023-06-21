const jwt = require('jsonwebtoken');
const createError = require('./Error');


const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

 
  jwt.verify(token,process.env.special,(err,user)=>{
      if(err) return next(createError(404,"its wrong"));
req.user = user;
next();
    });
   
   

};

const verifyUser =(req,res,next)=>{
  verifyToken(req,res,()=>{//helper function
    if(req.user.id === req.params.id || req.user.isadmin){
      next()
    }
    else{
      return next(createError(500,"error"))
    }
  })
}
const verifyAdmin =(req,res,next)=>{
verifyToken(req,res,()=>{
  if(req.user.isadmin){
    next()
  }
  else{
    return next(createError(501,"You are not authorized"));
  }
})
}
module.exports = {verifyToken,verifyUser,verifyAdmin};