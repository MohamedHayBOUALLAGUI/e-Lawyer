import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { MailOutlined } from "@ant-design/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./ProfileItem.css";

const ProfileItem = ({
  profile: {
    user: { _id, name,lastName, img },
    status,
    emailPro,
    location,
    skills,
  },
}) => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className='cont'>
      <div className='card-containerr'>
        <img className='round' src={img} alt='lawyer' />
        <h2 className='nameProfile'>{name+' '+lastName}</h2>
        <h5 className='nameProfile'> {status} </h5>
        {emailPro && (
          <p className='nameProfile'>
            {" "}
            <MailOutlined /> {emailPro}
          </p>
        )}
        <p className='nameProfile'>
          {location && (
            <span>
              <FaMapMarkerAlt /> {location}
            </span>
          )}
        </p>
        <div className='buttonss'>
          <Link to={`/profile/${_id}`}>
            <button className='primaryy'>View Profile</button>
          </Link>
          {user && _id !== user._id ? (
            <Link to={`/new_case/${_id}`}>
              <button className='primaryy ghost'>Send Request</button>
            </Link>
          ) : null}
        </div>
        <div className='skillss'>
          <h5 className='nameProfile'>Skills</h5>
          <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index}>
                <i className='fas fa-check' /> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object,
};

export default ProfileItem;
