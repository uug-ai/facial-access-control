package utils

import (
	"encoding/base64"
	"fmt"
	"math/rand"
	"strconv"
	"time"

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

func init() {
	rand.Seed(time.Now().UnixNano())
}

const letterBytes = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandStringBytesRmndr(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Int63()%int64(len(letterBytes))]
	}
	return string(b)
}

func Contains(arr []string, str string) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}

func GetDate(timezone string, timestamp int64) string {
	t := time.Unix(timestamp, 0)
	loc, _ := time.LoadLocation(timezone)
	return t.In(loc).Format("02-01-2006")
}

func GetHour(timezone string, timestamp int64) int {
	t := time.Unix(timestamp, 0)
	loc, _ := time.LoadLocation(timezone)
	return t.In(loc).Hour()
}

func GetTime(timezone string, timestamp int64) string {
	t := time.Unix(timestamp, 0)
	loc, _ := time.LoadLocation(timezone)
	return t.In(loc).Format("15:04:05")
}

func StringToInt(s string) int {
	i, err := strconv.Atoi(s)
	if err != nil {
		return 0
	}
	return i
}

func GetDateTime(timezone string, timestamp int64) string {
	t := time.Unix(timestamp, 0)
	loc, _ := time.LoadLocation(timezone)
	return t.In(loc).Format("02-01-2006 - 15:04:05")
}

func GetDateTimeLong(timezone string, timestamp int64) string {
	t := time.Unix(timestamp, 0)
	loc, _ := time.LoadLocation(timezone)
	timeInLocation := t.In(loc)

	suffix := "th"
	switch timeInLocation.Day() {
	case 1, 21, 31:
		suffix = "st"
	case 2, 22:
		suffix = "nd"
	case 3, 23:
		suffix = "rd"
	}

	return timeInLocation.Format("January 2" + suffix + " 2006, 15:04:05")
}

func GetDateShort(timezone string, timestamp int64) string {
	t := time.Unix(timestamp, 0)
	loc, _ := time.LoadLocation(timezone)
	timeInLocation := t.In(loc)

	suffix := "th"
	switch timeInLocation.Day() {
	case 1, 21, 31:
		suffix = "st"
	case 2, 22:
		suffix = "nd"
	case 3, 23:
		suffix = "rd"
	}

	return timeInLocation.Format("January 2" + suffix + ",Monday")
}

func GetTimestamp(timezone string, date string) int64 {
	layout := "02-01-2006"
	loc, _ := time.LoadLocation(timezone)
	t, err := time.ParseInLocation(layout, date, loc)
	if err != nil {
		fmt.Println(err)
		return -1
	}
	return t.Unix()
}

func Uniq(slice []string) []string {
	// create a map with all the values as key
	uniqMap := make(map[string]struct{})
	for _, v := range slice {
		uniqMap[v] = struct{}{}
	}

	// turn the map keys into a slice
	uniqSlice := make([]string, 0, len(uniqMap))
	for v := range uniqMap {
		uniqSlice = append(uniqSlice, v)
	}
	return uniqSlice
}

func Base64Encode(value string) string {
	data := []byte(value)
	str := base64.StdEncoding.EncodeToString(data)
	return str
}

func Base64Decode(value string) (string, error) {
	data, _ := base64.StdEncoding.DecodeString(value)
	return string(data), nil
}

func EncodeURL(value string) string {
	return base64.RawURLEncoding.EncodeToString([]byte(value))
}

func DecodeURL(value string) (string, error) {
	data, _ := base64.RawURLEncoding.DecodeString(value)
	return string(data), nil
}

func RemoveTrailingSlash(value string) string {
	if value[len(value)-1:] == "/" {
		return value[:len(value)-1]
	}
	return value
}
