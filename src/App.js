import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import StatusCreate from "./StatusCreate";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        };
    }

    componentDidMount() {

        let userName = "";

        setTimeout ( () => {
            if (this.state.userName === "") {
                userName = prompt('Podaj swoje imię:');

                if (userName != null) {
                    this.setState({
                        userName: userName
                    }, () => alert("Hello " + this.state.userName + "!"));
                } else {
                    this.setState({
                        userName: "unknown"
                    }, () => alert("Hello unknown!"))
                }
            }
        }, 0)
    }

    render() {

        return (
            <div>
                <Header name={this.state.userName}/>
                <div className="container">
                    <StatusCreate maxLetters={200} name={this.state.userName}/>
                </div>
            </div>
        );
    }
}

export default App;
