import React from "react";
import LikePanel from "./LikePanel"
import CommentAdded from "./CommentAdded"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots} from "@fortawesome/free-regular-svg-icons";
import {Col, Container, Row} from "react-bootstrap";
import {UserDataService, CommentDataObserver} from "./DataService";
import {faAngleDoubleDown, faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";

const STORAGE_NAME_PREFIX = `comment_panel-`;

//comment_panel-1

class CommentPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem(this.getStorageName())) || {
            commentsArr: [],
            commentsCounter: 0,
            displayComments: false,
            textareaValue: "",
        };

        this.displayComments = this.displayComments.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
        this.getStorageName = this.getStorageName.bind(this);
        this.textareaHandle = this.textareaHandle.bind(this);
        this.storageCallback = this.storageCallback.bind(this);

        UserDataService.addObserver(this.onUserNameDefined);
        CommentDataObserver.addObserver(this.onCommentEdition)

    }

    getStorageName() {
        return STORAGE_NAME_PREFIX + this.props.id;
    }

    storageCallback = () => localStorage.setItem(this.getStorageName(), JSON.stringify(this.state));

    // callback when some comment from commentsArr is edited
    onCommentEdition = (commentsArr) => {
        this.setState({
            commentsArr: commentsArr
        }, this.storageCallback)
    };

    // hide comments if the user logs out
    onUserNameDefined = (user) => {
        if (user.name === "unknown") {
            this.setState({
                displayComments: false
            })
        }
    };

    displayComments() {
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

    textareaHandle(e) {
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


        if (userData.textValue.trim().length > 0) {
            if (e.keyCode === 13 && e.shiftKey === false) {
                e.preventDefault(); // delete enter in textarea after send a new comment
                this.setState(prevState => ({
                    commentsArr: [userData, ...prevState.commentsArr], // push new comment to begin of array
                    textareaValue: "",
                    commentsCounter: this.state.commentsArr.length + 1
                }), this.storageCallback)
            }
        }

    };

    render() {

        const {id} = this.props;

        // arrows up and down to display or not comments list
        let faAngleIcon = null;
        if (this.state.displayComments) {
            faAngleIcon = faAngleDoubleUp
        } else {
            faAngleIcon = faAngleDoubleDown
        }

        // display or not comments list
        let comment = null;
        if (this.state.displayComments) {
            comment = (
                <div>
                    <textarea
                        rows="1"
                        cols="30"
                        className="comment_create"
                        placeholder="Write a comment..."
                        onKeyDown={this.addNewComment}
                        value={this.state.textareaValue}
                        onChange={this.textareaHandle}
                    />
                    <div className="comment_list">
                        {this.state.commentsArr.map(userData => {
                            return <CommentAdded
                                key={userData.id}
                                id={userData.id}
                                name={userData.name}
                                email={userData.email}
                                textValue={userData.textValue}
                                commentsArr={this.state.commentsArr}
                                commentObserver={CommentDataObserver}
                            />
                        })}
                    </div>
                </div>
            )

        }


        return (
            <Container className="comment-container">
                <Row>
                    <Col>
                        <LikePanel id={id}/>
                    </Col>
                    <Col>
                        <button className="comment_button btn-right"
                                name="comment"
                                value={this.state.commentsCounter}
                                onClick={this.displayComments}
                        >
                            <FontAwesomeIcon icon={faCommentDots}/>
                            <span>{this.state.commentsCounter}</span>
                            <FontAwesomeIcon icon={faAngleIcon}/>
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {comment}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CommentPanel;