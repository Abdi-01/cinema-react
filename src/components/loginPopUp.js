import React from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../redux/action'
import RegisPopUp from './registerPopUp'
import Axios from 'axios'

class LoginPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            alert1: false,
            alert2: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleAlert1 = this.toggleAlert1.bind(this);
        this.toggleAlert2 = this.toggleAlert2.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleAlert1() {
        this.setState({
            alert1: !this.state.alert1
        });
    }
    toggleAlert2() {
        this.setState({
            alert2: !this.state.alert2
        });
    }

    loginUser = () => {
        var username = this.text.value
        var password = this.pass.value
        if (username === '' || password === '') {
            this.setState({
                alert1: !this.state.alert
            });
        }
        else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(username) === false) {
                Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`, { //tanda tanya digunakan utk mencari
                    username,
                    password
                })
                    .then((res) => {
                        if (res.data.length === 0) {
                            this.setState({
                                alert2: !this.state.alert
                            });
                        }
                        else {
                            console.log(res.data)
                            localStorage.setItem(`userlogin`, res.data[0].username)//menyimpan data username pada local storage agar ketika page direfresh user tetap login 
                            this.props.login(res.data[0])//masuk authAction.js
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }else{
                Axios.get(`http://localhost:2000/users?email=${username}&password=${password}`, { //tanda tanya digunakan utk mencari
                    username,
                    password
                })
                    .then((res) => {
                        if (res.data.length === 0) {
                            this.setState({
                                alert2: !this.state.alert
                            });
                        }
                        else {
                            console.log(res.data)
                            localStorage.setItem(`userlogin`, res.data[0].username)//menyimpan data username pada local storage agar ketika page direfresh user tetap login 
                            this.props.login(res.data[0])//masuk authAction.js
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }

    render() {
        return (
            <div style={{ marginRight: 10 }}>
                <div className="row">
                    <Button color="light" size='sm' onClick={this.toggle}>Login</Button>&nbsp;
                    <RegisPopUp></RegisPopUp>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Login Your Account</ModalHeader>
                    <Alert color="warning" isOpen={this.state.alert1} toggle={this.toggleAlert1}>
                        Fill in on the form!
                    </Alert>
                    <Alert color="warning" isOpen={this.state.alert2} toggle={this.toggleAlert2}>
                        Username or password invalid!
                    </Alert>
                    <ModalBody >
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input type="username" name="email" innerRef={(text) => this.text = text} id="exampleEmail" placeholder="Username or Password" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input type="password" name="password" innerRef={(pass) => this.pass = pass} id="examplePassword" placeholder="Password" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="primary" onClick={this.loginUser}>Login</Button>
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}

export default connect(mapStatetoProps, { login })(LoginPopUp)