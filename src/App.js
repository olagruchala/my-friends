import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import StatusCreate from "./StatusCreate";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: sessionStorage.getItem("username") || ""
        };
    }

    // componentDidMount() {
    //
    //     let userName = "";
    //     const callbackForUserName = () => {
    //         alert("Hello " + this.state.userName + "!");
    //         sessionStorage.setItem("username", userName)
    //     };
    //
    //     setTimeout (() => {
    //         if (this.state.userName === "") {
    //             userName = prompt('What\'s your name?');
    //
    //             if (userName !== "" && userName !== null) {
    //                 this.setState({
    //                     userName: userName
    //                 }, callbackForUserName);
    //             } else {
    //                 console.log(userName);
    //                 this.setState({
    //                     userName: "unknown"
    //                 }, () => alert("Hello " + this.state.userName + "!"))
    //             }
    //         }
    //     }, 0)
    // }

    render() {

        return (
            <div>
                <div>
                    <Header name={this.state.userName}/>
                    <div className="container">
                        <StatusCreate maxLetters={200} name={this.state.userName}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
