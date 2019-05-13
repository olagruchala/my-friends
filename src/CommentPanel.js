import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import React from "react";

const STORAGE_NAME_PREFIX = `comment_panel-`;

//comment_panel-1

class CommentPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem(this.getStorageName())) || {
            likesCounter: 0,
            currentUserLike: false, //FIXME wrong place, zamienic na currentUserLike zapisywane w SesionStorage dla następnego uzytkownika
            commentsCounter: 0, //FIXME wrong, use comments.length
            commentsFlag: false, //FIXME wrong place
            comments: [],
            displayComments: false
        };

        this.likeHandler = this.likeHandler.bind(this);
        this.commentHandler = this.commentHandler.bind(this);
        this.getStorageName = this.getStorageName.bind(this);
    }

    getStorageName() {
        return STORAGE_NAME_PREFIX + this.props.id;
    }

    likeHandler () {
        // console.log('this.state.likesCounter : ' + this.state.likesCounter);
        // console.log('this.state.currentUserLike : ' + this.state.currentUserLike);

        let callback = () => localStorage.setItem(this.getStorageName(), JSON.stringify(this.state));

        if (this.state.currentUserLike) {
            this.setState(prevState => ({
                currentUserLike: false,
                likesCounter:  prevState.likesCounter - 1
                }), callback);
        } else {
            this.setState(prevState => ({
                currentUserLike: true,
                likesCounter: prevState.likesCounter + 1
            }), callback);
        }
    }

    commentHandler () {

        let callback = () => localStorage.setItem(this.getStorageName(), JSON.stringify(this.state));

        if (this.state.commentsFlag) {
            this.setState(prevState => ({
                commentsFlag: false,
                commentsCounter:  prevState.commentsCounter - 1,
                displayComments: !prevState.displayComments

            }), callback)
        } else {
            this.setState(prevState => ({
                commentsFlag: true,
                commentsCounter:  prevState.commentsCounter + 1,
                displayComments: !prevState.displayComments
            }), callback)
        }
    }

    render (){

        const name = this.props;
        let comm = null;
        if (this.state.displayComments) {
            comm = (
                <div>
                    <textarea rows="1" cols="30"
                          className="comment_create"
                          placeholder="Write a comment..."
                    >
                    </textarea>
                    <div className="comment_list">comment list</div>
                </div>
            )

        }

        return (
            <div className="comment_panel">

                <button className="like_button"
                        name="like"
                        value={this.state.likesCounter}
                        onClick={this.likeHandler}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{this.state.likesCounter}</span>
                </button>

                <button className="comment_button"
                        name="comment"
                        value={this.state.commentsCounter}
                        onClick={this.commentHandler}
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