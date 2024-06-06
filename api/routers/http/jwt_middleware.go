package http

import (
	"log"
	"net/http"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	jwtgo "github.com/golang-jwt/jwt/v4"
	"github.com/uug-ai/facial-access-control/api/database"
	"github.com/uug-ai/facial-access-control/api/models"
	"github.com/uug-ai/facial-access-control/api/utils"
)

func JWTMiddleware() *jwt.GinJWTMiddleware {

	identityKey := "id"
	myKey := os.Getenv("JWT_SECRET")
	if myKey == "" {
		myKey = "TOBECHANGED"
	}

	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "uuftai",
		Key:         []byte(myKey),
		Timeout:     time.Hour * 24,
		MaxRefresh:  time.Hour * 24 * 7,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*models.User); ok {
				return jwt.MapClaims{
					identityKey: v,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			user := claims[identityKey].(map[string]interface{})
			return &models.User{
				Email: user["email"].(string),
				Role:  user["role"].(string),
			}
		},
	Authenticator: func(c *gin.Context) (interface{}, error) {
    var user models.User
    if err := c.ShouldBind(&user); err != nil {
        log.Println("Binding error:", err)
        return "", jwt.ErrMissingLoginValues
    }
    email := user.Email
    password := user.Password

    log.Println("Attempting to authenticate user:", email)
    userFound := database.GetUserByEmail(email)

    if userFound.Email != "" {
        log.Printf("Stored hashed password: %s\n", userFound.Password)
        if utils.IsSame(password, userFound.Password) {
            log.Println("Authentication successful for user:", email)
            return &models.User{
                Email: userFound.Email,
            }, nil
        } else {
            log.Println("Password mismatch for user:", email)
        }
    } else {
        log.Println("User not found for email:", email)
    }

    return nil, jwt.ErrFailedAuthentication
},

		LoginResponse: func(c *gin.Context, code int, token string, expire time.Time) {
			// Decrypt the token
			hmacSecret := []byte(myKey) // Key used for decrypting the token
			t, err := jwtgo.Parse(token, func(token *jwtgo.Token) (interface{}, error) {
				return hmacSecret, nil
			})
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse token"})
				return
			}

			// Get the claims
			claims, ok := t.Claims.(jwtgo.MapClaims)
			if !ok || !t.Valid {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid token"})
				return
			}
			user := claims[identityKey].(map[string]interface{})

			c.JSON(http.StatusOK, gin.H{
				"code":   http.StatusOK,
				"token":  token,
				"expire": expire.Format(time.RFC3339),
				"email":  user["email"].(string),
				"role":   user["role"].(string),
			})
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			if _, ok := data.(*models.User); ok {
				return true
			}
			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.AbortWithStatusJSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		TokenLookup:   "header: Authorization, query: token, cookie: jwt",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	})
	if err != nil {
		log.Fatalf("JWT Error: %s", err.Error())
	}

	return authMiddleware
}
