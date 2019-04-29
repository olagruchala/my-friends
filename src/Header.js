import logo from "./logo.png";
import React from "react";
import './App.css';
// import $ from 'jquery';
import 'bootstrap';



class Header extends React.Component {
    render () {

        // $('#userNameModal').on('shown.bs.modal', function () {
        //     $('#userNameModal').trigger('focus')
        // });

        return (
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" height="120px"></img>
                    <h1>friends</h1>
                </div>
                <div className="hello_user">
                    <span>Hello {this.props.name}!</span>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#userNameModal">
                        Launch demo modal
                    </button>


                    <div id="userNameModal" className="modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"> What's your name? </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input type="text">
                                    </input>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary"> Save </button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal"> Cancel </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        )
    }
}

export default Header;
