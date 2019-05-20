import React from "react";
import LikePanel from "./LikePanel"
import CommentAdded from "./CommentAdded"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

const STORAGE_NAME_PREFIX = `comment_panel-`;

//comment_panel-1


class CommentPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem(this.getStorageName())) || {
            // user: {
            //     name: this.props.name,
            //     email: this.props.email
            // },
            commentsArr: [],
            commentsCounter: 0, //FIXME wrong, use commentsArr.length
            displayComments: false,
            textareaValue: ""
        };

        this.displayCommentsHandler = this.displayCommentsHandler.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
        this.getStorageName = this.getStorageName.bind(this);
        this.textareaHandle = this.textareaHandle.bind(this);
        this.storageCallback = this.storageCallback.bind(this);
    }

    getStorageName() {
        return STORAGE_NAME_PREFIX + this.props.id;
    }

    storageCallback = () => localStorage.setItem(this.getStorageName(), JSON.stringify(this.state));


    displayCommentsHandler () {

        if (this.state.displayComments) {
            this.setState(prevState => ({
                displayComments: !prevState.displayComments

            }), this.storageCallback)
        } else {
            this.setState(prevState => ({
                displayComments: !prevState.displayComments
            }), this.storageCallback)
        }
    }

    textareaHandle (e) {
        this.setState({
            textareaValue: e.target.value
        });
    };

    addNewComment = (e) => {

        let userData = {
            id: this.state.commentsArr.length + 1,
            name: this.props.name,
            email: this.props.email,
            textValue: this.state.textareaValue
        };

        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault(); // pozbywam się entera w textarea po wysłaniu komentarza
            this.setState(prevState => ({
                commentsArr: [userData, ...prevState.commentsArr], // dorzucamy nowy komentarz na początek tablicy
                textareaValue: "",
                commentsCounter: this.state.commentsArr.length + 1
            }), this.storageCallback)}
    };



    render (){

        const { id, name, email } = this.props;
        let comm = null;
        if (this.state.displayComments) {
            comm = (
                <div>
                    <textarea
                        rows="1"
                        cols="30"
                        className="comment_create"
                        placeholder="Write a comment..."
                        onKeyDown={this.addNewComment}
                        value={this.state.textareaValue}
                        onChange={this.textareaHandle}
                    >
                    </textarea>
                    <div className="comment_list">
                        { this.state.commentsArr.map(userData => {
                            return <CommentAdded
                                    key={userData.id}
                                    name={userData.name}
                                    email={userData.email}
                                    textValue={userData.textValue}
                                    />
                        } )}
                    </div>
                </div>
            )

        }

        return (
            <div className="comment_panel">

                <LikePanel id={id} name={this.props.name} email={this.props.email}/>

                <button className="comment_button"
                        name="comment"
                        value={this.state.commentsCounter}
                        onClick={this.displayCommentsHandler}
                >
                    <FontAwesomeIcon icon={faCommentDots} />
                    <span>{this.state.commentsCounter}</span>
                </button>

                {comm}

            </div>
        )
    }
}

export default CommentPanel;