package data

import "github.com/uug-ai/facial-access-control/api/models"

var Users = []models.User{
	{Id: 0, Installed: true, Username: "admin", Password: "admin", Role: "admin", Language: "en"},
	{Id: 1, Installed: true, Username: "user", Password: "user", Role: "user", Language: "en"},
	{Id: 2, Installed: true, Username: "Kilian", Password: "Kilian", Role: "admin", Language: "en"},
	{Id: 3, Installed: true, Username: "Cedric", Password: "Cedric", Role: "admin", Language: "en"},
}

var Locations = []models.Location{
		{Id: 1, Name: "Location 1", Address: "Address 1", Lat: 1.0, Lng: 1.0},
		{Id: 2, Name: "Location 2", Address: "Address 2", Lat: 2.0, Lng: 2.0},
		{Id: 3, Name: "Location 3", Address: "Address 3", Lat: 3.0, Lng: 3.0},
		{Id: 4, Name: "Location 4", Address: "Address 4", Lat: 4.0, Lng: 4.0},	
}



