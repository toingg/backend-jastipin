const prisma = require("../config/db");

const findAllFlightsForUser = async () => {
  const flight = await prisma.flights.findMany({
    where: {
      validation_admin: true,
    },
  });

  return flight;
};

const findAllFlightsForAdmin = async () => {
  const flight = await prisma.flights.findMany({
    where: {
      validation_admin: false,
    },
  });
  return flight;
};

const insertFlight = async (flightData) => {
  const flight = await prisma.flights.create({
    data: {
      flight_id: flightData.flightId,
      traveler_id: flightData.travelerId,
      passenger: flightData.passenger,
      airline: flightData.airline,
      flight_number: flightData.flightNumber,
      departure_country: flightData.departureCountry,
      departure_airport: flightData.departureAirport,
      arrival_country: flightData.arrivalCountry,
      arrival_airport: flightData.arrivalAirport,
      departure_date: flightData.departureDate,
      arrival_date: flightData.arrivalDate,
      booking_token: flightData.bookingToken,
      img_ticket: flightData.imgTicket,
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
        { validation_admin: true },
      ],
    },
  });
  return flight;
};

const updateFlightById = async (id, flightData) => {
  // console.log(id);
  // console.log(flightData);
  const flight = await prisma.flights.update({
    where: {
      flight_id: id,
    },
    data: {
      passenger: flightData.passenger,
      airline: flightData.airline,
      flight_number: flightData.flightNumber,
      departure_country: flightData.departureCountry,
      departure_airport: flightData.departureAirport,
      arrival_country: flightData.arrivalCountry,
      arrival_airport: flightData.arrivalAirport,
      departure_date: flightData.departureDate,
      arrival_date: flightData.arrivalDate,
      booking_token: flightData.bookingToken,
      img_ticket: flightData.imgTicket,
      validation_admin: flightData.validationAdmin,
    },
  });

  return flight;
};

module.exports = {
  findAllFlightsForUser,
  findAllFlightsForAdmin,
  insertFlight,
  findFlightByCountry,
  updateFlightById,
};

// filter tanggal terdekat
