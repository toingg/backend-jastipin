const { v4: uuidv4 } = require("uuid");
const {
  findAllFlights,
  insertFlight,
  findFlightByCountry,
} = require("./flight.repository");

const getAllFlight = async () => {
  try {
    const flight = await findAllFlights();

    return flight;
  } catch (error) {
    return "Error getting data from database";
  }
};

const createFlight = async (flightData) => {
  try {
    const id = "FLGT-" + uuidv4();

    const newFlightData = {
      flightId: id,
      ...flightData,
    };

    const flight = await insertFlight(newFlightData);

    return flight;
  } catch (error) {
    console.error("Error creating flight:", error); // Menambahkan logging untuk debugging
    throw new Error("Error creating data to database");
  }
};

const getAllFlightByCountry = async (flightData) => {
  try {
    const flight = await findFlightByCountry(flightData);

    return flight;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllFlight,
  createFlight,
  getAllFlightByCountry
};
