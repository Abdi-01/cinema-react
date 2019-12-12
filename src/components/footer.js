import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{position:'fixed',bottom:0,width:'100%'}}>
                <footer className="page-footer font-small blue mt-5" style={{ backgroundColor: "#0d47a1",borderTopLeftRadius:20,borderTopRightRadius:20 }}>
                    <div className="footer-copyright text-center py-3" style={{ color: 'white' }}>Cinema21 ©2018 Copyright:
            {/* <a href="https://mdbootstrap.com/education/bootstrap/"> Cinema</a> */}
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;