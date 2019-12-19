import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../App.css';
// import '.styleNotFound.css'
class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div >
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1> B( </h1>&nbsp;
                    </div>
                        <h2>404 - Page not found</h2>
                        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                        <Link to='/'>
                            Home Page
                            </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
