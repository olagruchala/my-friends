import React from 'react';
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const STORAGE_NAME_PREFIX = `like_panel-`;

//like_panel-1

class LikePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem(this.getStorageName())) || {
            user: {
                name: this.props.name,
                email: this.props.email
            },
            // userName: this.props.name,
            // status: localStorage.getItem("statuses"),
            likesCounter: 0,
            likesArr: [],
            currentUserLike: false // todo: jesli uzytkownik polubił to jego mail dodaję do likesArr, czyli true,
            // todo: a jesli kilknie jeszcze raz to usuwam jego mail z tablicy i mam false
        };

        this.likeHandler = this.likeHandler.bind(this);
        this.getStorageName = this.getStorageName.bind(this);
        this.checkUser = this.checkUser.bind(this);

    }

    checkUser() {
        if(this.props.name === "unknown") { // porównać this.props.name z name statusu zapisanym w localeStorage
            this.setState({
                currentUserLike: false
            },() => localStorage.setItem(this.getStorageName(), JSON.stringify(this.state)))
        }
    }

    getStorageName() {
        return STORAGE_NAME_PREFIX + this.props.id;
    }

    likeHandler () {

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

    componentDidMount() {
        this.checkUser();
    }

    render () {

        return(
            <button className="like_button"
                    name="like"
                    value={this.state.likesCounter}
                    onClick={this.likeHandler}
            >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{this.state.likesCounter}</span>
            </button>
        )
    }
}

export default LikePanel;
