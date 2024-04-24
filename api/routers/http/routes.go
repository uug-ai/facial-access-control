package http

import (
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
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

		// Secured endpoints..
		api.Use(authMiddleware.MiddlewareFunc())
		{
		}
	}
	return api
}
