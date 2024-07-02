package database

import (
	"errors"

	"github.com/uug-ai/facial-access-control/api/data"
	"github.com/uug-ai/facial-access-control/api/models"
	"github.com/uug-ai/facial-access-control/api/utils"
)

var ErrUserAlreadyExists = errors.New("user already exists")
var ErrInvalidUserData = errors.New("invalid user data")

func GetUsersFromFile() []models.User {
	// Directly return users from data without re-hashing passwords
	return data.Users
}

func GetUserByIdFromFile(id int) models.User {
	users := GetUsersFromFile()
	for _, user := range users {
		if user.Id == id {
			return user
		}
	}
	return models.User{}
}

func GetUserByEmailFromFile(email string) models.User {
	users := GetUsersFromFile()
	for _, user := range users {
		if user.Email == email {
			return user
		}
	}
	return models.User{}
}

func AddUserToFile(user models.User) (models.User, error) {
	users := GetUsersFromFile()

	// Find the maximum ID in the current user list
	maxID := 0
	for _, u := range users {
		if u.Email == user.Email {
			return models.User{}, ErrUserAlreadyExists
		}
		if u.Id > maxID {
			maxID = u.Id
		}
	}

	// Assign the new user an ID that is one greater than the current maximum
	user.Id = maxID + 1

	// Hash the user's password before saving
	hashedPassword, err := utils.Hash(user.Password)
	if err != nil {
		return models.User{}, err
	}
	user.Password = hashedPassword

	data.Users = append(data.Users, user)
	return user, nil
}

func DeleteUserFromFile(id int) error {
	users := GetUsersFromFile()
	for i, user := range users {
		if user.Id == id {
			data.Users = append(users[:i], users[i+1:]...)
			return nil
		}
	}
	return errors.New("user not found")
}

func UpdateUserFromFile(user models.User) error {
	users := GetUsersFromFile()
	for i, u := range users {
		if u.Id == user.Id {
			users[i] = user
			return nil
		}
	}
	return errors.New("user not found")
}

func OnboardUserToFile(user models.User) error {
	users := GetUsersFromFile()
	for i, u := range users {
		if u.Email == user.Email {
			user.Status = "onboarded"
			users[i] = user
			return nil
		}
	}
	return errors.New("user not found")
}

func GetLocationsFromFile() []models.Location {
	locations := data.Locations
	return locations
}

func GetLocationFromFile(id int) models.Location {
	locations := data.Locations
	for _, location := range locations {
		if location.Id == id {
			return location
		}
	}
	return models.Location{}
}

func AddLocationToFile(location models.Location) error {
	locations := data.Locations

	// Find the maximum ID in the current user list
	maxID := 0
	for _, location := range locations {
		if location.Id > maxID {
			maxID = location.Id
		}
	}

	// Assign the new user an ID that is one greater than the current maximum
	location.Id = maxID + 1

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
