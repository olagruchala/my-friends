import margaretka from "./margaretka.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";



class StatusAdded extends React.Component {
    render () {
        return (
            <div className="status_added">

                <div className="author">
                    <img className="author_img" src={margaretka} alt="user"></img>
                    <p className="author_name">Ola Gruchała</p>
                    <small className="status_data">Today</small>
                </div>

                <div className="status_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent vulputate nisl sit amet mi aliquet, eget mattis est accumsan. Aenean placerat
                    elementum erat nec consequat. Vivamus tristique turpis consequat erat rhoncus, nec tincidunt
                    felis faucibus. Aenean sit amet velit vel purus volutpat tristique.
                </div>

                <div className="comment_panel">
                    <button className="like_button">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span>2</span>
                    </button>
                    <button className="comment_button">
                        <FontAwesomeIcon icon={faCommentDots} />
                        <span>4</span>
                    </button>

                    <textarea rows="1" cols="30" className="comment_create" placeholder="Write a comment..."></textarea>
                    <div className="comment_list">comment_list</div>

                </div>
            </div>
        )
    }
}

export default StatusAdded;