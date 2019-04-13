import logo from "./logo.png";
import React from "react";
import './App.css';


class Header extends React.Component {
    render () {
        return (
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" height="120px"></img>
                    <h1>friends</h1>
                </div>
                <div className="hello_user">
                    <span>Hello {this.props.name}!</span>
                </div>
            </header>
        )
    }
}

export default Header;
