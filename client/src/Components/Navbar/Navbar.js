import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../JS/actions/user";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(state => state.userReducer.isAuth)
  const user = useSelector(state => state.userReducer.user)

  const authLinks = (
    <ul>
       <li>
        <Link to="/" className="active">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">Profiles</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      {user ? user.isAdmin === true && <li>
        <Link to="/all_users">Users</Link>
      </li> : null}
      <li>
        <Link to="/" onClick={() => {
          dispatch(logout());
          history.push("/");
        }}>
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/" className="active">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className='navbar bg-dark'>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">   <h1>
          <Link to='/'>
            <i className="fas fa-balance-scale-left"></i> <span className="logo">e</span>-LAWYER
        </Link>
        </h1></label>

        <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>
      </nav>
    </div>
  );
};
export default Navbar;
