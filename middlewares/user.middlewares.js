import User from "../Models/user.model.js";

const verifySignUpBody = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    if (!email) return res.status(400).json({success: false, message:"Please provide the email"});
    if (!password) return res.status(400).json({success: false, message:"Please provide the password"});
    if (!username) return res
      .status(400)
      .json({ success: false, message: "Please provide the username" });
    const finduser = await User.findOne({ username: req.body.username });
    if (finduser)
      return res
        .status(400)
        .json({success: false, message:"User with this userid is already present please login"});
    next();
  } catch (err) {
    return res.status(404).json({success: false, message:`Error while verifying the req body ${err}`});
  }
};

const verifyLoginBody = async (req, res, next) => {
  const { password, username } = req.body;

  try{
  if (!password) return res.status(400).json({success: false, message: "Please provide the password"});
  if (!username) return res.status(400).json({success: false, message: "Please provide the username"});
  const finduser = await User.findOne({ username: req.body.username });
  if (!finduser)
    return res
      .status(400)
      .json({sucess: false, message: "User not exist please signUp"});
  next();
}catch(err){
    return res.status(400).json({sucess: false, message: "Error while verifying login body"})
}
}

export { verifyLoginBody, verifySignUpBody };
