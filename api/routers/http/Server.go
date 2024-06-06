package http

import (
	"log"

	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/uug-ai/facial-access-control/api/data"
	_ "github.com/uug-ai/facial-access-control/api/docs"
)

// @title Swagger Kerberos Agent API
// @version 1.0
// @description This is the API for using and configuring Kerberos Agent.
// @termsOfService https://kerberos.io

// @contact.name API Support
// @contact.url https://www.kerberos.io
// @contact.email support@kerberos.io

// @license.name Apache 2.0 - Commons Clause
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @BasePath /

// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization

func StartServer(port string) {

	// Initialize REST API
	r := gin.Default()

	// Register pprof routes for profiling
	pprof.Register(r)

	// Setup CORS
	r.Use(CORS())

	// Add Swagger
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// The JWT middleware
	authMiddleware := JWTMiddleware()

	// Add all routes
	AddRoutes(r, authMiddleware)

	// Print running port
	log.Println("Running on port: " + port)

   // Initialize data (hash passwords)
    data.Initialize()

	// Run the API on the specified port
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
