const express = require("express");
const {
  getAllFlight,
  createFlight,
  getAllFlightByCountry,
  checkFlightExists,
  editValidationAdmin,
} = require("./flight.service");

const { verifyToken } = require("../middleware/verifyToken");
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

router.use(verifyToken);

router.post("/", async (req, res) => {
  const {
    travelerId,
    airline,
    flightNumber,
    passenger,
    departureCountry,
    departureAirport,
    arrivalCountry,
    arrivalAirport,
    departureDate,
    arrivalDate,
    imgTicket,
  } = req.body;

  try {
    const today = new Date();
    if (new Date(departureDate) < today) {
      return res.status(400).send({
        status: "fail",
        error: "Departure date cannot be in the past.",
      });
    }

    const flightData = {
      travelerId,
      airline,
      flightNumber,
      passenger,
      departureCountry,
      departureAirport,
      arrivalCountry,
      arrivalAirport,
      departureDate,
      arrivalDate,
      imgTicket,
    };

    const flightCheckResult = await checkFlightExists(flightData);

    if (!flightCheckResult.exists) {
      return res.status(404).send({ error: "Flight does not exist" });
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

router.patch("/:id", async (req, res) => {
  try {
    const flightId = req.params.id;
    const flightData = req.body;

    if (typeof flightData.validationAdmin !== "boolean")
      return res.status(400).send({
        status: "fail",
        message: "validationAdmin must Boolean Type, true or false",
      });
    // Jika req.body yang diberikan adalah "true" (string)
    // const validationAdmin = req.body.validationAdmin === "true";
    // const flightData = {
    //   validationAdmin,
    // };

    const flight = await editValidationAdmin(flightId, flightData);

    res.status(200).send({
      status: "success",
      message: "Validation Admin has been changed",
      data: flight,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: error.message,
    });
  }
});
module.exports = router;
