import logo from "./logo.png";
import React from "react";
import './App.css';
import ModalUserName from "./ModalUserName";


class Header extends React.Component {
    render () {

        return (
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" height="120px"></img>
                    <h1>friends</h1>
                </div>
                <div className="hello_user">
                    {(this.props.name !== "")
                        ? <span>Hello {this.props.name}!</span>
                        : <ModalUserName />
                    }
                </div>
            </header>
        )
    }
}

export default Header;
