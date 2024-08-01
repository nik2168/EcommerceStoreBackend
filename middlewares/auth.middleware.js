import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.body.token;
  try {
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Please login to access this route" });
    }

    const decode = jwt.verify(token, process.env.SECRETKEY);
    req.userId = decode._id;
    next();
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Error while authenticating the user token",
      });
  }
};
