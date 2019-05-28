import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons/faEllipsisH";

class CommentAdded extends React.Component {

    render() {

        const {name, textValue} = this.props;

        return (
            <div className="comment_added">
                <p className="">{name}: <span> {textValue} </span><FontAwesomeIcon className="dots" icon={faEllipsisH}/></p>
            </div>
        )
    }
}

export default CommentAdded;