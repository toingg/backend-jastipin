const express = require("express");
const {
  getAllFlight,
  createFlight,
  getAllFlightByCountry,
  checkFlightExists,
} = require("./flight.service");
// const { prisma } = require("../config/db");

const router = express.Router();

// Get all flights
router.get("/", async (req, res) => {
  try {
    const flight = await getAllFlight();

    res.status(200).send({
      status: "success",
      message: "Flight data retrieved successfully",
      data: flight,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      error: error.message,
    });
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
    const flightData = {
      travelerId,
      flightNumber,
      departureCountry,
      departureAirport,
      arrivalCountry,
      arrivalAirport,
      departureDate,
      arrivalDate,
    };

    const flightCheckResult = await checkFlightExists(flightData);

    if (!flightCheckResult.exists) {
      return res.send({ error: "Flight does not exist" }).status(404);
    }
    // Add bookingToken to flightData
    flightData.bookingToken = flightCheckResult.bookingToken;

    const flight = await createFlight(flightData);

    res.status(200).send({
      status: "success",
      message: "Flight created succesfully !",
      data: flight,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      error: error.message,
    });
  }
});

router.get("/:dep/:arr", async (req, res) => {
  try {
    const departure = req.params.dep.toUpperCase();
    const arrival = req.params.arr.toUpperCase();

    const flightData = { departure, arrival };

    const flight = await getAllFlightByCountry(flightData);

    res.status(200).send({
      status: "success",
      data: flight,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      error: error.message,
    });
  }
});
module.exports = router;
