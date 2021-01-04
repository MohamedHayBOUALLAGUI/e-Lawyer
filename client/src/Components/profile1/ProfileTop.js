import React from 'react';
import PropTypes from 'prop-types';
import {MailOutlined } from '@ant-design/icons'
import { FaMapMarkerAlt } from 'react-icons/fa';



const ProfileTop = ({
  profile: {
    status,
    emailPro,
    location,
    social,
    user: { name, img }
  }
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={img} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} 
      </p>
      {emailPro && <p> <MailOutlined /> {emailPro}</p>}
      <p>{location && <span><FaMapMarkerAlt/> {location}</span>}</p>
      <div className='icons my-1'>
       
        {social &&
          Object.entries(social).map(([key, value]) => (
            <a key={key} href={value} target='_blank' rel='noopener noreferrer'>
              <i className={`fab fa-${key} fa-2x`}></i>
            </a>
          ))}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object
};

export default ProfileTop;
