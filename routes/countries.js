const express = require("express");
const router = express.Router();

const {
  getCountriesAndSaveInCollection,
  getCountriesByName,
  getCountriesByPopulation,
  getTopTenLanguagesByCountry,
  getTopTenLanguagesBySpeakers,
} = require("../controllers/countries.controller");

router.route("/countries").get(getCountriesAndSaveInCollection);
router.route("/countries/search").get(getCountriesByName);
router.route("/countries/population").get(getCountriesByPopulation);
router.route("/countries/languages").get(getTopTenLanguagesByCountry);
router.route("/countries/languages/byspeakers").get(getTopTenLanguagesBySpeakers);

module.exports = router;
