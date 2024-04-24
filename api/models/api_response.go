package models

type APIResponse struct {
	Data    interface{} `json:"data" bson:"data"`
	Message interface{} `json:"message" bson:"message"`
}
