import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import StatusCreate from "./StatusCreate";
import UserDataService from "./DataService";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "unknown"
        };

        UserDataService.addObserver(this.onUserNameDefined)

    }

    onUserNameDefined = (username) => {
        this.setState({
            userName: username
        });
    };

    render() {

        return (
            <div>
                <div>
                    <Header dataService={UserDataService} name={this.state.userName}/>
                    <div className="container">
                        <StatusCreate maxLetters={200} name={this.state.userName}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
