import margaretka from "./margaretka.jpg";
import React from "react";
import CommentPanel from "./CommentPanel";

const STORAGE_NAME_PREFIX = "status-";

//"status-1"

// todo
class StatusAdded extends React.Component {
    // constructor(props) {
    //     super(props);
        // this.state = JSON.parse(localStorage.getItem(STORAGE_NAME_PREFIX + props.key)) || {
        //     like: {},
        //     comment: {}
        // }
    // }

    render() {

        const {txtValue, date, name, id} = this.props;

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
                <CommentPanel key={id}/>
            </div>
        )
    }
}

export default StatusAdded;