import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";


class ModalUserName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            isLoggedIn: JSON.parse(sessionStorage.getItem("isLoggedIn")) || false,
            userName: sessionStorage.getItem("username") || "unknown"
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        if (this.state.userName !== "unknown") {
            this.props.dataService.setNewData(this.state.userName); //set user name
        }
    }

    handleCancel() {
        this.setState({
            show: false
        });
    }

    handleSave() {
        let inputText = this.inputField;
        if (inputText.value !== "" && inputText.value !== null) {
            this.setState({
                show: false,
                isLoggedIn: true,
                userName: inputText.value
            }, () => {
                this.props.dataService.setNewData(inputText.value); //set user name
                sessionStorage.setItem("username", inputText.value);
                sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
            });

        } else {
            this.setState({
                show: false,
                userName: "unknown"
            });
        }
    }

    handleShow() {
        if (!this.state.isLoggedIn) {
            this.setState({show: true}, () => {
                ReactDOM.findDOMNode(this.inputField).focus();
            });
        } else {
            this.setState({
                userName: "unknown",
                isLoggedIn: false
            }, () => {
                this.props.dataService.setNewData(this.state.userName);
                sessionStorage.setItem("username", "unknown");
                sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
            })
        }
    }

    render () {


        return (
            <>
                <Button variant="info" onClick={this.handleShow}>
                    {this.state.isLoggedIn? 'Logout' : 'Login'}
                </Button>

                <Modal show={this.state.show} onHide={this.handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>What's your name?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <FormControl
                                ref={(ref) => { this.inputField = ref }}
                                // id="inputFieldID"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="info" onClick={this.handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalUserName;