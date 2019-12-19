import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from './redux/action'
import Axios from 'axios'
import Header from './components/navbar'
import Home from './pages/home'
import MoviesDetail from './pages/moviesdetail'
import GenrePage from './pages/genrePage'
import Footer from './components/footer'
// import Reserve from './components/reservation'
import AdminPage from './pages/adminPage'
import ReportPage from './pages/reportTransaction'
import UserPage from './pages/userPage'
import ProfilePage from './pages/profilePage'
import NotFound from './pages/pageNotFound'

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
        <Switch>
          <Route path='/' component={Home} exact></Route>
          <Route path='/ReportPage' component={ReportPage}></Route>
          <Route path='/UserPage' component={UserPage}></Route>
          <Route path='/ProfilePage' component={ProfilePage}></Route>
          <Route path='/MoviesDetail' component={MoviesDetail}></Route>
          {this.props.role === 'admin'
            ?
            <Route path='/AdminPage' component={AdminPage}></Route>
            :
            <Route path='*' component={NotFound}></Route>
          }
          <Route path='/GenrePage' component={GenrePage}></Route>
          <Route path='*' component={NotFound}></Route>
        </Switch>
        {/* <Footer /> */}
        <Footer></Footer>
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

export default connect(mapStatetoProps, { login })(App)