import { Component } from "react"
import PropTyes from 'prop-types'

export class Hello extends Component {
    state = {
        text: ""
    }


    componentDidMount() {
        fetch("http://localhost:8082/get")
        .then(reponse => reponse.json())
        .then((data) => {
                this.setState({
                    text: data.result
                })
                console.log(this.text)
        })
        .catch(() => {
            this.setState({
                text: "Возникла ошибка при получении данных или сервер неактивен"
            })
            console.log("Возникла ошибка при получении данных или сервер неактивен")
        })
    }

    render() {
        const { text } = this.state

        return(
            <>
                <p className="text">{text}</p>
            </>
        )
    }
}