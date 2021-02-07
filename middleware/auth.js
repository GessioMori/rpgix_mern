import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err)
            return res
              .status(500)
              .send({ auth: false, message: "Failed to authenticate token." });
          req.userId = decoded.id;
        }
      );
    } else {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
