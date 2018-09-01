import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { Menu } from 'antd';
import 'antd/dist/antd.css';
import Homepage from './pages/homePage';
import ListDemo from './pages/listDemo';
import Menu from './components/menu';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <div className='system-layout'>
          <div className='system-menu'>
           <Router>
            <Route path='/' component={Menu} />
           </Router>
          </div>
          <div className='system-content'>
            <Router>
                <Switch>
                  <Route path='/homepage' component={Homepage} />
                  <Route exact path='/list' component={ListDemo} />
                  <Redirect exact to='/homepage' component={Homepage} />
                </Switch>
            </Router>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
