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
func AddLocation(location models.Location) error {
	err := database.AddLocation(location)
	return err
}

// location godoc
// @Router /api/locations/{id} [delete]
// @ID deleteLocation
// @Tags locations
// @Summary Delete location
// @Description Delete location
// @Param id path int true "Location ID"
// @Success 200
func DeleteLocation(id int) error {
	err := database.DeleteLocation(id)
	return err
}


