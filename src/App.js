import React from 'react';
import './App.css';
import LoginPage from '../src/components/login/login';
import { Switch, Route, Redirect } from 'react-router-dom';
import DashboardPage from '../src/components/dashboard/dashboard';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      userData: {}
    }
  }

  checkLogin = () => {
    return <Redirect to="/login" />
  }

  setUserData = (data) => {
    this.setState({ userData: data })
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <Switch>
          <Route exact path="/" render={() => this.checkLogin()} />
          <Route exact path="/login" render={() => (<LoginPage setUserData={this.setUserData} />)} />
          <Route exact path="/dashboard" render={() => (<DashboardPage userData={this.state.userData} />)} />
        </Switch>
      </div>
    );
  }
}

export default App;
