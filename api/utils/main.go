package utils

import (
	"fmt"
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
