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
                    <Link to='/ProfilePage'>
                        <DropdownItem >Profile</DropdownItem>
                    </Link>
                    {/* <DropdownItem>Contact</DropdownItem>
                    <DropdownItem>Setting</DropdownItem> */}
                    {this.props.role === 'admin'
                        ?
                        <div>
                            <Link to='/AdminPage'>
                                <DropdownItem>Movies List</DropdownItem>
                            </Link>
                            <Link to='/ReportPage'>
                                <DropdownItem>Report Transaction</DropdownItem>
                            </Link>
                        </div>
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
        role: state.user.role, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
    }
}

export default connect(mapStatetoProps, { logout })(UserDropdown)
