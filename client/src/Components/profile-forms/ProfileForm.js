import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../JS/actions/profile';

const initialState = {
  emailPro: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = () => {
  const history=useHistory()
  const profile = useSelector(state => state.profileReducer.profile)
  const loading = useSelector(state => state.profileReducer.loading)
  const dispatch=useDispatch()

  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) {dispatch(getCurrentProfile())}
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    emailPro,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createProfile(formData, history, profile ? true : false));
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small style={{color:'red'}}>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Your Law Specialty</option>
            <option value="Foreigners Lawyer">Foreigners Lawyer</option>
            <option value="Insurance Lawyer">Insurance Lawyer</option>
            <option value="Accountant & tax Lawyer">Accountant & tax Lawyer</option>
            <option value="Criminal Lawyer">Criminal Lawyer</option>
            <option value="Family Lawyer">Civil & Family Lawyer</option>
            <option value="Employment Lawyer">Employment Lawyer</option>
            <option value="Other">Other</option>
            
          </select>
          <small className="form-text">
            Give us your main specialty
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Professional email"
            name="emailPro"
            value={emailPro}
            onChange={onChange}
          />
          <small className="form-text">
            Set your professional email
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            Set your office location (eg. Tunis, Mutuelle ville)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span style={{color:'white'}}>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func,
  getCurrentProfile: PropTypes.func,
  profile: PropTypes.object
};



export default ProfileForm;
