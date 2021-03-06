import logo from "./logo.png";
import React from "react";
import './App.css';
import ModalUserName from "./ModalUserName";

class Header extends React.Component {

    render() {
        return (
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" height="120px">
                    </img>
                    <h1>Friends</h1>
                </div>
                <div className="hello_user">
                    <span>Hello {this.props.name}!</span>
                    <br/>
                    <ModalUserName />
                </div>
            </header>
        )
    }
}

export default Header;
