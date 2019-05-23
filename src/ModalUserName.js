import React from "react";
import ReactDOM from "react-dom";
import {Button, Modal, Form} from "react-bootstrap";

class ModalUserName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            showModal: false,
            isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,

            user: JSON.parse(localStorage.getItem("user")) || {
                name: "unknown",
                email: "unknown"
            }
            // todo: isLoggedIn: (this.state.user.name !== "unknown")
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }

    componentDidMount() {
        if (this.state.user.name !== "unknown") {
            this.props.dataService.setNewData(this.state.user);//set user
        }
    }

    handleCancel() {
        this.setState({
            showModal: false
        });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        const nameText = this.formName;
        const emailText = this.formEmail;

        if (form.checkValidity() === false) {
            console.log("invalid form");
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                isFormValid: true // needed to do rerender
            });
        } else {
            console.log("set state");
            this.setState({
                isFormValid: true,
                isLoggedIn: true,
                user: {
                    name: nameText.value,
                    email: emailText.value
                }
            }, () => {
                this.props.dataService.setNewData(this.state.user); // set user
                localStorage.setItem("user", JSON.stringify(this.state.user));
                localStorage.setItem("isLoggedIn", JSON.stringify(true));
            });
        }
    }

    handleShow() {
        if (!this.state.isLoggedIn) {
            this.setState({showModal: true}, () => {
                ReactDOM.findDOMNode(this.formName).focus();
            });
        } else {
            this.setState({
                isLoggedIn: false,
                user: {
                    name: "unknown",
                    email: "unknown"
                }
            }, () => {
                this.props.dataService.setNewData(this.state.user);
                localStorage.setItem("user", JSON.stringify(this.state.user));
                localStorage.setItem("isLoggedIn", JSON.stringify(false));
            })
        }
    }

    render() {

        const {isFormValid} = this.state;

        return (
            <>
                <Button variant="info" onClick={this.handleShow}>
                    {this.state.isLoggedIn ? 'Logout' : 'Login'}
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>What's your name?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            noValidate
                            validated={isFormValid}
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            <Form.Group controlId="formName">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    ref={(ref) => {
                                        this.formName = ref
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    ref={(ref) => {
                                        this.formEmail = ref
                                    }}
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