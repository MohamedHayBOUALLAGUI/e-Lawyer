import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";

const ProfileExperience = ({
  experience: { company, title, location, to, from, description },
}) => (
  <div style={{ backgroundColor: "white" }}>
    <h3 className='text-dark'>{company}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </p>
    <p>
      <strong>Treated cases: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object,
};

export default ProfileExperience;
