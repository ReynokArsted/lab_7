package main

import (
	"fmt"
	"net/http"
	"strconv"
)

var counter int = 0

func handler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Write([]byte("Значение счётчика: " + strconv.Itoa(counter)))
	}
	if r.Method == "POST" {
		r.ParseForm()
		adder := r.Form.Get("count")
		if val, err := strconv.Atoi(adder); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("ошибка: было введено нечисло\nПопробуйте ввести число для параметра 'count' снова"))
		} else {
			counter += val
			if val > 0 {
				w.Write([]byte("Значение счётчика изменено на: +" + strconv.Itoa(val)))
			} else if val == 0 {
				w.Write([]byte("Значение счётчика не изменилось, так как параметр 'count' равен 0"))
			} else {
				w.Write([]byte("Значение счётчика изменено на: " + strconv.Itoa(val)))
			}
		}
	}
}

func main() {
	http.HandleFunc("/count", handler)

	err := http.ListenAndServe(":3333", nil)
	if err != nil {
		fmt.Print("error: server does not start")
	}
}
