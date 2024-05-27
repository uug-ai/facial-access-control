package controllers

import "github.com/uug-ai/facial-access-control/api/models"

// Locations godoc
// @Router /api/locations [get]
// @ID getLocations
// @Tags locations
// @Summary Get all locations
// @Description Get all locations
// @Success 200 {object} []models.Location
func GetLocations() []models.Location {
	// Generate random locations and return results
	locations := []models.Location{
		{Id: 1, Name: "Location 1", Address: "Address 1", Lat: 1.0, Lng: 1.0},
		{Id: 2, Name: "Location 2", Address: "Address 2", Lat: 2.0, Lng: 2.0},
		{Id: 3, Name: "Location 3", Address: "Address 3", Lat: 3.0, Lng: 3.0},
	}
	return locations
}
