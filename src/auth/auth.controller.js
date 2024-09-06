const express = require("express");
const router = express.Router();

const { registerUser } = require("./auth.service");

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

module.exports = router;
