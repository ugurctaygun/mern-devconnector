import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Route exact path='/' component={ Landing } />
      <section className="container">
        <Switch>
          <Route exact path="/register" component= { Register } />
          <Route exact path="/login" component= { Login } />
        </Switch>
      </section>
    </React.Fragment>
  </Router>
)
  


export default App;
