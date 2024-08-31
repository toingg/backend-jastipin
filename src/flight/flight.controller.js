const express = require("express");
const {
  getAllFlight,
  createFlight,
  getAllFlightByCountry,
} = require("./flight.service");
const { flights } = require("../config/db");

const router = express.Router();

// Get all flights
router.get("/", async (req, res) => {
  try {
    const flight = await getAllFlight();

    res.status(200).send(flight);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  const { travelerId, flightNumber, departure, arrival } = req.body;
  try {
    flightData = { travelerId, flightNumber, departure, arrival };
    const flight = await createFlight(flightData);

    res.send({
      data: flight,
      message: "Flight created succesfully !",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:dep/:arr", async (req, res) => {
  const departure = req.params.dep.toUpperCase();
  const arrival = req.params.arr.toUpperCase();

  const flightData = { departure, arrival };

  const flight = await getAllFlightByCountry(flightData);

  res.send({
    data: flight,
  });
});
module.exports = router;
