
# secondProject

ERD:
<img src="pics/erd.png"/>

## What is it?
This project is an API that I have created around people and they places they have visited.

## Approach taken:
I wanted to use the backend knowledge that I was taught to create an API. I created this API so that I can see where friends of mine have gone and when. With this information, if I choose to visit the same place(s), I'll know who to ask! 

## People
GET Request will retrieve all records in the people table including their row ID

<b> GET /api/people/ </b> 
```
	{
        "rowid": 1,
        "name": "Joe Mama",
        "date_of_birth": "1/1/01"
    },
    {
        "rowid": 2,
        "name": "Hugh Jass",
        "date_of_birth": "2/2/02"
    },
    {
        "rowid": 3,
        "name": "Jenna Talia",
        "date_of_birth": null
    }
```
GET Request by ID will retrieve the record that matches that person's row ID

<b> GET /api/people/1/ </b> 
```
	{
        "rowid": 1,
        "name": "Joe Mama",
        "date_of_birth": "1/1/01"
    }
 ```

POST Request will let you create a new record and an ID will also automatically be created via row ID

<b> POST /api/people/ </b> 
```
	{
        "name": "insert string",
        "date_of_birth": "insert string"
    }
 ```

PUT Request will let you update an existing record by its ID

<b> PUT /api/people/:id/ </b> 
```
	{
        "name": "updated string",
        "date_of_birth": "updated string"
    }
 ```

DELETE Request will let you delete an existing record by its ID

<b> DELETE /api/people/:id/ </b> 

## Locations
GET Request will retrieve all records in the locations table including their row ID

<b> GET /api/locations/ </b> 
```
	{
		"rowid":  1,
		"country":  "France",
		"city":  "Condom"
	},
	{
		"rowid":  2,
		"country":  "Canada",
		"city":  "Pilot Butte"
	},
	{
		"rowid":  3,
		"country":  "Madagascar",
		"city":  "Gogogogo"
	},
```
GET Request by ID will retrieve the record that matches that location's row ID

<b> GET /api/locations/:id/ </b> 
```
	{
		"rowid":  1,
		"country":  "France",
		"city":  "Condom"
	},
 ```

POST Request will let you create a new record and an ID will also automatically be created via row ID

<b> POST /api/locations/ </b> 
```
	{
        "country": "insert string",
        "city": "insert string"
    }
 ```

PUT Request will let you update an existing record by its ID

<b> PUT /api/locations/:id/ </b> 
```
	{
        "country": "updated string",
        "city": "updated string"
    }
 ```

DELETE Request will let you delete an existing record by its ID

<b> DELETE /api/locations/:id/ </b> 

## Traveled
GET Request will retrieve all records in the traveled table including their row ID

<b> GET /api/traveled/ </b> 
```
	{
		"rowid":  1,
		"name":  "RJ",
		"country":  "France",
		"city":  "Paris",
		"start_date_traveled":  "02/02/01",
		"end_date_traveled":  "06/05/03"
	},
	{
		"rowid":  2,
		"name":  "Todd",
		"country":  "Japan",
		"city":  "Tokyo",
		"start_date_traveled":  "12/02/17",
		"end_date_traveled":  "1/05/18"
	},
	{
		"rowid":  3,
		"name":  "Jason",
		"country":  "England",
		"city":  "London",
		"start_date_traveled":  "01/01/01",
		"end_date_traveled":  "02/02/02"
	}
```
This GET Request will retrieve a person's traveled locations using their ID

<b> GET /api/traveled/people/:id </b> 
```
	{
		"rowid":  1,
		"name":  "RJ",
		"country":  "France",
		"city":  "Paris",
		"start_date_traveled":  "02/02/01",
		"end_date_traveled":  "06/05/03"
	}, 
	{
		"rowid":  4,
		"name":  "RJ",
		"country":  "England",
		"city":  "London",
		"start_date_traveled":  "11/03/04",
		"end_date_traveled":  "12/05/04"
	},
 ```
 
This GET Request will retrieve a location that people have traveled to using the location ID

<b> GET /api/traveled/locations/:id </b> 
```
	{
		"rowid":  1,
		"name":  "RJ",
		"country":  "France",
		"city":  "Paris",
		"start_date_traveled":  "02/02/01",
		"end_date_traveled":  "06/05/03"
	},
	{
		"rowid":  3,
		"name":  "Todd",
		"country":  "France",
		"city":  "Paris",
		"start_date_traveled":  "09/02/01",
		"end_date_traveled":  "10/03/02"
	}
 ```

POST Request will let you create a new record that relates a person to a place they visited and an ID will also automatically be created via row ID

<b> POST /api/people/ </b> 
```
	{
        "people_ID": insert integer,
        "location_ID": insert integer,
        "start_date_traveled": "insert string",
        "end_date_traveled": "insert string"
	}
 ```


--RJ