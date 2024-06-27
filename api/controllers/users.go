package controllers

import (
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/uug-ai/facial-access-control/api/database"
	"github.com/uug-ai/facial-access-control/api/models"
	"github.com/uug-ai/facial-access-control/api/notifications"
)

// user godoc
// @Router /api/users [get]
// @Security Bearer
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
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
// @Security Bearer
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @ID getUser
// @Tags users
// @Summary Get user
// @Description Get user
// @Param id path int true "User ID"
// @Success 200 {object} models.User
func GetUserById(c *gin.Context) models.User {
	id := c.Param("id")

	userID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user ID",
		})
		return models.User{}
	}

	user := database.GetUserById(userID)

	c.JSON(200, gin.H{
		"data": user,
	})
	return user
}

// user godoc
// @Router /api/users/{email} [get]
// @Security Bearer
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @ID getUserByEmail
// @Tags users
// @Summary Get user by email
// @Description Get user by email
// @Param email path string true "User email"
// @Success 200 {object} models.User
func GetUserByEmail(c *gin.Context) models.User {
	email := c.Param("email")

	user := database.GetUserByEmail(email)

	c.JSON(200, gin.H{
		"data": user,
	})
	return user
}

// @Router /api/users [post]
// @Security Bearer
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @ID addUser
// @Tags users
// @Summary Add user
// @Description Add user
// @Accept json
// @Produce json
// @Param user body models.User true "User data"
// @Success 201 {object} models.User
// @Failure 400
// @Failure 409
// @Failure 500
func AddUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user data",
		})
		return
	}

	err := database.AddUser(user)
	if err != nil {
		switch err {
		case database.ErrUserAlreadyExists:
			c.JSON(409, gin.H{
				"error": "User already exists",
			})
		default:
			c.JSON(500, gin.H{
				"error": "Failed to add user",
			})
		}
		return
	}

	c.JSON(201, gin.H{
		"message": "User added successfully",
		"user":    user,
	})
}

// user godoc
// @Router /api/users/{id} [delete]
// @Security Bearer
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
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
// @Router /api/users/invite [post]
// @Security Bearer
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @ID inviteUser
// @Tags users
// @Summary Invite
// @Description Invite user
// @Success 200
func InviteUser(c *gin.Context) error {

	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user data",
		})
		return err
	}

	mail := notifications.SMTP{
		Server:     os.Getenv("SMTP_SERVER"),
		Port:       os.Getenv("SMTP_PORT"),
		Username:   os.Getenv("SMTP_USERNAME"),
		Password:   os.Getenv("SMTP_PASSWORD"),
		EmailFrom:  os.Getenv("EMAIL_FROM"),
		EmailTo:    user.Email,
		TemplateId: "invite",
	}

	message := notifications.Message{
		Title: "Invitation",
		Body:  "You have been invited to join the Facial Acces Control",
		User:  user.Email,
	}

	if err := mail.Send(message); err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to send invite to user",
		})
		return err
	}

	c.JSON(200, gin.H{
		"message": "User successfully invited",
	})
	return nil
}
