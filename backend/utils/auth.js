const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("./errors");

module.exports = async (req, res, next) => {
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