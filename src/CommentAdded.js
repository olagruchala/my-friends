import React from "react";

class CommentAdded extends React.Component {

    render() {
        const { name, email, textValue, id } = this.props;

        return (
            <div className="comment_added">
                <p className="">{ name } write: <span> {textValue} </span></p>

            </div>
        )
    }
}

export default CommentAdded;
