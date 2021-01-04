import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FaClipboardList } from "react-icons/fa";
import "./ProfileNew.css";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div className='profile-about bg-light p-2 aboutPro'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>Professional Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className='text-primary'>Skills</h2>
    <FaClipboardList style={{ fontSize: "30", color: "blue" }} />
    <div className='skills'>
      {skills.map((skill, index) => (
        <div key={index}>
          <i className='fas fa-check' /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default ProfileAbout;
