import React from "react";
import LikePanel from "./LikePanel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

const STORAGE_NAME_PREFIX = `comment_panel-`;

//comment_panel-1

class CommentPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem(this.getStorageName())) || {
            userName: this.props.name,
            userEmail: this.props.email,
            commentsCounter: 0, //FIXME wrong, use commentsArr.length
            commentsFlag: false, //FIXME jesli email jest w tablicy comentsArr
            commentsArr: [],
            displayComments: false
        };


        this.commentHandler = this.commentHandler.bind(this);
        this.getStorageName = this.getStorageName.bind(this);
    }

    getStorageName() {
        return STORAGE_NAME_PREFIX + this.props.id;
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

        const { name, id } = this.props;
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

                <LikePanel id={id} name={name}/>

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