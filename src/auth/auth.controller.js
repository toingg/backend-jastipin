const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("./auth.service");

router.post("/register", async (req, res) => {
  try {
    //middleware generate id
    const { name, email, password } = req.body;

    const userData = {
      name,
      email,
      password,
    };

    const user = await registerUser(userData);

    res.send({
      data: user,
      message: "User created successfully!",
    });
  } catch (error) {
    if (error.message.includes("Email")) {
      return res.status(400).send({ message: error.message });
    }
    res.status(500).send({
      message: "Server Error: Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = {
      email,
      password,
    };

    const user = await loginUser(userData);

    res.send({
      data: user,
      message: "User login successfully!",
      // token:
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
});

module.exports = router;
