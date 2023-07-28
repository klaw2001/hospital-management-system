import jwt from "jsonwebtoken";

const checkRole = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }

      req.user = decoded;
      
      console.log(decoded)
      if (decoded.role === "receptionist") {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Access denied. You are not authorized." });
      }
    });
  } catch (error) {}
};

export default checkRole;
