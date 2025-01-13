import { Component } from "react";

export class Query extends Component {
    state = {
        Field: "",
        ServerAnswer: ""
    }
    updateField = (e) => {
        const {value} = e.target
        this.setState({
            Field: value
        })
        console.log(this.state.Field)
    }

    buttonClicked = () => {
        if (this.state.Field == "") {
            this.setState({
                ServerAnswer: "Поле оказалось пустым. Пожалуйста, повторите ввод!"
            })
            return
        }

        if (this.state.Field[0] == " " || this.state.Field[this.state.Field.length-1] == " "){
            this.setState({
                ServerAnswer: "В начале или в конце имени есть пробелы. Пожалуйста, напишите без них!"
            })
            return
        }

        fetch(`http://localhost:8083/api/user?name=${this.state.Field}`)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                ServerAnswer: data.massage
            })
            console.log(this.state.ServerAnswer)
        })
        .catch(() => {
            this.setState({
                ServerAnswer: "Возникла ошибка при получении данных или сервер неактивен"
            })
            console.log("Возникла ошибка при получении данных или сервер неактивен")
        })
    }

    render() {
        return(
            <>
                <p>Тут можно ввести имя, чтобы сервер мог передать тебе привет</p>
                <input type="text" name="Field" onChange={(e) => this.updateField(e)}></input>
                <button onClick={this.buttonClicked}>Отправить</button>
                {this.state.ServerAnswer != "" && <p>{this.state.ServerAnswer}</p>}
            </>
        )
    }
}