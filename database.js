let sqlite3 = require('sqlite3');

//will sit in root of project directory
let database = new sqlite3.Database('./database.db');

// Create variable for the SQL statement
const createPeopleQuery = 
`CREATE TABLE IF NOT EXISTS tblPeople (
	name TEXT, 
	date_of_birth TEXT)`;

const createLocationsQuery = 
`CREATE TABLE IF NOT EXISTS tblLocations (
	country TEXT,
	city TEXT)`;

const createTraveledQuery = 
`CREATE TABLE IF NOT EXISTS tblTraveled (
	people_ID INTEGER,
	location_ID INTEGER,
	start_date_traveled TEXT,
	end_date_traveled TEXT)`;

// Create database.run
database.exec(createPeopleQuery, error => {
	if (error) {console.log("Create tblPeople failed", error)} 
	else {console.log("Create tblPeople succeeded!")}
});

database.exec(createLocationsQuery, error => {
	if (error) {console.log("Create tblLocations failed", error)} 
	else {console.log("Create tblLocations succeeded!")}
});

database.exec(createTraveledQuery, error => {
	if (error) {console.log("Create tblTraveled failed", error)} 
	else {console.log("Create tblTraveled succeeded!")}
});


// Export database
module.exports = database;