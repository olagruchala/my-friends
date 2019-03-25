import logo from "./logo.png";
import React from "react";
import './App.css';

//todo
class Header extends React.Component {
    render () {
        return (
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" height="120px"></img>
                    <h1>friends</h1>
                </div>
                {/* todo: create next div with login button (float left) */}
            </header>
        )
    }
}

export default Header;
