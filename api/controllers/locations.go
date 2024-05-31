package controllers

import (
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
func GetLocations() []models.Location {
	locations := database.GetLocations()
	return locations
}

// Location godoc
// @Router /api/locations/{id} [get]
// @ID getLocation
// @Tags locations
// @Summary Get location by ID
// @Description Get location by ID
// @Param id path int true "Location ID"
// @Success 200 {object} models.Location
func GetLocation(id int) models.Location {
	locations := database.GetLocations()
	for _, location := range locations {
		if location.Id == id {
			return location
		}
	}
	return models.Location{}
}

