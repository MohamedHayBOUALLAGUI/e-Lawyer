import React, { Fragment } from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";
import "./ProfileNew.css";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => (
  <div>
    <h3 className='text-dark'>{school}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);
ProfileEducation.propTypes = {
  education: PropTypes.object,
};

export default ProfileEducation;
