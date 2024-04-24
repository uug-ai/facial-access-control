package main

import (
	"flag"
	"os"
	"time"

	"github.com/uug-ai/facial-access-control/api/log"
	"github.com/uug-ai/facial-access-control/api/routers"
	"github.com/uug-ai/facial-access-control/api/utils"
)

var VERSION = "1.0.0"

func main() {

	// Start the show ;)
	// We'll parse the flags (named variables), and start the agent.

	var action string
	var port string
	flag.StringVar(&action, "action", "version", "Tell us what you want do 'run' or 'version'")
	flag.StringVar(&port, "port", "80", "On which port should the agent run")
	flag.Parse()

	// Specify the level of loggin: "info", "warning", "debug", "error" or "fatal."
	logLevel := os.Getenv("LOG_LEVEL")
	if logLevel == "" {
		logLevel = "info"
	}
	// Specify the output formatter of the log: "text" or "json".
	logOutput := os.Getenv("LOG_OUTPUT")
	if logOutput == "" {
		logOutput = "text"
	}
	// Specify the timezone of the log: "UTC" or "Local".
	timezone, _ := time.LoadLocation("CET")
	log.Log.Init(logLevel, logOutput, timezone)

	switch action {

	case "version":
		log.Log.Info("main.Main(): You are currrently running version: " + VERSION)

	case "run":
		{
			// Print uuft.ai ASCII art
			utils.PrintASCIIArt()
			// Start the REST API.
			routers.StartWebserver(port)
		}
	default:
		log.Log.Error("main.Main(): Sorry I don't understand :(")
	}
}
