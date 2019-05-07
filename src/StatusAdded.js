import React from "react";
import CommentPanel from "./CommentPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";


const STORAGE_NAME_PREFIX = "status-";

//"status-1"

// todo
class StatusAdded extends React.Component {

    render() {

        const {txtValue, date, name, id} = this.props;
        let login;
        if (name !== "unknown") {
            login = faUser
        } else {
            login = faUserSecret
        }

        return (
            <div className="status_added">

                <div className="author">
                    <FontAwesomeIcon className="faUserIcon" icon={login} ></FontAwesomeIcon>
                    <p className="author_name">{name}</p>
                    <small className="status_data">{date}</small>
                </div>
                {/*todo: textValue nie zawija się i nie mieści w divie jeśli jest bez spacji*/}
                <div className="status_content">{txtValue}</div>

                {/*todo: przekazać this.state z CommentPanel jako propsy*/}
                <CommentPanel key={id}/>
            </div>
        )
    }
}

export default StatusAdded;