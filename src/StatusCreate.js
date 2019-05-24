import React from "react";
import StatusAdded from "./StatusAdded";

const STORAGE_NAME = "statuses";

class StatusCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusArr: JSON.parse(localStorage.getItem(STORAGE_NAME)) || [{
                id: 0,
                txtValue: "Hi, maybe some movie today's evening?",
                date: new Date().toLocaleTimeString(),
                time: new Date().toLocaleTimeString(),
                name: "Ola",
                email: "",
                color: this.chooseColor()
            }],
            letters: 0,
            textareaValue: ""
        };

        this.sendStatus = this.sendStatus.bind(this);
        this.textareaHandle = this.textareaHandle.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
    }

    textareaHandle(e) {
        this.setState({
            letters: e.target.value.length,
            textareaValue: e.target.value
        });
    };

    chooseColor = () => {
        let colorArr = ["#E84291", "#F7AC13", "#2192A6"];
        return colorArr[Math.floor(Math.random() * colorArr.length)];
    };

    sendStatus = () => {
        const localeDate = new Date().toLocaleDateString();
        const localeTime = new Date().toLocaleTimeString();

        let storageCallback = () => {
            localStorage.setItem(STORAGE_NAME, JSON.stringify(this.state.statusArr))
        };

        let statusData = {
            id: this.state.statusArr.length + 1,
            txtValue: this.state.textareaValue,
            date: localeDate,
            time: localeTime,
            name: this.props.name,
            email: this.props.email,
            color: this.chooseColor()
        };

        if (statusData.txtValue.trim().length > 0) {
            this.setState(prevState => ({
                statusArr: [statusData, ...prevState.statusArr],
                letters: 0,
                textareaValue: ""
            }), storageCallback);
        } else {
            this.setState({
                textareaValue: ""
            })
        }

    };

    render() {

        const {maxLetters} = this.props;

        return (
            <div>
                <div id="status_create">
                    <p>What do you want to share?</p>
                    <textarea rows="2" cols="70"
                              placeholder="Write something..."
                              onChange={this.textareaHandle}
                              name="message"
                              maxLength={maxLetters}
                              value={this.state.textareaValue}
                    >
                </textarea>
                    <small>{this.props.maxLetters - this.state.letters} characters</small>
                    <button id="send" onClick={this.sendStatus}>Send</button>
                </div>
                <br/>
                <div id="status_container">
                    {
                        this.state.statusArr.map(statusData => {
                            return <StatusAdded key={statusData.id}
                                                id={statusData.id}
                                                txtValue={statusData.txtValue}
                                                date={statusData.date}
                                                time={statusData.time}
                                                name={statusData.name}
                                                email={statusData.email}
                                                color={statusData.color}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default StatusCreate;