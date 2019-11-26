const db = require('./database.js');

const people_list = [
{
	name: "RJ",
	date_of_birth: "1/1/01"
},
{
	name: "Felipe",
	date_of_birth: null
},
{
	name: "Mallory",
	date_of_birth: null
},
{
	name: "Todd",
	date_of_birth: null
},
{
	name: "Jason",
	date_of_birth: "4/20/89"
}
];

const location_list = [
{
	country: "Japan",
	city: "Tokyo",
},
{
	country: "Canada",
	city: "Montreal",
},
{
	country: "France",
	city: "Paris",
},
{
	country: "England",
	city: "London",
},
{
	country: "Germany",
	city: "Berlin",
}
];
const deletePeople = `DELETE FROM tblPeople`
const deleteLocation = `DELETE FROM tblLocations`
const insertIntoPeople = `INSERT INTO tblPeople (name, date_of_birth) VALUES (?, ?)`
const insertIntoLocations = `INSERT INTO tblLocations (country, city) VALUES (?, ?)`

db.run(deletePeople, error => {
  if (error) console.log(new Error('Could not delete people'), error);
  else {
    people_list.forEach(person => {
      db.run(insertIntoPeople, [person.name, person.date_of_birth], error => {
        if (error) console.log(new Error('Could not add person'), error);
        else {
          console.log(`${person.name} successfully added to the database!`);
        }
      });
    });

    db.run(deleteLocation, error => {
      if (error) console.log(new Error('Could not delete location'), error);
      else {
        location_list.forEach(location => {
          db.run(insertIntoLocations, [location.country, location.city], error => {
            if (error) console.log(new Error('Could not add location'), error);
            else {
              console.log(`${location.country} successfully added to the database!`);
            }
          });
        });
      }
    });
  }
});