package database

import (
	"errors"

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

func AddUserToFile(user models.User) error {
	users := data.Users
	user.Id = len(users) + 1
	// Check if the user already exists
	for _, u := range users {
		if u.Id == user.Id {
			return errors.New("user already exists")
		}
	}
	data.Users = append(data.Users, user)
	return nil
}