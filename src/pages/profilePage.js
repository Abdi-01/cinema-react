import React, { Component } from 'react';
import { Table, Progress, Button, Jumbotron, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux'
import Axios from 'axios'

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            toggle: false,
            num: false,
            spec: false,
            show: false,
            abjad: false,
            char: false,
            border: false
        }
        this.toggle = this.toggle.bind(this)
    }
    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    componentDidMount() {
        Axios.get(`http://localhost:2000/users?username=${localStorage.getItem('userlogin')}`)
            .then((res) => {
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }


    editSubmit = () => {
        this.Submit()
        this.toggle()
        // this.notif()
    }

    Submit = () => {
        var username = this.text.value
        var email = this.email.value
        var oldpassword = this.oldpass.value
        var newpassword = this.newpass.value
        var confpassword = this.confpass.value
        // if (username === '' || email === '' || oldpassword === '' || newpassword === '' || confpassword === '') {
        //     alert('Complete Your Changes')
        // }
        // else 
        if (oldpassword === this.props.password) {
            // if (newpassword === confpassword) {
                Axios.patch(`http://localhost:2000/users/${this.state.data[0].id}`, {
                    username: username,
                    password: newpassword,
                    email: email
                })
                    .then((res) => {
                        console.log(res.data)
                        Axios.get(`http://localhost:2000/users`)//update data
                            .then((res) => {
                                this.setState({ data: res.data })
                                // this.setState({ selectedId: null })
                            })
                    })
            // }
        }
    }

    handleChange = (e) => {
        let pass = e.target.value
        let abjad = /[a-z]/
        let num = /[0-9]/
        let spec = /[$#@!%^&*()]/
        this.setState({
            abjad: abjad.test(pass),
            num: num.test(pass),
            spec: spec.test(pass),
            char: pass.length > 7,
            border: (abjad.test(pass) && num.test(pass) && spec.test(pass) && (pass.length > 7))
        })
    }
    showReq = () => {
        this.setState({ show: true })
    }

    passwordMeter = () => {
        if (this.state.char) {
            if (this.state.abjad && this.state.num && this.state.spec) {
                return <Progress striped bar color="success" value="100">More than Stronger</Progress>
            }
            if ((this.state.abjad && this.state.num) || (this.state.abjad && this.state.spec) || (this.state.num && this.state.spec)) {
                return <Progress striped bar value="75">Strong</Progress>
            }
            else {
                return <Progress striped bar color="warning" value="25">Weak</Progress>
            }
        } else {
            return <Progress striped bar color="danger" value="100">Min. Password 8</Progress>
        }

    }

    render() {
        // let { username, email, password } = this.state.data
        // console.log(username)
        return (
            <div>
                <Jumbotron style={{ width: '20%', height: '50%', margin: 'auto', marginTop: '5%' }}>
                    <h2 style={{ textAlign: 'center' }}>Your Profile</h2>
                    {/* {this.state.data.map((val) => */}
                    <Table className="table">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{this.props.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.props.email}</td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td className="hidetext">{this.props.password}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* )} */}
                    <div style={{ textAlign: "center" }}>
                        <Button onClick={this.toggle}>Edit</Button>
                        <Modal isOpen={this.state.toggle} toggle={this.toggle}>
                            <ModalHeader>Edit Your Profile</ModalHeader>
                            <ModalBody >
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        Username
                                <Input type="username" name="username" innerRef={(text) => this.text = text} defaultValue={this.props.username} />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        Email
                                <Input type="email" name="email" innerRef={(email) => this.email = email} value={this.props.email} />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        Old Password
                                <Input type="password" name="oldpassword" innerRef={(oldpass) => this.oldpass = oldpass} onFocus={this.showReq} placeholder="" value={this.props.password} minLength="8" />
                                        New Password
                                <Input type="password" name="newpassword" innerRef={(newpass) => this.newpass = newpass} onChange={this.handleChange} onFocus={this.showReq} placeholder="Min. 8 Character" minLength="8" />
                                        <Progress multi style={{ width: 150 }}>
                                            {
                                                this.state.show
                                                    ?
                                                    this.passwordMeter()
                                                    :
                                                    null
                                            }
                                        </Progress>
                                        Confirm Your Password
                                <Input type="password" name="confpassword" innerRef={(confpass) => this.confpass = confpass} placeholder="Confirmation Password" />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter >
                                <Button color="primary" onClick={this.editSubmit}>Submit</Button>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        email: state.user.email,
        password: state.user.password,
        role: state.user.role
    }
}

export default connect(mapStatetoProps)(ProfilePage)