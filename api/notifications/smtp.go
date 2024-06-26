package notifications

import (
	"crypto/tls"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/uug-ai/facial-access-control/api/templates"
	"gopkg.in/gomail.v2"
)

type SMTP struct {
	Server     string `json:"server,omitempty"`
	Port       string `json:"port,omitempty"`
	Username   string `json:"username,omitempty"`
	Password   string `json:"password,omitempty"`
	EmailFrom  string `json:"email_from,omitempty"`
	EmailTo    string `json:"email_to,omitempty"`
	TemplateId string `json:"template_id,omitempty"`
}

func (smtp SMTP) Send(message Message) error {
	port, _ := strconv.Atoi(smtp.Port)
	d := gomail.NewDialer(smtp.Server, port, smtp.Username, smtp.Password)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	m := gomail.NewMessage()
	m.SetHeader("From", smtp.EmailFrom)
	m.SetHeader("To", smtp.EmailTo)
	m.SetHeader("Subject", message.Title)
	timeNow := time.Now().Unix()
	m.SetHeader("Message-Id", "<"+strconv.FormatInt(timeNow, 10)+"@uug.ai>")

	textBody := templates.GetTextTemplate(smtp.TemplateId)
	m.SetBody("text/plain", ReplaceValues(textBody, message))

	body := templates.GetTemplate(smtp.TemplateId)
	m.AddAlternative("text/html", ReplaceValues(body, message))

	err := d.DialAndSend(m)
	fmt.Println(err)
	return err
}

// This function will replace the variables in the email template. We have following variables available:
// - {{user}}: user that triggered the message
// - {{text}}: text of the message
// - {{link}}: link to the media (recording)
//
// - {{thumbnail}}: image (either a base64 or a url).
// - {{classifications}}: list of classifications detected in the recording.
//
// - {{timezone}}: timezone of the account generating the event
//
// - {{date}}: date of the media
// - {{time}}: time of the media
// - {{datetime}}: datetime of the media
//
// - {{eventdate}}: date of the notification
// - {{eventtime}}: time of the notification
// - {{eventdatetime}}: datetime of the notification
//
// - {{devicename}}: device generating the event
// - {{deviceid}}: device generating the event
// - {{sites}}: the list of sites the device is part of
// - {{groups}}: the list of groups the device is part of
// - {{numberOfMedia}}: number of media attached to the message
// - {{dataUsage}}: data usage of the message

func ReplaceValues(body string, message Message) string {

	body = strings.ReplaceAll(body, "{{tab1_title}}", "")
	body = strings.ReplaceAll(body, "{{tab2_title}}", "")

	// Add the variables to be used by the template
	//body = strings.ReplaceAll(body, "{{user}}", "")
	if message.User != "" {
		body = strings.ReplaceAll(body, "{{user}}", message.User)
	} else {
		body = strings.ReplaceAll(body, "{{user}}", message.Data["user"])
	}

	body = strings.ReplaceAll(body, "{{text}}", message.Body)

	if message.Data["link"] != "" {
		body = strings.ReplaceAll(body, "{{link}}", message.Data["link"])
	}

	// {{eventtime}} of the notification
	if message.Timestamp > 0 {
		t := time.Unix(message.Timestamp, 0)
		// Get time with timezone
		if message.Timezone != "" {
			loc, _ := time.LoadLocation(message.Timezone)
			t = t.In(loc)
		}
		body = strings.ReplaceAll(body, "{{eventdate}}", t.Format("2006-01-02"))
		body = strings.ReplaceAll(body, "{{eventtime}}", t.Format("15:04:05"))
		body = strings.ReplaceAll(body, "{{eventdatetime}}", t.Format("2006-01-02 15:04:05"))
	}

	// {{timezone}} of the account generating the event
	if message.Timezone != "" {
		body = strings.ReplaceAll(body, "{{timezone}}", message.Timezone)
	}

	// Whipe out all variables with the {{variable}} syntax (regex: {{.*}})
	body = strings.ReplaceAll(body, "{{.*}}", "")

	// Iterate over data object and modify
	for key, element := range message.Data {
		body = strings.ReplaceAll(body, "{{"+key+"}}", element)
	}

	return body
}
