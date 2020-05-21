import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Navbar />
        <Route exact path='/' component={ Landing } />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component= { Register } />
            <Route exact path="/login" component= { Login } />
          </Switch>
        </section>
      </React.Fragment>
    </Router>
  </Provider>
  
)
  


export default App;
