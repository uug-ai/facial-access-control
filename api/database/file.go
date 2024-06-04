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


func AddUserToFile(user models.User) error {
    users := data.Users

    // Find the maximum ID in the current user list
    maxID := 0
    for _, u := range users {
        if u.Id > maxID {
            maxID = u.Id
        }
    }

    // Assign the new user an ID that is one greater than the current maximum
    user.Id = maxID + 1

    data.Users = append(data.Users, user)
    return nil
}

func DeleteUserFromFile(id int) error {
	users := data.Users
	for i, user := range users {
		if user.Id == id {
			data.Users = append(users[:i], users[i+1:]...)
			return nil
		}
	}
	return errors.New("user not found")
}


func GetLocationsFromFile() []models.Location {
	locations := data.Locations
	return locations
}

func AddLocationToFile(location models.Location) error {
	locations := data.Locations
	location.Id = len(locations) + 1
	// Check if the location already exists
	for _, l := range locations {
		if l.Id == location.Id {
			return errors.New("location already exists")
		}
	}
	data.Locations = append(data.Locations, location)
	return nil
}

func DeleteLocationFromFile(id int) error {
	locations := data.Locations
	for i, location := range locations {
		if location.Id == id {
			data.Locations = append(locations[:i], locations[i+1:]...)
			return nil
		}
	}
	return errors.New("location not found")
}