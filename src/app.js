const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { verifyToken } = require("./middleware/verifyToken");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  res.send("Hello ! Welcome to Jastipin API !");
});

const countryList = require("./country/country");
app.use("/country", verifyToken, countryList);

const flightController = require("./flight/flight.controller");
app.use("/flight", verifyToken, flightController);

const authController = require("./auth/auth.controller");
app.use("/auth", authController);

app.listen(PORT, () => {
  console.log("Server Running at http://localhost:" + PORT);
});
