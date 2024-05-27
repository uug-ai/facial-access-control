package controllers

import "github.com/uug-ai/facial-access-control/api/models"

// users godoc
// @Router /api/users [get]
// @ID getUsers
// @Tags users
// @Summary Get all users
// @Description Get all users
// @Success 200 {object} []models.User
func GetUsers() []models.User {
	users := []models.User{
		{Installed: true, Username: "admin", Password: "admin", Role: "admin", Language: "en"},
		{Installed: true, Username: "user", Password: "user", Role: "user", Language: "en"},
		{Installed: true, Username: "Kilian", Password: "Kilian", Role: "admin", Language: "en"},
	}
	return users
}