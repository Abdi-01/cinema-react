import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import LoginPopUp from './loginPopUp'
import UserDropdown from './dropdown'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark" style={{background:"#0d47a1", borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <Link to='/' className="navbar-brand mb-0 h1">
                            <img src="https://image.freepik.com/free-vector/click-movie-logo-vector_18099-274.jpg" width="30" height="30" className="d-inline-block align-top" alt="logo" />&nbsp;
                            Cinema21</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to='/Theater' className="nav-link" >Theaters<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/Upcoming' className="nav-link" >Upcoming</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to='/promotion' className="nav-link" >Promotion</Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <Link className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</Link>
                            </li> */}
                        </ul>
                    </div>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn btn-outline-light my-2 my-sm-0 btn-sm" type="submit">Search</button>
                    </form>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.props.username
                        ?
                        <UserDropdown></UserDropdown>
                        :
                        <LoginPopUp></LoginPopUp>
                    }
                    {/* <LoginPopUp ></LoginPopUp> */}
                </nav>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}
export default connect(mapStatetoProps)(Header)