import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import { connect } from 'react-redux' //harus ada untuk terhubung dengan global state
import { logout } from '../redux/action' //mengakses function dari action
import { Link } from 'react-router-dom'

class UserDropdown extends Component {
    logoutUser = () => {
        this.props.logout()
        localStorage.removeItem('userlogin')
    }
    render() {
        return (
            <UncontrolledDropdown style={{ marginRight: 15 }}>
                <DropdownToggle caret>
                    Hi, {this.props.username}
                </DropdownToggle>
                <DropdownMenu right>
                    {/* <DropdownItem header>Profile</DropdownItem> */}
                    <DropdownItem >Profile</DropdownItem>
                    <DropdownItem>Contact</DropdownItem>
                    <DropdownItem>Setting</DropdownItem>
                    {this.props.role === 'admin'
                        ?
                        <Link to='/AdminPage'>
                            <DropdownItem>My Movies</DropdownItem>
                        </Link>
                        :
                        <Link to='/UserPage'>
                            <DropdownItem>My Ticket Cart <Badge color="success">0</Badge></DropdownItem>
                        </Link>
                    }
                    <DropdownItem divider />
                    <Link to='/'>
                        <DropdownItem onClick={this.logoutUser}>Logout</DropdownItem>
                    </Link>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
        role: state.user.role
    }
}

export default connect(mapStatetoProps, { logout })(UserDropdown)
