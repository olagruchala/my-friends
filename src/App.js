import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import StatusCreate from "./StatusCreate";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div>
                    <Header />
                    <div className="container">
                        <StatusCreate maxLetters={200} name={this.props.userName}/> // TODO: this.props.userName nie działa
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
