const prisma = require("../config/db");

const findAllFlights = async () => {
  const flight = await prisma.flights.findMany();

  return flight;
};

const insertFlight = async (flightData) => {
  const flight = await prisma.flights.create({
    data: {
      flight_id: flightData.flightId,
      traveler_id: flightData.travelerId,
      flight_number: flightData.flightNumber,
      departure_country: flightData.departureCountry,
      departure_airport: flightData.departureAirport,
      arrival_country: flightData.arrivalCountry,
      arrival_airport: flightData.arrivalAirport,
      departure_date: flightData.departureDate,
      arrival_date: flightData.arrivalDate,
      booking_token: flightData.bookingToken,
      created_at: new Date(),
    },
  });
  return flight;
};

const findFlightByCountry = async (flightData) => {
  const flight = await prisma.flights.findMany({
    where: {
      AND: [
        { departure_country: flightData.departure },
        { arrival_country: flightData.arrival },
      ],
    },
  });
  return flight;
};

module.exports = { findAllFlights, insertFlight, findFlightByCountry };

// filter tanggal terdekat
