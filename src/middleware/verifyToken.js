const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) {
    return res.status(401).send({
      status: "fail",
      message: "Unauthorized: Token is null",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({
        status: "fail",
        message: "Unauthorized: Invalid Token",
      }); // Invalid Token
    }
    // req.name = user.name; // Buat ngelempar nama, jadi disimpen ke req.name
    // Ex. Response di Controller
    // res.status(200).send({
    //   status: "success",
    //   message: "Flight created succesfully !",
    //   data: flight,
    //   user: req.name, --> ini contoh penggunaannya
    // });
    next();
  });
};

module.exports = { verifyToken };
