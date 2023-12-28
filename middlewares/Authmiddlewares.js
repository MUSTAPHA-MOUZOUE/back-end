const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth=async(req,res,next)=>{
  //console.log(req.headers)
//check if token exist ,if exist get
try{
  let token;
  if(req.headers && req.headers.authorization){
      //console.log(req.headers)
      token=req.headers.authorization?.split(' ')[1];
  }
  if(!token){
    return res.status(401)
  }
//verify token(no change happens,exprid token)
  const decoded=jwt.verify(token,process.env.JWT_SECRET)
  //condole.log(decoded)
  req.user = decoded._id
  next()
}catch(error){
  res.status(500).json(error)
}
}
