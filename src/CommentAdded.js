import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import {UserDataService} from "./DataService";

class CommentAdded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            commentValue: this.props.textValue,
            user: {
                name: this.props.name,
                email: this.props.email
            }
        };

        this.renderNormal = this.renderNormal.bind(this);
        this.renderTxtArea = this.renderTxtArea.bind(this);
        this.editComment = this.editComment.bind(this);
        this.applyComment = this.applyComment.bind(this);
        this.textareaHandle = this.textareaHandle.bind(this);

        UserDataService.addObserver(this.onUserNameDefined);
    }


    // Set newData about loggedIn user in CommentAdded from DataService
    onUserNameDefined = (user) => {
        // console.log("this.state.user onUserNameDefined in CommentAdded :");
        // console.log(this.state.user);
        this.setState({
            user: user
        }, () => {
            // console.log(this.state.user) // todo: dlaczego nie uruchamia się ten callback kiedy zmieniam usera?
        });
    };

    textareaHandle(e) {
        this.setState({
            commentValue: e.target.value
        });
    };

    // editing comment -> show textarea
    editComment() {
        this.setState({
            editing: true
        })
    };

    applyComment = (e) => {
        let newText = this.state.commentValue;
        if (e.keyCode === 13 && e.shiftKey === false) {
            this.setState({
                editing: false,
            }, () => {
                this.props.commentDataObserver.setNewData({
                    id: this.props.id,
                    updatedValue: newText
                });
            }) // set new commentsArr for CommentPanel-id
        }
    };

    renderNormal() {
        return (
            <span> {this.state.commentValue} </span>
        )
    }

    renderTxtArea() {
        return (
            <span>
                <textarea
                    rows="1"
                    className="comment_edit"
                    onKeyDown={this.applyComment}
                    value={this.state.commentValue}
                    onChange={this.textareaHandle}
                />
            </span>
        )
    }


    render() {

        const {name, email} = this.props;

        // display editing dots on comments from user loggedIn
        let dots;
        if (this.state.user.email !== "unknown" && this.state.user.email === email) {
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
                <p className="">{name}: {edit} {dots} </p>
            </div>
        )
    }
}

export default CommentAdded;