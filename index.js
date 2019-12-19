let express = require('express');
let database = require('./database.js');
let app = express();

app.use(express.json());

const port = 3000;

// CORS stuff
app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//Routes
app.get('/', (req, res) => {
	res.send('Visit /api/people or /api/locations to see info');
});

// -------------------------------------------------------------------
// PERSON ROUTES
// -------------------------------------------------------------------

// Get all people
app.get('/api/people', (req, res) => {
	const getPeople = `SELECT oid, * FROM tblPeople`;

	database.all(getPeople, (error, results) => {
		if (error) {
			console.log(new Error("Could not get people"), error);
			res.sendStatus(500);
		}
		res.status(200).json(results);
	})
})

// Get one person
app.get('/api/people/:id', (req, res) => {
	const personId = req.params.id
	const getPerson = `SELECT oid, * FROM tblPeople WHERE tblPeople.oid = ?`;

	database.get(getPerson, [personId], (error, results) => {
		if (error) {
			console.log(new Error('Could not get book'), error);
			res.sendStatus(500);
		}
		res.status(200).json(results);
	})
});

// Create new person
app.post('/api/people', (req, res) => {
	const reqBody = [req.body.firstName, req.body.lastName, req.body.dob]
	const createNewPerson = "INSERT INTO tblPeople VALUES (?, ?, ?)"
	console.log(req.body)
	database.run(createNewPerson, reqBody,(error, results) => {
		if (error) {
			console.log(`Error adding new person ${req.body.firstName}`, error)
			res.sendStatus(500)
		} else {
			console.log(`Added new person ${req.body.firstName}`)
			res.sendStatus(200)
		}
	})
})

// Update person
app.put('/api/people/:id', (req, res) => {
	const personId = parseInt(req.params.id);
	const queryHelper = Object.keys(req.body).map(element => `${ element.toUpperCase() } = ?`);
	const updateOnePerson = `UPDATE tblPeople SET ${queryHelper.join(', ')} WHERE tblPeople.oid = ?`;
	const queryValues = [...Object.values(req.body), personId];

	database.run(updateOnePerson, queryValues, function (error) {
		if (error) {
			console.log(new Error('Could not update person'), error);
			res.sendStatus(500);
		} else {
			console.log(`Person with ID ${personId} was successfully updated`);
			res.sendStatus(200);
		}
	})
});

// Delete person
app.delete('/api/people/:id', (req, res) => {
	const personId = req.params.id
	const getPerson = `DELETE FROM tblPeople WHERE tblPeople.oid = ?`;
	const deletePlaceTraveled = `DELETE FROM tblTraveled WHERE tblTraveled.people_ID = ?`
	database.all(getPerson, [personId], (error, results) => {
		if (error) {
			console.log(new Error('Could not delete person'), error);
			res.sendStatus(500)
		}
		console.log("Person was successfully deleted")
			
		database.all(deletePlaceTraveled, [personId], (error, results) => {
			if (error) {
				console.log(new Error('Could not delete place traveled'), error);
				res.sendStatus(500)
			}
			console.log("Place traveled was successfully deleted")
			res.status(200).json({message: "Delete successful!"});
		})
	})
});

// -------------------------------------------------------------------
// LOCATION ROUTES
// -------------------------------------------------------------------

// Get all locations
app.get('/api/locations', (req, res) => {
	const getLocations = `SELECT oid, * FROM tblLocations`;

	database.all(getLocations, (error, results) => {
		if (error) {
			console.log(new Error("Could not get locations"), error);
			res.sendStatus(500);
		}
		res.status(200).json(results);
	})
})

// Get one location
app.get('/api/locations/:id', (req, res) => {
	const locationId = req.params.id
	const getLocation = `SELECT * FROM tblLocations WHERE tblLocations.oid = ?`;

	database.all(getLocation, [locationId], (error, results) => {
		if (error) {
			console.log(new Error('Could not get location'), error);
			res.sendStatus(500);
		}
		res.status(200).json(results);
	})
});

// Create new location
app.post('/api/locations', (req, res) => {
	const reqBody = [req.body.country, req.body.city]
	const createNewLocation = "INSERT INTO tblLocations VALUES (?, ?)"

	database.run(createNewLocation, reqBody,(error, results) => {
		if (error) {
			console.log(`Error adding new location ${req.body.country}`)
			res.sendStatus(500)
		} else {
			console.log(`Added new location ${req.body.country}`)
			res.sendStatus(200)
		}
	})
});

// Update location
app.put('/api/locations/:id', (req, res) => {
	const locationId = parseInt(req.params.id);
	const queryHelper = Object.keys(req.body).map(element => `${ element.toUpperCase() } = ?`);
	const updateOneLocation = `UPDATE tblLocations SET ${queryHelper.join(', ')} WHERE tblLocations.oid = ?`;
	const queryValues = [...Object.values(req.body), locationId];

	database.run(updateOneLocation, queryValues, function (error) {
		if (error) {
			console.log(new Error('Could not update location'), error);
			res.sendStatus(500);
		} else {
			console.log(`Location with ID ${locationId} was successfully updated`);
			res.sendStatus(200);
		}
	})
});

