import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons/faEllipsisH";

class CommentAdded extends React.Component {

    render() {

        const {name, email, textValue, loggedInEmail} = this.props;
        let dots;

        if (loggedInEmail === email && loggedInEmail !== "unknown") {
            dots = (
                <FontAwesomeIcon className="dots" icon={faEllipsisH}/>
            )
        }

        return (
            <div className="comment_added">
                <p className="">{name}: <span> {textValue} </span> {dots} </p>
            </div>
        )
    }
}

export default CommentAdded;