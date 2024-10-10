const express = require("express");
const multer = require("multer");
const SnowFlakeId = require("snowflake-id").default;
const app = require("../config/firebase.config");

var snowflake = new SnowFlakeId({
  mid: 27,
});

const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} = require("firebase/storage");

const {
  getAllFlightForUser,
  createFlight,
  getAllFlightByCountry,
  checkFlightExists,
  editValidationAdmin,
  getAllFlightForAdmin,
} = require("./flight.service");

const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

// Get all flights
router.get("/", async (req, res) => {
  try {
    const flight = await getAllFlightForUser();

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

router.get("/admin", async (req, res) => {
  try {
    const flight = await getAllFlightForAdmin();

    res.status(200).send({
      status: "success",
      message: "Flight data for admin retrieved successfully",
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

//firebase
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("imgTicket"), async (req, res) => {
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
  } = req.body;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set waktu ke 00:00:00 untuk hari ini
    const depDate = new Date(departureDate);
    depDate.setHours(0, 0, 0, 0); // Set waktu ke 00:00:00 untuk tanggal keberangkatan

    if (depDate < today) {
      return res.status(400).send({
        status: "fail",
        error: "Departure date cannot be in the past.",
      });
    }

    // < -- FIREBASE
    const storageRef = ref(
      storage,
      `imgTicket/${req.file.originalname + " " + snowflake.generate()}`
    );

    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    // FIREBASE -- >
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
      imgTicket: downloadURL,
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
    console.error(error);
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
