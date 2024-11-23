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
                console.log(data.result)
                this.setState({
                    text: data.result
                })
        })
        .catch(() => {
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