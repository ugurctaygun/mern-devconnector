import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Logout} from '../../actions/auth';

const Navbar = ({Logout, auth: {isAuthenticated, loading}}) => {

  const authLinks = (
    <ul>
      <li>
        <a href="#!" onClick={Logout}>
          <i className="fas fa-sign-out-alt"></i> {''}
          <span className="hide-sm">Logout</span>
          </a>
      </li>
    </ul>  
  );

  const guestLinks = (
    <ul>
      <li><a href="#!">Developers</a></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector</Link>
      </h1>
     {!loading && (<React.Fragment>
       {isAuthenticated ? authLinks : guestLinks}
     </React.Fragment>)
     }
    </nav>
    )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {Logout})(Navbar);