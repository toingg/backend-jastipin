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
const checkFlightExists = (flightData) => {
  return new Promise((resolve, reject) => {
    const params = {
      engine: "google_flights",
      departure_id: flightData.departureAirport,
      arrival_id: flightData.arrivalAirport,
      outbound_date: flightData.departureDate,
      type: "2",
      hl: "en",
      api_key: process.env.SERPAPI_KEY,
    };

    getJson(params, (json) => {
      // console.log(JSON.stringify(json, null, 2)); // Log the response

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
            return resolve(true); // Flight found
          }
        }
      }

      console.log("Flight not found");
      return resolve(false); // Flight not found
    });
  });
};

module.exports = {
  getAllFlight,
  createFlight,
  getAllFlightByCountry,
  checkFlightExists,
};
