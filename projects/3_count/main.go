package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Output struct {
	Massage string `json:"massage"`
}

var counter int = 0

func handler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		data := Output{"Значение счётчика: " + strconv.Itoa(counter)}
		formed, _ := json.Marshal(data)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		w.Write(formed)
	}
	if r.Method == "POST" {
		r.ParseForm()
		adder := r.Form.Get("count")
		if val, err := strconv.Atoi(adder); err != nil {
			data := Output{"Было введено не число или поле пусто.\nПопробуйте повторить ввод снова"}
			formed, _ := json.Marshal(data)

			w.WriteHeader(400)
			w.Write(formed)
		} else {
			counter += val
			var data Output
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(200)
			if val > 0 {
				data = Output{"Значение счётчика изменено на: +" + strconv.Itoa(val)}
				formed, _ := json.Marshal(data)

				w.Write(formed)
			} else if val == 0 {
				data = Output{"Значение счётчика не изменилось, так как параметр 'count' равен 0"}
				formed, _ := json.Marshal(data)

				w.Write(formed)
			} else {
				data = Output{"Значение счётчика изменено на: " + strconv.Itoa(val)}
				formed, _ := json.Marshal(data)

				w.Write(formed)
			}
		}
	}
}

func main() {
	http.HandleFunc("/count", handler)

	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Print("error: server does not start")
	}
}
