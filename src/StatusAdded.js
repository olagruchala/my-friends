import React from "react";
import CommentPanel from "./CommentPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import UserDataService from "./DataService";

class StatusAdded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {
                name: "unknown",
                email: "unknown"
            }
        };

        UserDataService.addObserver(this.onUserNameDefined)

    }

    // Set newData about loggedIn user in StatusAdded from DataService
    onUserNameDefined = (user) => {
        this.setState({
            user: user
        });
    };

    render() {

        const {txtValue, date, time, name, id} = this.props;
        let login;

        if (name !== "unknown") {
            login = faUser
        } else {
            login = faUserSecret
        }

        return (
            <div className="status_added">
                <div className="author">
                    <FontAwesomeIcon className="faUserIcon" icon={login} >
                    </FontAwesomeIcon>
                    <p className="author_name">{name}</p>
                    <small className="status_data">{date}, {time}</small>
                </div>
                <div className="status_content">{txtValue}</div>
                <CommentPanel id={id} name={this.state.user.name} email={this.state.user.email}/>
            </div>
        )
    }
}

export default StatusAdded;