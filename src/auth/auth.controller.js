const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("./auth.service");

router.post("/register", async (req, res) => {
  try {
    //middleware generate id
    const { name, email, phone, password } = req.body;

    const userData = {
      name,
      email,
      phone,
      password,
    };

    const user = await registerUser(userData);

    res.status(200).send({
      status: "success",
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    if (error.message.includes("Email")) {
      return res.status(400).send({ message: error.message });
    }
    res.status(500).send({
      status: "fail",
      message: `Server Error, Internal Server Error: ${error.message}`,
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

    res.status(200).send({
      status: "success",
      message: "User login successfully!",
      data: user,
      // token:
    });
  } catch (error) {
    res.status(401).send({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
