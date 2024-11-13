import React, { Component } from "react";
import "./style.css"
import { Link, Outlet } from "react-router-dom";

export class Root extends Component {
    render() {
        return (
            <>
                <div className="links">
                    <Link className="link" to="/">Главная страница</Link>
                    <Link className="link" to="/hello">hello</Link>
                    <Link className="link" to="/count">count</Link>
                    <Link className="link" to="/query">query</Link>
                </div>
                <Outlet/>
            </>
        )
    }
}