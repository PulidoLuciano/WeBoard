const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("./errors");

exports.auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "Secret key");
    const user = await decodedToken;
    req.user = user
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new AuthenticationError("You must to be logged in"),
    });
  }
};

exports.authAdmin = async (req, res, next) => {
  try{
    if(!req.user.isAdmin) throw new AuthenticationError("You must to be an admin to do that");
    next();
  }catch(e){
    console.log(e);
    res.status(401).json({
      error: new AuthenticationError("You must to be logged in"),
    });
  }
}