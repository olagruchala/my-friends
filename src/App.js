import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import StatusAdded from "./StatusAdded";
import StatusCreate from "./StatusCreate";

class App extends Component {
  render() {
    return (
        <div>
          <Header />
          <div className="container">
            <StatusCreate maxLetters = {200} />
            <br></br>
            <div id="status-container">
              <StatusAdded />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
