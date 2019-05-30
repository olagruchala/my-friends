import React from "react";
import CommentPanel from "./CommentPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {UserDataService} from "./DataService";
import Moment from "react-moment";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons/faEllipsisH";

class StatusAdded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            textareaValue: this.props.txtValue,
            user: JSON.parse(localStorage.getItem("user")) || {
                name: "unknown",
                email: "unknown"
            },
            statusArr: JSON.parse(localStorage.getItem("statuses"))
        };

        this.editStatus = this.editStatus.bind(this);
        this.applyStatus = this.applyStatus.bind(this);
        this.renderTxtArea = this.renderTxtArea.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.textareaHandle = this.textareaHandle.bind(this);

        UserDataService.addObserver(this.onUserNameDefined)

    }

    textareaHandle(e) {
        this.setState({
            textareaValue: e.target.value
        });
    };

    // Set newData about loggedIn user in StatusAdded from DataService
    onUserNameDefined = (user) => {
        this.setState({
            user: user
        });
    };

    // editing statuses
    editStatus () {
        this.setState({
            editing: true
        })
    };

    applyStatus (e) {
        let statusArr = this.state.statusArr;
        let statusIndex = statusArr.map(status => (status.id)).indexOf(this.props.id);
        let newText = this.state.textareaValue;

        if (e.keyCode === 13 && e.shiftKey === false) {
            let newStatusObj = Object.assign(statusArr[statusIndex], {txtValue: newText});
            statusArr[statusIndex] = newStatusObj;

            this.setState({
                    editing: false,
                    statusArr: statusArr
            }, () => {
                    localStorage.setItem("statuses", JSON.stringify(this.state.statusArr));
            })
        }
    }

    renderTxtArea () {
        return (
            <div>
                <textarea
                    className="comment_create"
                    onKeyDown={this.applyStatus}
                    value={this.state.textareaValue}
                    onChange={this.textareaHandle}
                />
            </div>
        )
    }

    renderNormal () {
        return (
            <div>
                <div className="status_content">{this.state.textareaValue}</div>
            </div>
        )
    }

    render() {

        const {date, name, email, id, color} = this.props;

        // change user icon when unknown
        let login;

        if (name !== "unknown") {
            login = faUser
        } else {
            login = faUserSecret
        }

        // display editing dots on statuses from user loggedIn
        let dots;
        if (email === this.state.user.email && this.state.user.email !== "unknown") {
            dots = (
                <FontAwesomeIcon className="dots" icon={faEllipsisH} onClick={this.editStatus}/>
                )
        }

        // render status or textarea field to editing this status
        let edit;
        if (this.state.editing) {
            edit = this.renderTxtArea()
        } else {
            edit = this.renderNormal()
        }


        return (
            <div className="status_added">
                <div className="author">
                    <FontAwesomeIcon className="faUserIcon" style = {{color : color}} icon={login} />
                    <p className="author_name">{name}</p>
                    <small className="status_data">
                        <Moment fromNow>{date}</Moment>
                    </small>
                    {dots}
                </div>
                {edit}
                <CommentPanel id={id} name={this.state.user.name} email={this.state.user.email}/>
            </div>
        )
    }
}

export default StatusAdded;