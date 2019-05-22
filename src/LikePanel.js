import React from 'react';
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserDataService from "./DataService";

const STORAGE_NAME_PREFIX = `like_panel-`;

//like_panel-1

class LikePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {
                name: "unknown",
                email: "unknown"
            },
            likes: JSON.parse(localStorage.getItem(this.getStorageName())) || {
                likesCounter: 0,
                likesArr: [],
                currentUserLike: false
            }
        };

        UserDataService.addObserver(this.onUserNameDefined);

        this.likeHandler = this.likeHandler.bind(this);
        this.getStorageName = this.getStorageName.bind(this);
        this.checkUser = this.checkUser.bind(this);


    }

    onUserNameDefined = (user) => {
        console.log("newData about loggedIn user in LikePanel from DataService");
        this.setState({
            user: user
        });
    };

    checkUser() {
        if(this.state.user.name === "unknown") {
            console.log("user is unknown");
            // todo: add tooltip to like button, and disable button

            // this.setState(prevState => ({
            //     likes: Object.assign(prevState.likes, {currentUserLike: true})
            // }),() => {
            //     localStorage.setItem(this.getStorageName(), JSON.stringify(this.state.likes));
            // })
        }
    }

    getStorageName() {
        return STORAGE_NAME_PREFIX + this.props.id;
    }

    likeHandler () {

        let callback = () => {
            localStorage.setItem(this.getStorageName(), JSON.stringify(this.state.likes));
        };

        let userEmail = this.state.user.email;
        let likesArr = this.state.likes.likesArr;

        if (userEmail !== "unknown") {
            if (!likesArr.includes(userEmail)) {
                likesArr.push(userEmail);
                this.setState(prevState => ({
                    likes: Object.assign(prevState.likes, {likesArr: likesArr, likesCounter: likesArr.length})
                }), callback)
            } else {
                let checkEmailIndex = (element) => {
                    return element === userEmail
                };
                let emailIndex = likesArr.findIndex(checkEmailIndex);
                likesArr.splice(emailIndex,1);
                this.setState(prevState => ({
                    likes: Object.assign(prevState.likes, {likesArr: likesArr, likesCounter: likesArr.length})
                }), callback)
            }
        }
    }

    componentDidMount() {
        this.checkUser();
    }

    render () {

        return (
            <div>
                <button
                    disabled={this.state.user.email === "unknown"}
                    className="like_button"
                    name="like"
                    value={this.state.likes.likesCounter}
                    onClick={this.likeHandler}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{this.state.likes.likesCounter}</span>
                </button>
            </div>
        )
    }
}

export default LikePanel;
