import React, { Fragment } from "react";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../JS/actions/user";
import { useHistory,Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar"


const Dashboard = () => {
  const user = useSelector(state => state.userReducer.user)
  const isAuth = useSelector(state => state.userReducer.isAuth)
  

  const profile = useSelector(state => state.profileReducer.profile)
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Fragment>
    <Navbar/>
   <div>
     {!isAuth?(<h1>LOADING</h1>):( <div>
    <h1>{user.email}</h1>
      <h1>{user.name}</h1>
  <h1>{user.lastName}</h1>
      <button
        onClick={() => {
          dispatch(logout());
          history.push("/");
        }}
      >
        Logout
      </button>
      {user.isClient?<h1>Dashboard user</h1>:<div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Add Education
      </Link>
    </div>}
      </div>)}
    </div>
    </Fragment>
  );
};

export default Dashboard;
