import React from "react";


class StatusCreate extends React.Component {
    constructor() {
        super ();
        this.state = {
            letters: 0,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.setState({
            letters: e.target.value.length
        });
    };

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
                <button id="send">Send</button>
            </div>
        )
    }
}

export default StatusCreate;