const prisma = require("../config/db");

const findAllFlightsForUser = async () => {
  try {
    const flight = await prisma.flights.findMany({
      where: {
        validation_admin: true,
      },
    });

    return flight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findAllFlightsForAdmin = async () => {
  try {
    const flight = await prisma.flights.findMany({
      where: {
        validation_admin: false,
      },
    });
    return flight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertFlight = async (flightData) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findFlightByCountry = async (flightData) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateFlightById = async (id, flightData) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  findAllFlightsForUser,
  findAllFlightsForAdmin,
  insertFlight,
  findFlightByCountry,
  updateFlightById,
};
