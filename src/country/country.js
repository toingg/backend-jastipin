const express = require("express");
const router = express.Router();

const lookup = require("country-code-lookup");

router.get("/", async (req, res) => {
  try {
    const countries = await lookup.countries;

    const countryList = countries.map((country) => ({
      iso3: country.iso3,
      country: country.country,
    }));
    res.send({
      countryList,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
