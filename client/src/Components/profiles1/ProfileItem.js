import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useSelector } from 'react-redux';
import {MailOutlined } from '@ant-design/icons'
import { FaMapMarkerAlt } from 'react-icons/fa';


const ProfileItem = ({
  profile: {
    user: { _id, name, img },
    status,
    emailPro,
    location,
    skills
  }
}) => {
  const  user = useSelector(state => state.userReducer.user);
  return (
    <div className='profile bg-light'>
      <img src={img} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} 
        </p>
        
        {emailPro && <p> <MailOutlined /> {emailPro}</p>}
        <p className='my-1'>{location && <span><FaMapMarkerAlt/> {location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
       {user&&_id!==user._id? <Link to={`/new_case/${_id}`} className='btn btn-primary'>
         send case request
        </Link>:null}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object
};

export default ProfileItem;
