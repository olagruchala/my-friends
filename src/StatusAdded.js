import margaretka from "./margaretka.jpg";
import React from "react";
import CommentPanel from "./CommentPanel";



class StatusAdded extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {}
        }
    }

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

                <CommentPanel />
            </div>
        )
    }
}

export default StatusAdded;