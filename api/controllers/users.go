package controllers

import (
	"fmt"

	"github.com/uug-ai/facial-access-control/api/models"
)

var users = []models.User{
	{Id: 0, Installed: true, Username: "admin", Password: "admin", Role: "admin", Language: "en"},
	{Id: 1, Installed: true, Username: "user", Password: "user", Role: "user", Language: "en"},
	{Id: 2, Installed: true, Username: "Kilian", Password: "Kilian", Role: "admin", Language: "en"},
	{Id: 3, Installed: true, Username: "Cedric", Password: "Cedric", Role: "admin", Language: "en"},
}


// users godoc
// @Router /api/users [get]
// @ID getUsers
// @Tags users
// @Summary Get all users
// @Description Get all users
// @Success 200 {object} []models.User
func GetUsers() []models.User {
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
	for _, user := range users {
		if user.Id == id {
			return user
		}
	}
	return models.User{}
}