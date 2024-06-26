package utils

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func PrintASCIIArt() {
	asciiArt := `
	__    __   __    __    _______         ___       __  
	|  |  |  | |  |  |  |  /  _____|       /   \     |  | 
	|  |  |  | |  |  |  | |  |  __        /  ^  \    |  | 
	|  |  |  | |  |  |  | |  | |_ |      /  /_\  \   |  | 
	|  |--|  | |  |--|  | |  |__| |  __ /  _____  \  |  | 
	 \______/   \______/   \______| (__)__/     \__\ |__| 
														 
	`
	fmt.Println(asciiArt)
}

func Hash(str string) (string, error) {
    hashed, err := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)
    return string(hashed), err
}

func IsSame(str string, hashed string) bool {
    return bcrypt.CompareHashAndPassword([]byte(hashed), []byte(str)) == nil
}
