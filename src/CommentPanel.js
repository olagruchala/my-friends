import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";

class CommentPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            like: 0,
            comment: 0,
            liked: false,
            commented: false
        };

        this.likeHandler = this.likeHandler.bind(this);
        this.commentHandler = this.commentHandler.bind(this);
    }

    likeHandler (event) {
        let name = event.target.name;

        if (this.state.liked === false) {
            this.setState(prevState => ({
                liked: true,
                [name]:  prevState[name] + 1
            }))
        } else {
            this.setState(prevState => ({
                liked: false,
                [name]:  prevState[name] - 1
            }))
        }
    }

    commentHandler (event) {
        let name = event.target.name;

        if (this.state.commented === false) {
            this.setState(prevState => ({
                commented: true,
                [name]:  prevState[name] + 1
            }))
        } else {
            this.setState(prevState => ({
                commented: false,
                [name]:  prevState[name] - 1
            }))
        }
    }

    render (){
        return (
            <div className="comment_panel">

                <button className="like_button"
                        name="like"
                        value={this.state.like}
                        onClick={this.likeHandler}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{this.state.like}</span>
                </button>

                <button className="comment_button"
                        name="comment"
                        value={this.state.comment}
                        onClick={this.commentHandler}
                >
                    <FontAwesomeIcon icon={faCommentDots} />
                    <span>{this.state.comment}</span>
                </button>

                <textarea rows="1" cols="30"
                          className="comment_create"
                          placeholder="Write a comment..."
                >
                </textarea>
                <div className="comment_list">comment_list</div>

            </div>
        )
    }
}

export default CommentPanel;