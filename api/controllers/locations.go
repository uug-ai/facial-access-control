package controllers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/uug-ai/facial-access-control/api/database"
	"github.com/uug-ai/facial-access-control/api/models"
)

// Locations godoc
// @Router /api/locations [get]
// @ID getLocations
// @Tags locations
// @Summary Get all locations
// @Description Get all locations
// @Success 200 {object} []models.Location
func GetLocations(c *gin.Context) []models.Location {
	// Create a list of random locations
			locations := database.GetLocations()
			c.JSON(200, gin.H{
				"data": locations,
			})
			return nil;
}

// Location godoc
// @Router /api/locations/{id} [get]
// @ID getLocation
// @Tags locations
// @Summary Get location by ID
// @Description Get location by ID
// @Param id path int true "Location ID"
// @Success 200 {object} models.Location
func GetLocation(c *gin.Context) models.Location {
				// Get the id parameter from the URL
			id := c.Param("id")

			// Convert id to an integer
			locationID, err := strconv.Atoi(id)
			if err != nil {
				c.JSON(400, gin.H{
					"error": "Invalid location ID",
				})
				return models.Location{}
			}

			// Use the locationID to fetch the location
			location := database.GetLocation(locationID)

			c.JSON(200, gin.H{
				"data": location,
			})
			return location
}


// location godoc
// @Router /api/locations [post]
// @ID addLocation
// @Tags locations
// @Summary Create location
// @Description Create location
// @Accept json
// @Produce json
// @Param location body models.Location true "Location"
// @Success 200 {object} models.Location
func AddLocation(c *gin.Context) error {
	var location models.Location
	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid location data",
		})
		return err
	}

	if err := database.AddLocation(location); err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to add location",
		})
	return err
	}

	c.JSON(201, gin.H{
		"message": "Location added successfully",
		"location": location,
	})
	return nil	
}

// location godoc
// @Router /api/locations/{id} [delete]
// @ID deleteLocation
// @Tags locations
// @Summary Delete location
// @Description Delete location
// @Param id path int true "Location ID"
// @Success 200
func DeleteLocation(c *gin.Context) error {
	id := c.Param("id")
	locationID, err := strconv.Atoi(id)
	
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid location ID",
		})
		return err
	}

	if err := database.DeleteLocation(locationID); err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to delete location",
		})
		return err
	}

	c.JSON(200, gin.H{
		"message": "Location deleted successfully",
	})
	return nil
}


