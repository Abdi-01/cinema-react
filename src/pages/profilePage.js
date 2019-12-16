import React, { Component } from 'react';
import Axios from 'axios'
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        Axios.get( `http://localhost:2000/users?username=${localStorage.getItem('userlogin')}`)
    }
    render() { 
        return ( 
            <div>

            </div>
         );
    }
}


 
export default ProfilePage;