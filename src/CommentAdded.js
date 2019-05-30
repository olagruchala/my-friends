import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons/faEllipsisH";

class CommentAdded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            textareaValue: this.props.textValue,
            commentsArr: this.props.commentsArr
        };

        this.renderNormal = this.renderNormal.bind(this);
        this.renderTxtArea = this.renderTxtArea.bind(this);
        this.editComment = this.editComment.bind(this);
        this.applyComment = this.applyComment.bind(this);
        this.textareaHandle = this.textareaHandle.bind(this);

    }

    textareaHandle(e) {
        this.setState({
            textareaValue: e.target.value
        });
    };

    // editing statuses
    editComment () {
        this.setState({
            editing: true
        })
    };

    applyComment (e) {
        let commentsArr = this.state.commentsArr;
        let commentIndex = commentsArr.map(comment => (comment.id)).indexOf(this.props.id);
        let newText = this.state.textareaValue;

        if (e.keyCode === 13 && e.shiftKey === false) {
            let newCommentsObj = Object.assign(commentsArr[commentIndex], {textValue: newText}); // edit textValue in comment object
            commentsArr[commentIndex] = newCommentsObj;

            this.setState({
                editing: false,
                commentsArr: commentsArr
            }, () => this.props.commentObserver.setNewData(this.state.commentsArr)) // set new commentsArr for CommentPanel
        }
    }

    renderNormal () {
        return (
            <span> {this.state.textareaValue} </span>
        )
    }

    renderTxtArea () {
        return (
            <span>
                <textarea
                    rows="1"
                    className="comment_edit"
                    onKeyDown={this.applyComment}
                    value={this.state.textareaValue}
                    onChange={this.textareaHandle}
                />
            </span>
        )
    }


    render() {

        const {name, email, loggedInEmail} = this.props;

        // display editing dots on comments from user loggedIn
        let dots;
        if (loggedInEmail === email && loggedInEmail !== "unknown") {
            dots = (
                <FontAwesomeIcon className="dots" icon={faEllipsisH} onClick={this.editComment}/>
            )
        }

        // render status or textarea field to editing this comment
        let edit;
        if (this.state.editing) {
            edit = this.renderTxtArea()
        } else {
            edit = this.renderNormal()
        }

        return (
            <div className="comment_added">
                <p className="">{name}: {edit}  {dots} </p>
            </div>
        )
    }
}

export default CommentAdded;