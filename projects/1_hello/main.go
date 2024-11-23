package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Output struct {
	Result string `json:"result"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	data := Output{"Hello, web!"}
	formed, _ := json.Marshal(data)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	w.Write(formed)
}

func main() {
	http.HandleFunc("/get", handler)

	err := http.ListenAndServe(":8082", nil)
	if err != nil {
		fmt.Print("error: server does not start")
	}
}
