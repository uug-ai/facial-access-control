package data

import (
	"log"

	"github.com/uug-ai/facial-access-control/api/models"
	"github.com/uug-ai/facial-access-control/api/utils"
)

var Users = []models.User{
    {Id: 0, FirstName: "admin", LastName: "admin", Email: "admin@example.com", Password: "admin", Role: "admin", Language: "en", Status: "onboarded", VideoPath: "/videos/video0.mp4"},
    {Id: 1, FirstName: "user", LastName: "user", Email: "user@example.com", Password: "user", Role: "user", Language: "en", Status: "onboarded", VideoPath: "/videos/video1.mp4"},
    {Id: 2, FirstName: "Kilian", LastName: "Smith", Email: "kilian@example.com", Password: "Kilian", Role: "admin", Language: "en", Status: "onboarded", VideoPath: "/videos/video2.mp4"},
    {Id: 3, FirstName: "Cedric", LastName: "Johnson", Email: "cedric@example.com", Password: "Cedric", Role: "admin", Language: "en", Status: "onboarded", VideoPath: "/videos/video3.mp4"},
    {Id: 4, FirstName: "Johann", LastName: "Brown", Email: "johann@example.com", Password: "Johann", Role: "admin", Language: "en", Status: "onboarded", VideoPath: "/videos/video4.mp4"},
    {Id: 5, FirstName: "Romain", LastName: "Davis", Email: "romain@example.com", Password: "Romain", Role: "admin", Language: "en", Status: "onboarded", VideoPath: "/videos/video5.mp4"},
    {Id: 6, FirstName: "Alex", LastName: "Wilson", Email: "alex@example.com", Password: "Alex", Role: "admin", Language: "en", Status: "onboarded", VideoPath: "/videos/video6.mp4"},
    {Id: 7, FirstName: "Mickael", LastName: "Taylor", Email: "mickael@example.com", Password: "Mickael", Role: "admin", Language: "en", Status: "invited", VideoPath: "/videos/video7.mp4"},
    {Id: 8, FirstName: "Luis", LastName: "Thomas", Email: "mickael1@example.com", Password: "Mickael", Role: "admin", Language: "en", Status: "invited", VideoPath: "/videos/video8.mp4"},
    {Id: 9, FirstName: "Glenn", LastName: "Robinson", Email: "mickael2@example.com", Password: "Mickael", Role: "admin", Language: "en", Status: "invited", VideoPath: "/videos/video9.mp4"},
    {Id: 10, FirstName: "Mickael", LastName: "Clark", Email: "mickael3@example.com", Password: "Mickael", Role: "admin", Language: "en", Status: "invited", VideoPath: "/videos/video10.mp4"},
}

var Locations = []models.Location{
		{Id: 1, Name: "Location 1", Address: "Address 1", Lat: 1.0, Lng: 1.0},
		{Id: 2, Name: "Location 2", Address: "Address 2", Lat: 2.0, Lng: 2.0},
		{Id: 3, Name: "Location 3", Address: "Address 3", Lat: 3.0, Lng: 3.0},
		{Id: 4, Name: "Location 4", Address: "Address 4", Lat: 4.0, Lng: 4.0},	
}

// Initialize function to hash passwords
func Initialize() {
    for i, user := range Users {
        hashedPassword, err := utils.Hash(user.Password)
        if err != nil {
            log.Fatalf("Error hashing password for user %s: %v", user.Email, err)
        }
        Users[i].Password = hashedPassword
    }
}

