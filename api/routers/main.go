package routers

import (
	"github.com/uug-ai/facial-access-control/api/routers/http"
)

func StartWebserver(port string) {
	http.StartServer(port)
}
