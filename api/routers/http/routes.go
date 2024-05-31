package http

import (
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

		api.GET("/users", func(c *gin.Context) {
			// Create a list of random users
			users := controllers.GetUsers()
			c.JSON(200, gin.H{
				"data": users,
			})
		})

		api.GET("/user/:id", func(c *gin.Context) {
			// Create a list of random users
			user := controllers.GetUser(1)
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
