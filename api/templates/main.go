package templates

import (
	"os"
)

func HasTemplateOnFileSystem(path string, template string) bool {
	if _, err := os.Stat(path + "/" + template); err == nil {
		return true
	} else {
		return false
	}
}

func Readfile(path string, template string) string {
	content, err := os.ReadFile(path + "/" + template)
	if err != nil {
		return err.Error()
	}
	return string(content)
}

func GetTemplate(name string) string {
	path := "/mail/templates"
	if HasTemplateOnFileSystem(path, name+".html") {
		return Readfile(path, name+".html")
	} else {
		if name == "welcome" {
			return TEMPLATE_WELCOME
		} else if name == "forgot" {
			return TEMPLATE_FORGOT
		} else if name == "activate" {
			return TEMPLATE_ACTIVATE
		}
	}
	return ""
}

func GetTextTemplate(name string) string {
	path := "/mail/templates"
	if HasTemplateOnFileSystem(path, name+".txt") {
		return Readfile(path, name+".txt")
	} else {
		if name == "welcome" {
			return TEMPLATE_WELCOME_TEXT
		} else if name == "forgot" {
			return TEMPLATE_FORGOT_TEXT
		} else if name == "activate" {
			return TEMPLATE_ACTIVATE_TEXT
		}
	}
	return ""
}
