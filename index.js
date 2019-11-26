let express = require('express');
let database = require('./database.js');
let app = express();

app.use(express.json());

const port = 3000;

//Routes
app.get('/', (req, res) => {
	response.send('Visit /api/people or /api/locations to see info');
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
	const getPerson = `SELECT * FROM tblPeople WHERE tblPeople.oid = ?`;

	database.all(getPerson, [personId], (error, results) => {
		if (error) {
			console.log(new Error('Could not get book'), error);
			res.sendStatus(500);
		}
		res.status(200).json(results);
	})
});

// Create new person
app.post('/api/people', (req, res) => {
	const reqBody = [req.body.name, req.body.date_of_birth]
	const createNewPerson = "INSERT INTO tblPeople VALUES (?, ?)"

	database.run(createNewPerson, reqBody,(error, results) => {
		if (error) {
			console.log(`Error adding new person ${req.body.name}`)
			res.sendStatus(500)
		} else {
			console.log(`Added new person ${req.body.name}`)
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

	database.all(getPerson, [personId], (error, results) => {
		if (error) {
			console.log(new Error('Could not delete person'), error);
			res.sendStatus(500)
		}
			console.log("Person was successfully deleted")
			res.status(200).json({message: "Delete successfully!"});
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

// Delete person
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

// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});