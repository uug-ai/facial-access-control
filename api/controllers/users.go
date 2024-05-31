package controllers

import (
	"errors"

	"github.com/uug-ai/facial-access-control/api/database"
	"github.com/uug-ai/facial-access-control/api/models"
)

// users godoc
// @Router /api/users [get]
// @ID getUsers
// @Tags users
// @Summary Get all users
// @Description Get all users
// @Success 200 {object} []models.User
func GetUsers() []models.User {
	users := database.GetUsers()
	return users
}

// user godoc
// @Router /api/users/{id} [get]
// @ID getUser
// @Tags users
// @Summary Get user by id
// @Description Get user by id
// @Param id path int true "User ID"
// @Success 200 {object} models.User
func GetUser(id int) models.User {
	users := database.GetUsers()
	for _, user := range users {
		if user.Id == id {
			return user
		}
	}
	return models.User{}
}

// user godoc
// @Router /api/users [post]
// @ID addUser
// @Tags users
// @Summary Create user
// @Description Create user
// @Accept json
// @Produce json
// @Param user body models.User true "User"
// @Success 200 {object} models.User
func AddUser(user models.User) error {
	users := database.GetUsers()
	// Check if the user already exists
	for _, u := range users {
		if u.Id == user.Id {
			return errors.New("user already exists")
		}
	}
	user.Id = len(users) + 1
	users = append(users, user)
	return nil
}
