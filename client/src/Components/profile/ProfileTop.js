import React from "react";
import PropTypes from "prop-types";
import { MailOutlined } from "@ant-design/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileTop = ({
  profile: {
    status,
    emailPro,
    location,
    social,
    user: { _id, name,lastName, img },
  },
}) => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className='profile-top bg-primary p-2 profTop'>
      <div className='avatarSocial'>
        <div className='roundd'>
          <img className='round-img my-1 ' src={img} alt='' />
        </div>
        <div className='icons my-1'>
          {social &&
            Object.entries(social).map(([key, value]) => (
              <a
                key={key}
                href={value}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className={`fab fa-${key} fa-2x`}></i>
              </a>
            ))}
        </div>
      </div>
      <div>
        <h1 className='large'>{name+' '+lastName}</h1>
        <p className='lead'>{status}</p>
        {emailPro && (
          <p>
            {" "}
            <MailOutlined /> {emailPro}
          </p>
        )}
        <p>
          {location && (
            <span className='loccation'>
              <FaMapMarkerAlt /> {location}
            </span>
          )}
        </p>
        <div>
          {" "}
          {user && _id !== user._id ? (
            <Link to={`/new_case/${_id}`}>
              <button
                className='primaryy ghost'
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                  border: "none",
                }}
              >
                <BsEnvelope style={{ fontSize: "20", color: "white" }} />
                &nbsp; Send Request
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object,
};

export default ProfileTop;
