import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../JS/actions/profile';
import formatDate from '../../utils/formatDate';

const Experience = ({ experience }) => {
  const dispatch = useDispatch()
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2" style={{color:'gold'}}>Experience Credentials</h2>
      <div className='containerEduc'>
      <table className="table">
        <thead>
          <tr>
            <th>Lawyer office</th>
            <th className="hide-sm">Treated cases</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array,
  deleteExperience: PropTypes.func
};

export default Experience;
