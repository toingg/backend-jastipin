const express = require("express");
const {
  getAllFlight,
  createFlight,
  getAllFlightByCountry,
  checkFlightExists,
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
  const {
    travelerId,
    flightNumber,
    departureCountry,
    departureAirport,
    arrivalCountry,
    arrivalAirport,
    departureDate,
    arrivalDate,
  } = req.body;

  try {
    flightData = {
      travelerId,
      flightNumber,
      departureCountry,
      departureAirport,
      arrivalCountry,
      arrivalAirport,
      departureDate,
      arrivalDate,
    };

    const flightExists = await checkFlightExists(flightData);

    if (!flightExists) {
      return res.send({ error: "Flight does not exist" }).status(404);
    }

    const flight = await createFlight(flightData);

    res
      .send({
        data: flight,
        message: "Flight created succesfully !",
      })
      .status(200);
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
