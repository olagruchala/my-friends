import React from 'react';
import './App.css';
import Header from "./Header";
import StatusCreate from "./StatusCreate";
import {UserDataService} from "./DataService";

class App extends React.Component {
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

    // Set newData in this.state.user App.js from DataService
    onUserNameDefined = (user) => {
        this.setState({
            user: user
        });
    };

    render() {

        return (
            <div>
                <div>
                    <Header dataService={UserDataService} name={this.state.user.name}/>
                    <div className="body-container">
                        <StatusCreate maxLetters={300} name={this.state.user.name} email={this.state.user.email}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
