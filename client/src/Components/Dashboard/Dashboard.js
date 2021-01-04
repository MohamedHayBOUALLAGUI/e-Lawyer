import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../JS/actions/profile';
import { getUserCases, getLawyerCases } from '../../JS/actions/case';
import Spinner from '../layout/Spinner';
import "./Dashboard.css"

const Dashboard = () => {
  const user = useSelector(state => state.userReducer.user)
  const loading = useSelector(state => state.userReducer.loadUser)
  const profile = useSelector(state => state.profileReducer.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [getCurrentProfile]);

  return (
    loading ?<Spinner/>:
      (<div className='dashboard'>
        <div className="containerHead">
          <div className="row">
            <div className="neons col-12">
              <h1><em>Dashboard</em></h1>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="inner">
            <span >
              <i className="fas fa-user" /> Welcome {user && user.name + ' ' +user.lastName}
            </span>
          </div>
          <div className="inner">
            <span>
              <i className="fas fa-user" /> Welcome {user && user.name + ' ' +user.lastName}
            </span>
          </div>
        </div>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
              <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                <i className="fas fa-user-minus" /> Delete My Account
            </button>
              <Link to="/cases">
                <button className="btn btn-success" onClick={() => {
                  if (user.isClient == true) { dispatch(getUserCases()) }
                  if (user.isLawyer == true) { dispatch(getLawyerCases()) }
                }}>
                  <i className="fas fa-search-plus" /> View your cases
            </button>
              </Link>
            </div>
          </Fragment>
        ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
          </Link>
              <div className="my-2">
                <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                  <i className="fas fa-user-minus" /> Delete My Account
            </button>
                <Link to="/cases">
                  <button className="btn btn-success" onClick={() => {
                    if (user.isClient == true) { dispatch(getUserCases()) }
                    if (user.isLawyer == true) { dispatch(getLawyerCases()) }
                  }}>
                    <i className="fas fa-search-plus" /> View your cases
            </button>
                </Link>
              </div>
            </Fragment>
          )}
      </div>)
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func,
  deleteAccount: PropTypes.func,
  profile: PropTypes.object
};

export default Dashboard;
