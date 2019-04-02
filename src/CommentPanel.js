import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const STORAGE_NAME = "comment_panel";

class CommentPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem(STORAGE_NAME)) || {
            likesNumber: 0,
            likesFlag: false,
            commentsNumber: 0,
            commentsFlag: false,
            // displayComments: false
        };

        this.likeHandler = this.likeHandler.bind(this);
        this.commentHandler = this.commentHandler.bind(this);
    }

    // componentDidMount() {
    //     sessionStorage.likesNumber = JSON.stringify(this.state);
    // }

    likeHandler () {
        console.log('this.state.likesNumber : ' + this.state.likesNumber);
        console.log('this.state.likesFlag : ' + this.state.likesFlag);

        let callback = () => localStorage.setItem(STORAGE_NAME, JSON.stringify(this.state));

        if (this.state.likesFlag) {
            this.setState(prevState => ({
                likesFlag: false,
                likesNumber:  prevState.likesNumber - 1
                }), callback);
        } else {
            this.setState(prevState => ({
                likesFlag: true,
                likesNumber: prevState.likesNumber + 1
            }), callback);
        }
    }

    commentHandler () {

        let callback = () => localStorage.setItem(STORAGE_NAME, JSON.stringify(this.state));

        if (this.state.commentsFlag) {
            this.setState(prevState => ({
                commentsFlag: false,
                commentsNumber:  prevState.commentsNumber - 1,
                // displayComments: !prevState.displayComments

            }), callback)
        } else {
            this.setState(prevState => ({
                commentsFlag: true,
                commentsNumber:  prevState.commentsNumber + 1,
                // displayComments: !prevState.displayComments
            }), callback)
        }
    }

    render (){

        // let comm = null;
        // if (this.state.displayComments) {
        //     comm = (
        //         <div>
        //             <textarea rows="1" cols="30"
        //                   className="comment_create"
        //                   placeholder="Write a comment..."
        //             >
        //             </textarea>
        //             <div className="comment_list">comment list</div>
        //         </div>
        //     )
        //
        // }

        return (
            <div className="comment_panel">

                <button className="like_button"
                        name="like"
                        value={this.state.likesNumber}
                        onClick={this.likeHandler}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{this.state.likesNumber}</span>
                </button>

                <button className="comment_button"
                        name="comment"
                        value={this.state.commentsNumber}
                        onClick={this.commentHandler}
                >
                    <FontAwesomeIcon icon={faCommentDots} />
                    <span>{this.state.commentsNumber}</span>
                </button>

                {/*{comm}*/}

            </div>
        )
    }
}

export default CommentPanel;