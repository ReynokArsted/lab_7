import { Component } from "react";

export class Count extends Component {
    state = {
        Field: null,
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