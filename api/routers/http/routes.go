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

		api.POST("/users/onboard", func(c *gin.Context) {
			controllers.OnboardUser(c)
		})
			
		// Secured endpoints..
		api.Use(authMiddleware.MiddlewareFunc())
		{
			api.GET("/dashboard", func(c *gin.Context) {
				c.JSON(200, gin.H{
					"message": "dashboard",
				})
			})

			//users
			api.GET("/users", func(c *gin.Context) {
				controllers.GetUsers(c)
			})

			api.GET("/users/:id", func(c *gin.Context) {
				controllers.GetUserById(c)
			})

			api.POST("/users", func(c *gin.Context) {
				controllers.AddUser(c)
			})

			api.DELETE("/users/:id", func(c *gin.Context) {
				controllers.DeleteUser(c)
			})

			
			// End users

			// Locations
			api.GET("/locations", func(c *gin.Context) {
				controllers.GetLocations(c)
			})

			api.GET("/locations/:id", func(c *gin.Context) {
				controllers.GetLocation(c)
			})

			api.POST("/locations", func(c *gin.Context) {
				controllers.AddLocation(c)
			})
			api.DELETE("/locations/:id", func(c *gin.Context) {
				controllers.DeleteLocation(c)
			})
			// End Locations
		}
	}
	return api
}
