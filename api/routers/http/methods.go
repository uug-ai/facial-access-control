package http

// Login godoc
// @Router /api/login [post]
// @ID login
// @Tags authentication
// @Summary Get Authorization token.
// @Description Get Authorization token.
// @Param credentials body models.Authentication true "Credentials"
// @Success 200 {object} models.Authorization
// @Failure 400 {object} ErrorResponse
// @Failure 401 {object} ErrorResponse
func Login() {
}