import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router"
import Login from "./auth/component/login";


import Sidebar from "./components/Toolbar/Sidebar";

import Dashboard from './components/dashboard/dashboard';
import Customer from './components/Customer/customer';
import ViewOrder from './components/Order/Active';
import InactiveOrder from './components/Order/Inactive';

import "./App.css"; 
import Password from './auth/component/password';

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    user:null,
    authLoading: false,
    error: null,
    
  };

componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const user = localStorage.getItem('user')
    const remainingMilliseconds =
    new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId, user: user  });
    this.setAutoLogout(remainingMilliseconds);
    

    

  }

  

logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch('https://server.mysastaprice.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('user', resData.email);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  
  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };


render(){

    let routes = (
      <Switch>
        <Route
            path="/"
            exact
            render={props => (
              <Login
                {...props}
                onLogin={this.loginHandler}
                loading={this.state.authLoading}
              />
            )}
          />
       
    </Switch>
    );
    if (this.state.isAuth) {
      routes = (
        <div>
  
          <div className="app-container">
          <Sidebar userId={this.state.userId} logout={this.logoutHandler}  token={this.state.token}/>
          <div className="route-component">
        <Switch>
           <Route
            path="/"
            exact
            render={props => (
              <Dashboard 
                userId={this.state.userId} 
                logout={this.logoutHandler}  
                token={this.state.token} 
                order={this.state.order}
                product={this.state.product}
                delivered={this.state.delivered}
                customer = {this.state.customer}
              />
            )}
          />

          
        <Route
            path="/active"
            exact
            render={props => (
              <ViewOrder userId={this.state.userId}  token={this.state.token} />
            )}
          />

        <Route
            path="/inactive"
            exact
            render={props => (
              <InactiveOrder userId={this.state.userId}  token={this.state.token} />
            )}
          />

           <Route
            path="/customers"
            exact
            render={props => (
              <Customer userId={this.state.userId}  token={this.state.token} />
            )}
          />

          <Route
            path="/password"
            exact
            render={props => (
              <Password userId={this.state.userId}  token={this.state.token} />
            )}
          />

          
          <Redirect to="/" />
        </Switch>
        </div>
        </div>
        </div>
      );
    }

    return (
      <div className="App">
            {routes}
      </div>
    );
  }
 
}

export default App;