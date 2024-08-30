const express = require("express");
const router = express.Router();

const { createUser } = require("./auth.service");

router.post("/register", async (req, res) => {
  try {
    //middleware generate id
    const newUser = req.body;

    const user = await createUser(newUser);

    res.send({
      data: user,
      message: "User created successfully!",
    });
  } catch (err) {
    res.status(400).send(error.message);
  }
});
