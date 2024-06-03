package database

import (
	"github.com/uug-ai/facial-access-control/api/models"
)

func GetUsers() []models.User {
	return GetUsersFromFile()
}
func AddUser(user models.User) error {
	return AddUserToFile(user)
}
func DeleteUser(id int) error {
	return DeleteUserFromFile(id)
}
func GetLocations() []models.Location {
	return GetLocationsFromFile()
}
func AddLocation(location models.Location) error {
	return AddLocationToFile(location)
}
func DeleteLocation(id int) error {
	return DeleteLocationFromFile(id)
}
