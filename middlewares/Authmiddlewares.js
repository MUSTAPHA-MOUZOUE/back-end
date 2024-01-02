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
  req.user = decoded
  next()
}catch(error){
  res.status(500).json(error)
}
}
// exports.role=(roles)=>{
//   return (req, res, next) => {
//     const user = req.user;

//     if (user && roles.includes(user.role)) {
//         next();
//     } else {
//         return res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
//     }
// };
// }
// middleware/role.js

// Middleware to check if the user is a moderator
exports.isModerator = (req, res, next) => {
  if (req.user.role === "moderator") {
    next(); 
  } else {
    isAdmin();
    res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
  }
};
exports.isAdmin = (req, res, next) => {
  console.log(req.user)
  if (req.user.role === "admin") {
    next(); 
  } else {
    res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
  }
};

