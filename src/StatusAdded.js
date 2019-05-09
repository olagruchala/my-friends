import React from "react";
import CommentPanel from "./CommentPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";


// const STORAGE_NAME_PREFIX = `status-`;

//"status-1"

class StatusAdded extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = JSON.parse(localStorage.getItem(STORAGE_NAME_PREFIX + this.props.id)) || "";
    //
    //
    //     this.getStorageName = this.getStorageName.bind(this);
    // }
    //
    // getStorageName = () => {
    //     return STORAGE_NAME_PREFIX + this.props.id;
    // };

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
                {/*todo: textValue nie zawija się i nie mieści w divie jeśli jest bez spacji*/}
                <div className="status_content">{txtValue}</div>

                <CommentPanel id={id} name={name}/>
            </div>
        )
    }
}

export default StatusAdded;