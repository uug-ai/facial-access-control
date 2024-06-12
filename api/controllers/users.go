package controllers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/uug-ai/facial-access-control/api/database"
	"github.com/uug-ai/facial-access-control/api/models"
)

// user godoc
// @Router /api/users [get]
// @ID getUsers
// @Tags users
// @Summary Get all users
// @Description Get all users
// @Success 200 {array} models.User
func GetUsers(c *gin.Context) []models.User {
	users := database.GetUsers()
	c.JSON(200, gin.H{
		"data": users,
	})
	return nil
}

// user godoc
// @Router /api/users/{id} [get]
// @ID getUser
// @Tags users
// @Summary Get user
// @Description Get user
// @Param id path int true "User ID"
// @Success 200 {object} models.User
func GetUser(c *gin.Context) models.User {
	id := c.Param("id")

	userID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user ID",
		})
		return models.User{}
	}

	user := database.GetUser(userID)

	c.JSON(200, gin.H{
		"data": user,
	})
	return user
}

// user godoc
// @Router /api/users [post]
// @ID addUser
// @Tags users
// @Summary Add user
// @Description Add user
// @Accept json
// @Produce json
// @Param user body models.User true "User data"
// @Success 201 {object} models.User
func AddUser(c *gin.Context) error {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user data",
		})
		return err
	}

	if err := database.AddUser(user); err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to add user",
		})
		return err
	}

	c.JSON(201, gin.H{
		"message": "User added successfully",
		"user":    user,
	})
	return nil
}

// user godoc
// @Router /api/users/{id} [delete]
// @ID deleteUser
// @Tags users
// @Summary Delete user
// @Description Delete user
// @Param id path int true "User ID"
// @Success 200
func DeleteUser(c *gin.Context) error {
	id := c.Param("id")

	userID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user ID",
		})
		return err
	}

	if err := database.DeleteUser(userID); err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to delete user",
		})
		return err
	}

	c.JSON(200, gin.H{
		"message": "User deleted successfully",
	})
	return nil
}

// user godoc
// @Router /api/users/onboard [post]
// @ID onboardUser
// @Tags users
// @Summary Onboard a user using a fingerprint and a video
// @Description Onboard a user using a fingerprint and a video
// @Success 200
func OnboardUser(c *gin.Context) error {
	return nil
}
