import React, { Component } from 'react';
import Navigation from './navigation/navigation'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Login from './login/login'
import AdminNavigation from './adminPanel/adminNavigation'
import Chat from './chat/chat'

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <Navigation/>
      <Switch> 
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={AdminNavigation}/>
        <Route path="/chat" component={Chat}/>
      </Switch>
  </BrowserRouter>
      </div>
    );
  }
}

export default App;
