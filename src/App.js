import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import StatusCreate from "./StatusCreate";

class App extends Component {


  render() {
    return (
        <div>
          <Header />
          <div className="container">
            <StatusCreate maxLetters = {200} />
          </div>
        </div>
    );
  }
}

export default App;
