import React from "react";


class StatusCreate extends React.Component {
    constructor() {
        super ();
        this.state = {
            letters: 0,
            data: {}
        };

        this.sendStatus = this.sendStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.setState({
            letters: e.target.value.length
        });
    };

    sendStatus (profile, data, contnet) {
        console.log("STATUS WYSYŁAM");

    }

    render () {
        return (
            <div id="status_create">
                <p>What you want to share?</p>
                <textarea rows="2" cols="70"
                          placeholder="Write something..."
                          onChange={this.handleChange}
                          name="message"
                          maxLength={this.props.maxLetters}
                >
                </textarea>
                <small>{this.props.maxLetters - this.state.letters} characters</small>
                <button id="send" onClick={this.sendStatus}>Send</button>
            </div>
        )
    }
}

export default StatusCreate;