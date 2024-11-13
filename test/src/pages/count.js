import { Component } from "react";

export class Count extends Component {
    render() {
        return(
            <>
                <div className="blocks">
                    <div>
                        <button>Получить значение счётчика</button>
                        <a className="counter_value"></a>
                    </div>
                    <div>
                        <button>Увеличить значение счётчика на</button>
                        <input className="field" type="text"></input>
                    </div>
                </div>
            </>
        )
    }
}