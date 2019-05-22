import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import StatusCreate from "./StatusCreate";
import UserDataService from "./DataService";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "unknown",
                email: "unknown"
            }
        };

        UserDataService.addObserver(this.onUserNameDefined)

    }

    onUserNameDefined = (user) => {
        console.log(`newData in App.js from DataService`);
        this.setState({
            user: user
        });
    };

    render() {

        return (
            <div>
                <div>
                    <Header dataService={UserDataService} name={this.state.user.name}/>
                    <div className="container">
                        <StatusCreate maxLetters={200} name={this.state.user.name} email={this.state.user.email}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
