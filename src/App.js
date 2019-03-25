import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Status_added from "./Status_added";

class App extends Component {
  render() {
    return (
        <div>
          <Header />
          <div className="container">
            <div id="status_create">
              <p>What you want to share?</p>
              <textarea rows="2" cols="70" placeholder="Write something..."></textarea>
              <button id="send">Send</button>
            </div>
            <br></br>
            <div id="status-container">
              <Status_added />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
