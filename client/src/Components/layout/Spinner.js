import React, { Fragment } from 'react';
import './Spinner.css';

function Spinner() {
  return (
        <div className='bodySpinner'>
  <div className="loader">
  <div className="face">
    <div className="circle"></div>
  </div>
  <div className="face">
    <div className="circle"></div>
  </div>
</div>
  </div>
  )
}

export default Spinner;

