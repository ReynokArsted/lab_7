package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Output struct {
	Name string `json:"massage"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	str := r.URL.Query().Get("name")
	var data Output
	if str != "" {
		data = Output{"Привет, " + str + "!"}
		formed, _ := json.Marshal(data)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		w.Write(formed)
	} else {
		data = Output{"Попробуй ввести своё имя через query-параметр 'name'"}
		formed, _ := json.Marshal(data)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(400)
		w.Write(formed)
	}
}

func main() {
	http.HandleFunc("/api/user", handler)

	err := http.ListenAndServe(":8083", nil)
	if err != nil {
		fmt.Print("error: server does not start")
	}
}
