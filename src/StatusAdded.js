import margaretka from "./margaretka.jpg";
import React from "react";
import CommentPanel from "./CommentPanel";


// todo
class StatusAdded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // like: {},
            // comment: {}
        }
    }

    render() {

        const {txtValue, date, name} = this.props;

        return (
            <div className="status_added">

                <div className="author">
                    <img className="author_img" src={margaretka} alt="user"></img>
                    <p className="author_name">{name}</p>
                    <small className="status_data">{date}</small>
                </div>
                {/*todo: długie textValue nie zawija się i nie mieści w divie*/}
                <div className="status_content">{txtValue}</div>

                {/*todo: przekazać this.state z CommentPanel jako propsy*/}
                <CommentPanel/>
            </div>
        )
    }
}

export default StatusAdded;