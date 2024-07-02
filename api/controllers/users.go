package controllers

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/uug-ai/facial-access-control/api/database"
	"github.com/uug-ai/facial-access-control/api/encryption"
	"github.com/uug-ai/facial-access-control/api/models"
	"github.com/uug-ai/facial-access-control/api/notifications"
	"github.com/uug-ai/facial-access-control/api/utils"
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

	_, err := database.AddUser(user)
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

// InviteUser godoc
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
func InviteUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user data",
		})
		return
	}

	// Add user to the database
	addedUser, errUser := database.AddUser(user)
	if errUser != nil {
		switch errUser {
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

	// Create fingerprint
	now := time.Now()
	fmt.Printf("ID: %v\n", addedUser.Id)
	fingerprint := models.UserFingerprint{
		Email:      user.Email,
		FirstName:  user.FirstName,
		LastName:   user.LastName,
		Id:         addedUser.Id,
		Expiration: now.Add(time.Hour * 24 * 7).Unix(), // 1 week (7 days)
		Creation:   now.Unix(),
	}

	// Serialize fingerprint
	bufferBytes, err := json.Marshal(fingerprint)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error while encoding fingerprint",
		})
		return
	}

	// Encrypt the fingerprint using the ENV variable PRIVATE_KEY
	encryptionKey := os.Getenv("PRIVATE_KEY")
	if encryptionKey == "" {
		c.JSON(500, gin.H{
			"error": "No encryption key found",
		})
		return
	}

	encryptedFingerprint, err := encryption.AesEncrypt(bufferBytes, encryptionKey)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error while encrypting fingerprint",
		})
		return
	}

	base64Fingerprint := utils.Base64Encode(string(encryptedFingerprint))
	fprint := utils.EncodeURL(base64Fingerprint)

	mail := notifications.SMTP{
		Server:     os.Getenv("SMTP_SERVER"),
		Port:       os.Getenv("SMTP_PORT"),
		Username:   os.Getenv("SMTP_USERNAME"),
		Password:   os.Getenv("SMTP_PASSWORD"),
		EmailFrom:  os.Getenv("EMAIL_FROM"),
		EmailTo:    user.Email,
		TemplateId: "invite",
	}

	// Get base url
	baseUrl := os.Getenv("BASE_URL")
	if baseUrl != "" {
		baseUrl = utils.RemoveTrailingSlash(baseUrl)
	}

	message := notifications.Message{
		Title: "Invitation",
		Body:  "You have been invited to join the Facial Access Control",
		User:  user.Email,
		Data: map[string]string{
			"link":      baseUrl + "/onboarding?token=" + fprint,
			"firstname": user.FirstName,
		},
	}

	if err := mail.Send(message); err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to send invite to user",
		})
		return
	}

	c.JSON(201, gin.H{
		"message": "User successfully invited",
	})
}

// UpdateUser godoc
// @Router /api/users/{id} [patch]
// @Security Bearer
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @ID updateUser
// @Tags users
// @Summary Update user
// @Description Update user
// @Param id path int true "User ID"
// @Accept json
// @Produce json
// @Param user body models.User true "User data"
// @Success 200
// @Failure 400
// @Failure 500
func UpdateUser(c *gin.Context) {
	id := c.Param("id")

	userID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user data",
		})
		return
	}

	user.Id = userID
	if err := database.UpdateUser(user); err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to update user",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "User updated successfully",
	})
}
