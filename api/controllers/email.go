package controllers

import (
	"log"
	"os"

	"github.com/uug-ai/facial-access-control/api/models"
	"github.com/uug-ai/facial-access-control/api/notifications"
)

type Email struct {
	Type    string
	Mailgun notifications.Mail
	SMTP    notifications.SMTP
}

func (email Email) Send(m notifications.Message) {
	if email.Type == "mailgun" {
		err := email.Mailgun.Send(m) // TODO add error handler
		if err != nil {
			log.Println(err)
		}
	} else if email.Type == "smtp" {
		err := email.SMTP.Send(m) // TODO add error handler
		if err != nil {
			log.Println(err)
		}
	}
}

func Mail(mailto string, template string) *Email {
	emailProvider := os.Getenv("MAIL_PROVIDER")
	if emailProvider == "" {
		emailProvider = "mailgun"
	}
	var email Email
	if emailProvider == "mailgun" {
		mailgun := notifications.Mail{
			Domain:     os.Getenv("MAILGUN_DOMAIN"),
			ApiKey:     os.Getenv("MAILGUN_API_KEY"),
			EmailFrom:  os.Getenv("EMAIL_FROM"),
			EmailTo:    mailto,
			TemplateId: template,
		}
		email.Type = "mailgun"
		email.Mailgun = mailgun
	} else if emailProvider == "smtp" {
		smtp := notifications.SMTP{
			Server:     os.Getenv("SMTP_SERVER"),
			Port:       os.Getenv("SMTP_PORT"),
			Username:   os.Getenv("SMTP_USERNAME"),
			Password:   os.Getenv("SMTP_PASSWORD"),
			EmailFrom:  os.Getenv("EMAIL_FROM"),
			EmailTo:    mailto,
			TemplateId: template,
		}
		email.Type = "smtp"
		email.SMTP = smtp
	}
	return &email
}

func SendWelcomeEmail(user models.User, m notifications.Message) {
	m.Title = os.Getenv("WELCOME_TITLE")
	email := Mail(user.Email, os.Getenv("WELCOME_TEMPLATE"))
	email.Send(m)
}

func SendShareEmail(user models.User, m notifications.Message) {
	m.Title = os.Getenv("SHARE_TITLE")
	email := Mail(user.Email, os.Getenv("SHARE_TEMPLATE"))
	email.Send(m) // TODO add error handler
}

func SendActivationEmail(user models.User, m notifications.Message) {
	m.Title = os.Getenv("ACTIVATE_TITLE")
	email := Mail(user.Email, os.Getenv("ACTIVATE_TEMPLATE"))
	email.Send(m) // TODO add error handler
}

func SendForgotEmail(user models.User, m notifications.Message) {
	m.Title = os.Getenv("FORGOT_TITLE")
	email := Mail(user.Email, os.Getenv("FORGOT_TEMPLATE"))
	email.Send(m) // TODO add error handler
}
