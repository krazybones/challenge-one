# APIs

This folder holds the NodeJs APIs.

## Getting Started

Enter the directory

`cd assignment-task`

Install all the dependencies

`npm i`

Run the project

`npm start`

Finally, open up your postman for testing the apis

### Endpoints

- Countries:
  - GET http://localhost:4000/api/v1/countries
  - GET http://localhost:4000/api/v1/countries/search?name=USA
  - GET http://localhost:4000/api/v1/countries/population
  - GET http://localhost:4000/api/v1/countries/languages
  - GET http://localhost:4000/api/v1/countries/languages/byspeakers

Note: Search Countries by name or altername, you can set value in name.

### MongoDB queries

===================

1.  # search by name or altSpellings

    db.countries.find({
    $or: [
    { name: new RegExp("USA", "i") },
    { altSpellings: new RegExp("USA", "i") }
    ]
    })

2.  # Find top 10 countries by population density

    db.countries.aggregate([
    {$sort: {population:-1}},
    { $limit : 10 }
    ])

3.  # Find top 10 languages by countries
    db.countries.aggregate([
    {$group: {_id: "$mainLanguage.name", countries: {$sum: 1} }},
    {$sort: {countries:-1}},
    { $limit : 10 },
    {
    $addFields: { language: "$_id" }
    },
    {
    $project: { _id: 0 }
    }
    ])
4.  # Find top 10 languages by speakers

        db.countries.aggregate([
        {$group: {_id: "$mainLanguage.nativeName", speakers: {$sum: "$population"} }},
        {$sort: {speakers:-1}},
        { $limit : 10 },
        {
        $addFields: { language: "$_id" }
        },
        {
        $project: { _id: 0 }
        }
        ])

## Questions

I'm always ready to talk to you. Please feel free to contact with me.
Looking forward to hearing from you!
