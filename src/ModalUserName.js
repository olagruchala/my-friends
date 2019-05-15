import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Form } from "react-bootstrap";


class ModalUserName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validated: false,
            show: false,
            isLoggedIn: JSON.parse(sessionStorage.getItem("isLoggedIn")) || false,
            userName: sessionStorage.getItem("username") || "unknown"
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount and validated: " + this.state.validated);
        if (this.state.userName !== "unknown") {
            this.props.dataService.setNewData(this.state.userName); //set user name
        }
    }

    handleCancel() {
        this.setState({
            show: false,
            userName: "unknown"
        });
    }

    handleSubmit(event) {

        const form = event.currentTarget;
        const nameText = this.formName;
        // const emailText = this.formEmail;

        if (form.checkValidity() === false) {
            console.log("invalid form");
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated: true //potrzebne, żeby zrobić re-render
            });
        } else {
            console.log("set state");
            this.setState({
                validated: true,
                isLoggedIn: true,
                userName: nameText.value
            }, () => {
                this.props.dataService.setNewData(nameText.value);
                sessionStorage.setItem("username", nameText.value);
                sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
            });
        }
    }

    handleShow () {
        console.log("show modal and validated: " + this.state.validated);
        if (!this.state.isLoggedIn) {
            this.setState({show: true}, () => {
                ReactDOM.findDOMNode(this.formName).focus();
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

        const { validated } = this.state;

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
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            <Form.Group controlId="formName">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    ref={(ref) => { this.formName = ref }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    ref={(ref) => { this.formEmail = ref }}
                                />
                            </Form.Group>
                            <Button type="submit">Save</Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </>
        )
    }
}

export default ModalUserName;