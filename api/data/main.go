package data

import "github.com/uug-ai/facial-access-control/api/models"

var Users = []models.User{
	{Id: 0, FirstName: "admin", LastName: "admin", Email: "admin@example.com", Password: "admin", Role: "admin", Language: "en"},
	{Id: 1, FirstName: "user", LastName: "user", Email: "user@example.com", Password: "user", Role: "user", Language: "en"},
	{Id: 2, FirstName: "Kilian", LastName: "Smith", Email: "kilian@example.com", Password: "Kilian", Role: "admin", Language: "en"},
	{Id: 3, FirstName: "Cedric", LastName: "Johnson", Email: "cedric@example.com", Password: "Cedric", Role: "admin", Language: "en"},
	{Id: 4, FirstName: "Johann", LastName: "Brown", Email: "johann@example.com", Password: "Johann", Role: "admin", Language: "en"},
	{Id: 5, FirstName: "Romain", LastName: "Davis", Email: "romain@example.com", Password: "Romain", Role: "admin", Language: "en"},
	{Id: 6, FirstName: "Alex", LastName: "Wilson", Email: "alex@example.com", Password: "Alex", Role: "admin", Language: "en"},
	{Id: 7, FirstName: "Mickael", LastName: "Taylor", Email: "mickael@example.com", Password: "Mickael", Role: "admin", Language: "en"},
	{Id: 8, FirstName: "Mickael", LastName: "Thomas", Email: "mickael@example.com", Password: "Mickael", Role: "admin", Language: "en"},
	{Id: 9, FirstName: "Mickael", LastName: "Robinson", Email: "mickael@example.com", Password: "Mickael", Role: "admin", Language: "en"},
	{Id: 10, FirstName: "Mickael", LastName: "Clark", Email: "mickael@example.com", Password: "Mickael", Role: "admin", Language: "en"},
}

var Locations = []models.Location{
		{Id: 1, Name: "Location 1", Address: "Address 1", Lat: 1.0, Lng: 1.0},
		{Id: 2, Name: "Location 2", Address: "Address 2", Lat: 2.0, Lng: 2.0},
		{Id: 3, Name: "Location 3", Address: "Address 3", Lat: 3.0, Lng: 3.0},
		{Id: 4, Name: "Location 4", Address: "Address 4", Lat: 4.0, Lng: 4.0},	
}



