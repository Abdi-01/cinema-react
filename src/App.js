import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from './redux/action'
import Axios from 'axios'
import Header from './components/navbar'
import Home from './pages/home'
import MoviesDetail from './pages/moviesdetail'
import Footer from './components/footer'
// import Reserve from './components/reservation'
// import AdminPage from './pages/adminPage'
// import UserPage from './pages/userPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    let userlogin = localStorage.getItem('userlogin')
    if (userlogin) {
      console.log(userlogin)
      Axios.get(`http://localhost:2000/users?username=${userlogin}`)
        .then((res) => {
          console.log(res.data)
          this.props.login(res.data[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <div>
        <Header></Header>
        <Route path='/' component={Home} exact></Route>
        {/* <Route path='/AdminPage' component={AdminPage}></Route>
        <Route path='/UserPage' component={UserPage}></Route> */}
        <Route path='/MoviesDetail' component={MoviesDetail}></Route>
        {/* <Footer /> */}
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(null, { login })(App)