const prisma = require("../config/db");

const findAllFlights = async () => {
  const flight = await prisma.flights.findMany();

  return flight;
};

const findFlightByCountry = async (departure, arrival) => {
  const flight = await prisma.flights.findUnique({
    where: {
      departureCountry: departure,
      arrivalCountrym: arrival,
    },
  });
};

const insertFlight = async (flightData) => {
  const flight = await prisma.flights.create({
    data: {
      flightId: flightData.flightId,
      travelerId: flightData.travelerId,
      flightNumber: flightData.flightNumber,
      departureCountry: flightData.departure,
      arrivalCountry: flightData.arrival,
      createdAt: new Date(),
    },
  });
  return flight;
};

module.exports = { findAllFlights, findFlightByCountry, insertFlight };
