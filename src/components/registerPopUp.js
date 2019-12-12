import React from 'react';
import { Progress, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../redux/action'
import Axios from 'axios'

class RegisPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: [],
            modal: false,
            num: false,
            spec: false,
            show: false,
            abjad: false,
            char: false,
            border: false
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    regisUser = () => {
        // let { char, spec, num } = this.state
        var username = this.text.value
        var email = this.email.value
        var password = this.pass.value
        var confpassword = this.confpass.value
        if (username && email && password && confpassword) {
            if (password !== confpassword) {
                alert('Invalid Password Confirmation')
            }
            else {
                Axios.get(`http://localhost:2000/users?username=${username}`)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.length !== 0) {
                            alert('Username has been taken')
                        }
                        else {

                            Axios.post('http://localhost:2000/users', {
                                username: username,
                                password: password,
                                email: email,
                                role: 'user'
                            })
                                .then((res) => {
                                    console.log('Regis Success' + res.data)
                                    Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                                    .then((res) => {
                                            console.log(res.data)
                                            this.setState({ data: res.data })//untuk mengubah isi state data
                                            localStorage.setItem(`userlogin`,username)
                                            this.props.login(res.data[0])///direct langsung ke login
                                        })
                                    // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
                                })
                                .catch((err) => {
                                    console.log(err)
                                })

                        }

                    })
            }

        } else {
            alert('Please fill in all the forms!')
        }
    }
    //onchange, menjalankan fungsi setiap update isi
    // notif = () => {
    //     return (<Toast>
    //         <ToastHeader icon={<Spinner size="sm" color="success" />}>
    //             Registration Successfully
    //     </ToastHeader>
    //         <ToastBody>
    //             Please, login your account after this!
    //     </ToastBody>
    //     </Toast>)
    // }

    regisSubmit = () => {
        this.regisUser()
        this.toggle()
        // this.notif()
    }

    ///cek password
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
            // console.log('abjad'+this.state.abjad)
            // console.log('num'+this.state.num)
            // console.log('spec'+this.state.spec)
            if (this.state.abjad && this.state.num && this.state.spec) {
                return <Progress striped bar color="success" value="100">More than Stronger</Progress>
            }
            if ((this.state.abjad && this.state.num) || (this.state.abjad && this.state.spec) || (this.state.num && this.state.spec)) {

                return <Progress striped bar value="75">Strong</Progress>
            }
            // else if ((this.state.abjad && this.state.spec)) {
            //     return <Progress striped bar value="75">Strong</Progress>
            // }
            // else if ((this.state.num && this.state.spec)) {
            //     return <Progress striped bar color="warning" value="75">Strong</Progress>
            // }
            else {
                return <Progress striped bar color="warning" value="25">Weak</Progress>
            }
        } else {
            return <Progress striped bar color="danger" value="100">Min. Password 8</Progress>
        }

    }

    render() {
        return (
            <div>
                <Button color="light" className="d-inline-block align-top" onClick={this.toggle} style={{ cursor: "pointer" }}>Register</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Register Your Account</ModalHeader>
                    <ModalBody >
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                Username
                                <Input type="username" name="username" innerRef={(text) => this.text = text} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                Email
                                <Input type="email" name="email" innerRef={(email) => this.email = email} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                Password
                                <Input type="password" name="password" innerRef={(pass) => this.pass = pass} onChange={this.handleChange} onFocus={this.showReq} placeholder="Min. 8 Character" minLength="8" />
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
                                <Input type="password" name="password" innerRef={(confpass) => this.confpass = confpass} placeholder="Confirmation Password" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="primary" onClick={this.regisSubmit}>Register</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps, { login })(RegisPopUp)