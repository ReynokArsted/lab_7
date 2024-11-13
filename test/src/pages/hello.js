import { Component } from "react"

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
        })
        .catch(() => {
            console.log("Возникла ошибка при получении данных")
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