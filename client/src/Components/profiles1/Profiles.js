import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../JS/actions/profile';

const Profiles = () => {
  const dispatch = useDispatch();
  const  profiles = useSelector(state => state.profileReducer.profiles);
  const  loading = useSelector(state => state.profileReducer.loading);

  useEffect(() => {
    dispatch(getProfiles());
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Be close to your lawyer
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func,
  profile: PropTypes.object
};

export default Profiles;
