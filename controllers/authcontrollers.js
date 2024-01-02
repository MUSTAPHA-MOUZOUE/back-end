const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationCodeEmail } = require("../utils/emailService");
exports.registerUser=async (req,res)=>{
    try{
    const {fullname,email,password}=req.body
    const hashPassword=await bcrypt.hash(password,10)
    const msg=""
    function getrole() {
        if(email===process.env.ADMIN_EMAIL){
            return "admin"
        }else if (email===process.env.MODERATOR_EMAIL){
            return "moderator"
        }else{
            return "user"
        }
    }
    const registerUser=await User.create({
        fullname:fullname,
        email:email,
        password:hashPassword,
        role:getrole()
    })
    await sendVerificationCodeEmail(email,msg);    

    res.status(200).send("succsufly registerUser")
    }catch(error){
        console.log("error in register user :",error)
        res.status(500).json({message:"error in server"})
    }
}
exports.signInUser = async (req, res) => {
    const { email, password } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const msg=`Your verification code is: ${verificationCode}`
    console.log('Email received for sign-in:', email);

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (!user) {
            return res.status(404).json("email not found");
        }
        const passwordValid = await bcrypt.compare(password,user.password);
        //console.log('Stored hashed password:', user.password);
        //console.log('Password comparison result:', passwordValid);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }
            await sendVerificationCodeEmail(email,msg); 
            user.verificationCode= verificationCode
            await user.save()
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    res.status(200).send({
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role:user.role,
        token: token,
        verificationCode: verificationCode

    });
    return;

    } catch (error) {
        console.log("Error in sign-in:", error);
        res.status(500).json({ message: "Error in server" });
    }
};


exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};
exports.verify = async (req, res) => {

    try {
      const { email, verificationCode } = req.body;
  
      const user = await User.findOne({ email });
      console.log('Stored Verification Code:', user.verificationCode);
      console.log('Entered Verification Code:', verificationCode);
  
  
  
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      if (user.verificationCode !== verificationCode) {
        return res.status(400).json('Invalid verification code');
      }
       
  
  
      res.status(200).json({ message: 'Verification successful' });
    } catch (error) {
      console.log('Error in verification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
