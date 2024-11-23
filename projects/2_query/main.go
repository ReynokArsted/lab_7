package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	str := r.URL.Query().Get("name")
	if str != "" {
		w.Write([]byte("Привет, " + str + "!"))
	} else {
		w.Write([]byte("Попробуй ввести своё имя через query-параметр 'name'"))
	}
}

func main() {
	http.HandleFunc("/api/user", handler)

	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		fmt.Print("error: server does not start")
	}
}