// Delete location
app.delete('/api/locations/:id', (req, res) => {
	const locationId = req.params.id
	const getLocation = `DELETE FROM tblLocations WHERE tblLocations.oid = ?`;

	database.all(getLocation, [locationId], (error, results) => {
		if (error) {
			console.log(new Error('Could not delete location'), error);
			res.sendStatus(500)
		}
			console.log("Location was successfully deleted")
			res.status(200).json({message: "Delete successfully!"});
	})
});

// -------------------------------------------------------------------
// PLACES TRAVELED ROUTES
// -------------------------------------------------------------------

//Retrieve places traveled
app.get('/api/traveled', (req, res) => {
	const getTraveled = `select tblTraveled.oid, name, country, city, start_date_traveled, end_date_traveled from tblTraveled 
  join tblPeople on tblPeople.oid = tblTraveled.people_ID 
  join tblLocations on tblLocations.oid = tblTraveled.location_ID`;
	//const getTraveled = `SELECT oid, * FROM tblTraveled`;

	database.all(getTraveled, (error, results) => {
		if (error) {
			console.log(new Error("Could not pull up places traveled"), error);
			res.sendStatus(500);
		}
		res.status(200).json(results);
	})
})

//Retrieve place traveled based on row ID
app.get('/api/traveled/:id', (req, res) => {
  const traveledId = req.params.id;
  const queryString = `select tblTraveled.oid, name, country, city, start_date_traveled, end_date_traveled from tblTraveled 
  join tblPeople on tblPeople.oid = tblTraveled.people_ID 
  join tblLocations on tblLocations.oid = tblTraveled.location_ID 
  WHERE tblTraveled.oid = ?`;

  database.all(queryString, [traveledId], (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
    } else { 
        res.status(200).json(results)
    }
  })
});

// Create association between people and location (places traveled)
app.post('/api/traveled', (req, res) => {
	const personId = parseInt(req.body.people_ID);
	const locationId = parseInt(req.body.location_ID);
	const start = req.body.start_date_traveled
	const end = req.body.end_date_traveled
	const insertString = "INSERT INTO tblTraveled VALUES (?, ?, ?, ?)";

	database.run(insertString, [personId, locationId, start, end], error => {
		if (error) {
			console.log(error)
			res.sendStatus(500);
		} else {
			res.sendStatus(200)
		}
	})
})

// Retrieve a person's traveled locations using their ID
app.get('/api/traveled/people/:id', (req, res) => {
  const peopleId = req.params.id;
  const queryString = `select name, country, city, start_date_traveled, end_date_traveled from tblTraveled 
  join tblPeople on tblPeople.oid = tblTraveled.people_ID 
  join tblLocations on tblLocations.oid = tblTraveled.location_ID 
  WHERE people_id = ?`;

  database.all(queryString, [peopleId], (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
    } else { 
        res.status(200).json(results)
    }
  })
});

// Retrieve a location that people have traveled to using the location ID
app.get('/api/traveled/locations/:id', (req, res) => {
  const locationId = req.params.id;
  const queryString = `select name, country, city, start_date_traveled, end_date_traveled from tblTraveled 
  join tblPeople on tblPeople.oid = tblTraveled.people_ID 
  join tblLocations on tblLocations.oid = tblTraveled.location_ID 
  WHERE location_id = ?`;

  database.all(queryString, [locationId], (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
    } else { 
        res.status(200).json(results)
    }
  })
});

//Delete an existing traveled entry
app.delete('/api/traveled/:id', (req, res) => {
	const traveledId = req.params.id
	const getTraveled = `DELETE FROM tblTraveled WHERE tblTraveled.oid = ?`;

	database.all(getTraveled, [traveledId], (error, results) => {
		if (error) {
			console.log(new Error('Could not delete traveled entry'), error);
			res.sendStatus(500)
		}
			console.log("Traveled entry was successfully deleted")
			res.status(200).json({message: "Delete successfully!"});
	})
});

//Update an already existing traveled entry - IN PROGRESS
app.put('/api/traveled/:id', (req, res) => {
	const traveledId = parseInt(req.params.id);
	const queryHelper = Object.keys(req.body).map(element => `${ element.toUpperCase() } = ?`);
	const updateOneTraveled = `UPDATE tblTraveled SET ${queryHelper.join(', ')} WHERE tblTraveled.oid = ?`;
	const queryValues = [...Object.values(req.body), traveledId];

	database.run(updateOneTraveled, queryValues, function (error) {
		if (error) {
			console.log(new Error('Could not update traveled entry'), error);
			res.sendStatus(500);
		} else {
			console.log(`Traveled with ID ${traveledId} was successfully updated`);
			res.sendStatus(200);
		}
	})
});

// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});