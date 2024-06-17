package models

type User struct {
	Id        int    `json:"id" bson:"id"`
	FirstName string `json:"firstname" bson:"firstname"`
	LastName  string `json:"lastname" bson:"lastname"`
	Email     string `json:"email" bson:"email"`
	Password  string `json:"password" bson:"password"`
	Role      string `json:"role" bson:"role"`
	Language  string `json:"language" bson:"language"`
	Status	  string `json:"status" bson:"status"`
	VideoPath string `json:"videopath" bson:"videopath"`
}

type Authentication struct {
	Email string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}

type Authorization struct {
	Code     int    `json:"code" bson:"code"`
	Token    string `json:"token" bson:"token"`
	Expire   string `json:"expire" bson:"expire"`
	Email string `json:"email" bson:"email"`
	Role     string `json:"role" bson:"role"`
}
