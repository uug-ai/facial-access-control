package database

import (
	"github.com/uug-ai/facial-access-control/api/models"
)

func GetUsers() []models.User {
	return GetUsersFromFile()
}

func GetLocations() []models.Location {
	return GetLocationsFromFile()
}

func AddUser(user models.User) error {
	return AddUserToFile(user)
}