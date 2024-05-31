package database

import (
	"github.com/uug-ai/facial-access-control/api/data"
	"github.com/uug-ai/facial-access-control/api/models"
)


func GetUsersFromFile() []models.User {
	users := data.Users
	return users
}

func GetLocationsFromFile() []models.Location {
	locations := data.Locations
	return locations
}