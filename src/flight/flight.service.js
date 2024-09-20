const { v4: uuidv4 } = require("uuid");
const { getJson } = require("serpapi");
const dotenv = require("dotenv");
dotenv.config();

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

// Functions that are not connected to the database

// This function for validating flight based on flight number using SerpApi with Google Flight
const checkFlightExists = async (flightData) => {
  try {
    const params = {
      engine: "google_flights",
      departure_id: flightData.departureAirport,
      arrival_id: flightData.arrivalAirport,
      outbound_date: flightData.departureDate,
      type: "2",
      hl: "en",
      gl: "id",
      show_hidden: "true",
      api_key: process.env.SERPAPI_KEY,
    };

    // Assume getJson is a promise-based function
    const json = await getJson(params);

    if (!json) {
      throw new Error("No response from flight data source.");
    }

    const allFlights = [];

    if (Array.isArray(json.best_flights)) {
      allFlights.push(...json.best_flights);
    } else {
      console.log("No best flights found.");
    }

    if (Array.isArray(json.other_flights)) {
      allFlights.push(...json.other_flights);
    } else {
      console.log("No other flights found.");
    }

    // Check if the flight exists in allFlights
    for (const flight of allFlights) {
      for (const segment of flight.flights) {
        if (segment.flight_number === flightData.flightNumber) {
          console.log(
            `Flight found: ${segment.flight_number} from ${segment.departure_airport.name} to ${segment.arrival_airport.name}`
          );
          return {
            exists: true,
            bookingToken: flight.booking_token,
          }; // Flight found
        }
      }
    }

    console.log("Flight not found");
    return { exists: false }; // Flight not found
  } catch (error) {
    console.error("Error fetching flight data:", error);
    throw error; // Propagate the error to the calling function
  }
};

module.exports = {
  getAllFlight,
  createFlight,
  getAllFlightByCountry,
  checkFlightExists,
};
