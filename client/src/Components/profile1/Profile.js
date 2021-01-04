import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../JS/actions/profile';
import { current } from '../../JS/actions/user';


const Profile = ({ match }) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(current());
    dispatch(getProfileById(match.params.id))
  }, [getProfileById, match.params.id, current]);

  const profile = useSelector(state => state.profileReducer.profile)
  const loading = useSelector(state => state.userReducer.loading)
  const loadingPro = useSelector(state => state.profileReducer.loading)
  const isAuth = useSelector(state => state.profileReducer.isAuth)
  const user = useSelector(state => state.userReducer.user)

  return (
    <Fragment>
      {loadingPro ? (
        <Spinner />
      ) : profile === null ? (<h1>no profile</h1>) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {!loading && isAuth &&
            user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                  <h4>No experience credentials</h4>
                )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                  <h4>No education credentials</h4>
                )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func,
  profile: PropTypes.object,
};

export default Profile;
