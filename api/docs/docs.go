// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "https://kerberos.io",
        "contact": {
            "name": "API Support",
            "url": "https://www.kerberos.io",
            "email": "support@kerberos.io"
        },
        "license": {
            "name": "Apache 2.0 - Commons Clause",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/locations": {
            "get": {
                "description": "Get all locations",
                "tags": [
                    "locations"
                ],
                "summary": "Get all locations",
                "operationId": "getLocations",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Location"
                            }
                        }
                    }
                }
            }
        },
        "/api/login": {
            "post": {
                "description": "Get Authorization token.",
                "tags": [
                    "authentication"
                ],
                "summary": "Get Authorization token.",
                "operationId": "login",
                "parameters": [
                    {
                        "description": "Credentials",
                        "name": "credentials",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.Authentication"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Authorization"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "models.Authentication": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "models.Authorization": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "expire": {
                    "type": "string"
                },
                "role": {
                    "type": "string"
                },
                "token": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "models.Location": {
            "type": "object",
            "properties": {
                "address": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "lat": {
                    "type": "number"
                },
                "lng": {
                    "type": "number"
                },
                "name": {
                    "type": "string"
                }
            }
        }
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "Swagger Kerberos Agent API",
	Description:      "This is the API for using and configure Kerberos Agent.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
