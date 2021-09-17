const Country = require("../models/countries");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const axios = require("axios");

// Get countries details   =>   /api/v1/countries
exports.getCountriesAndSaveInCollection = catchAsyncErrors(async (req, res, next) => {
  /**
   * all countries removed from local database collection
   * fetched fresh/updated countries list from endpoint
   */
  await Country.remove();

  const response = await axios.get("https://restcountries.eu/rest/v2/all");
  const allCountries = response.data;

  const countries = allCountries.map(
    ({ name, capital, region, subregion,
      population, area, altSpellings, languages }) => {
      return {
        name, capital, region, subregion,
        population, area, altSpellings,
        mainLanguage: languages[0],
        languages
      }
    });

  await Country.create(countries);

  res.status(200).json({
    success: true,
    countries,
  });
});

// Get countries search using name, altSpellings   =>   /api/v1/countries/search?name=value
exports.getCountriesByName = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    return next(new ErrorHandler(`Search criteria is required`));
  }
  const countries = await Country.find({
    $or: [
      { name: new RegExp(name, "i") },
      { altSpellings: new RegExp(name, "i") }
    ]
  });
  res.status(200).json({
    success: true,
    countries,
  });
});

// Get top 10 countries by population  =>   /api/v1/countries/population
exports.getCountriesByPopulation = catchAsyncErrors(async (req, res, next) => {
  const countries = await Country.aggregate([
    { $sort: { population: -1 } },
    { $limit: 10 }
  ]);
  res.status(200).json({
    success: true,
    countries,
  });
});

// Get top 10 languages by country  =>   /api/v1/countries/languages
exports.getTopTenLanguagesByCountry = catchAsyncErrors(async (req, res, next) => {
  const countries = await Country.aggregate([
    { $group: { _id: "$mainLanguage.name", countries: { $sum: 1 } } },
    { $sort: { countries: -1 } },
    { $limit: 10 },
    { $addFields: { language: "$_id" } },
    { $project: { _id: 0 } }
  ]);

  res.status(200).json({
    success: true,
    countries,
  });
});

// Get top 10 languages by speakers  =>   /api/v1/countries/languages/byspeakers
exports.getTopTenLanguagesBySpeakers = catchAsyncErrors(async (req, res, next) => {
  const countries = await Country.aggregate([
    { $group: { _id: "$mainLanguage.nativeName", speakers: { $sum: "$population" } } },
    { $sort: { speakers: -1 } },
    { $limit: 10 },
    { $addFields: { language: "$_id" } },
    { $project: { _id: 0 } }
  ])

  res.status(200).json({
    success: true,
    countries,
  });
});