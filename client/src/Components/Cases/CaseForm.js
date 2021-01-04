import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addCase } from '../../JS/actions/case';
import Spinner from '../layout/Spinner';
import { useHistory } from 'react-router-dom';

const CaseForm = ({ match }) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const history = useHistory()

  return (
    <div style={{minHeight:'100vh'}}>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            dispatch(addCase({ description }, match.params.id));
            history.push('/dashboard')
            setDescription('');
          }}
        >
          <div className="form__group field">
            <textarea
              name='text'
              cols='30'
              rows='5'
              placeholder='Create a case'
              className="form__field"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <input type='submit' className='btn my-1' value='Send case' style={{
                background: 'linear-gradient(45deg, #ff6b6c,#ffc145, #ffc145, #ff6b6c)'
              }}/>
        </form>
      </div>
    </div>

  )


};


CaseForm.propTypes = {
  addCase: PropTypes.func
};

export default CaseForm;
