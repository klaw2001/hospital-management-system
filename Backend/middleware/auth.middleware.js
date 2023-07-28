import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization;
      let decideToken = jwt.verify(token, process.env.SECRET_KEY,);
      if (decideToken) {
        next();
      } else {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
    } else {
      return res.status(401).json({
        message: "Please Enter Token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
