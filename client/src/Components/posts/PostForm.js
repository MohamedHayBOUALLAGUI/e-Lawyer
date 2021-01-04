import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../JS/actions/post';
import './Posts.css';

const PostForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const userCurrent = useSelector(state => state.userReducer.user);

  return (
    <div>
      {!userCurrent ? null :
        !userCurrent.isLawyer ? null : (
          <div className='post-form'>
            <div className='bg-primary p'>
              <h3>Say Something...</h3>
            </div>
            <form
              className='form my-1'
              onSubmit={e => {
                e.preventDefault();
                dispatch(addPost({ text }));
                setText('');
              }}
            >
              <div className="form__group field">
                <textarea
                  name='text'
                  cols='30'
                  rows='5'
                  placeholder='Create a post'
                  value={text}
                  className="form__field"
                  onChange={e => setText(e.target.value)}
                  required
                />
              </div>
              <input type='submit' className='btn my-1' value='Submit' style={{
                background: 'linear-gradient(45deg, #ff6b6c,#ffc145, #ffc145, #ff6b6c)'
              }} />
            </form>
          </div>
        )}
    </div>

  )

};

PostForm.propTypes = {
  addPost: PropTypes.func
};

export default PostForm;
