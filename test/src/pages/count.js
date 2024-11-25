import { Component } from "react";

export class Count extends Component {
    state = {
        Field: "",
        ServerAnswer: ""
    }

    updateFiled = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
        console.log(this.state.Field)
    }

    getCounter = () => {
        fetch(`http://localhost:8081/count`, {method: "GET"})
        .then((response) => response.json())
        .then(data => {
            this.setState({
                ServerAnswer: data.massage
            })
            console.log(data.massage)
        })
        .catch(() => {
            this.setState({
                ServerAnswer: "Возникла ошибка при получении данных или сервер неактивен"
            })
            console.log("Возникла ошибка при получении данных или сервер неактивен")
        })
    }

    addNumber = () => {
        // Number() - функция, которая проверяет, является ли строка числом
        // * если она получает строку-число, то она возвращает само число, 
        // иначе - NaN (значение, которое не равно само себе)
        //
        // isNaN() - функция, которая проверяет, является ли полученное значение значением NaN
        // * она возвращает true или false
        if (isNaN(Number(this.state.Field)) === true) {
            this.setState({
                ServerAnswer: "Было введено не число или поле пусто. Попробуйте повторить ввод снова"
            })
            return
        }
        // trim() - функция, которая удаляет пробелы в начале и конце строки
        if (this.state.Field != this.state.Field.trim()) {
            this.setState({
                ServerAnswer: "В начале или в конце числа есть пробелы. Пожалуйста, напишите без них!"
            })
            return
        }

        fetch(`http://localhost:8081/count?count=${this.state.Field}`, {method: "POST"})
        .then((response) => response.json())
        .then(data => {
            this.setState({
                ServerAnswer: data.massage
            })
            console.log(this.state.ServerAnswer)
        })
        .catch(() => {
            console.log("Возникла ошибка при получении данных или сервер неактивен")
        })
    }

    render() {
        return(
            <>
                <div className="blocks">
                    <div>
                        <button onClick={this.getCounter}>Получить значение счётчика</button>
                    </div>
                    <div>
                        <button onClick={this.addNumber}>Увеличить значение счётчика на</button>
                        <input 
                            className="field" 
                            type="text" 
                            name="Field" 
                            onChange={(e) => {this.updateFiled(e)}}
                        ></input>
                    </div>
                    {this.state.ServerAnswer != "" && <p className="answer">{this.state.ServerAnswer}</p>}
                </div>
            </>
        )
    }
}