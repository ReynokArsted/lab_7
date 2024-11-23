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
        var uri = `http://localhost:8081/count`
        fetch(uri, {method: "GET", headers: {"Content-Type":"application/json"}})
        .then((response) => response.json())
        .then(data => {
            this.setState({
                ServerAnswer: data.massage
            })
        })
        .catch(() => {
            console.log("Возникла ошибка при получении данных или сервер неактивен")
        })
    }

    addNumber = () => {
        var uri = `http://localhost:8081/count?count=${this.state.Field}`
        fetch(uri, {method: "POST", headers: {"Content-Type":"application/json"}})
        .then((response) => response.json())
        .then(data => {
            this.setState({
                ServerAnswer: data.massage
            })
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
                        <a className="counter_value"></a>
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
                    {this.state.ServerAnswer != "" && <p>{this.state.ServerAnswer}</p>}
                </div>
            </>
        )
    }
}