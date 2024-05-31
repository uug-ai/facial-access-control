package http

import (
	"strconv"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/uug-ai/facial-access-control/api/controllers"
)

func AddRoutes(r *gin.Engine, authMiddleware *jwt.GinJWTMiddleware) *gin.RouterGroup {

	api := r.Group("/api")
	{
		api.POST("/login", authMiddleware.LoginHandler)

		api.GET("/dashboard", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "dashboard",
			})
		})

		api.GET("/locations", func(c *gin.Context) {
			// Create a list of random locations
			locations := controllers.GetLocations()
			c.JSON(200, gin.H{
				"data": locations,
			})
		})

		api.GET("/locations/:id", func(c *gin.Context) {
			// Get the id parameter from the URL
			id := c.Param("id")

			// Convert id to an integer
			locationID, err := strconv.Atoi(id)
			if err != nil {
				c.JSON(400, gin.H{
					"error": "Invalid location ID",
				})
				return
			}

			// Use the locationID to fetch the location
			location := controllers.GetLocation(locationID)

			c.JSON(200, gin.H{
				"data": location,
			})
		})
		

		api.GET("/users", func(c *gin.Context) {
			// Create a list of random users
			users := controllers.GetUsers()
			c.JSON(200, gin.H{
				"data": users,
			})
		})

		api.GET("/users/:id", func(c *gin.Context) {
			// Get the id parameter from the URL
			id := c.Param("id")

			// Convert id to an integer
			userID, err := strconv.Atoi(id)
			if err != nil {
				c.JSON(400, gin.H{
					"error": "Invalid user ID",
				})
				return
			}

			// Use the userID to fetch the user
			user := controllers.GetUser(userID)

			c.JSON(200, gin.H{
				"data": user,
			})
		})

		// Secured endpoints..
		api.Use(authMiddleware.MiddlewareFunc())
		{
		}
	}
	return api
}
