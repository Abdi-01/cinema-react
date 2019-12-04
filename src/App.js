import React,{Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Header from './components/navbar'
import Home from './pages/home'
import AdminPage from './pages/adminPage'
import UserPage from './pages/userPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <div>
        Ini App
        <Header></Header>
        <Route path='/' component={Home} exact></Route>
        <Route path='/AdminPage' component={AdminPage}></Route>
        <Route path='/UserPage' component={UserPage}></Route>
        {/* <Home></Home> */}
      </div>
    );
  }App
}
 
export default App