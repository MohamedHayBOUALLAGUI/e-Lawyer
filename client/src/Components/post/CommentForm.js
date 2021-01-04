import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addComment } from '../../JS/actions/post';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          dispatch(addComment(postId, { text }));
          setText('');
        }}
      >
        <div className="form__group field">
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment the post'
            className="form__field"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <input type='submit' className='btn my-1' value='Submit' style={{
          background: 'linear-gradient(45deg, #ff6b6c,#ffc145, #ffc145, #ff6b6c)'
        }} />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func
};

export default CommentForm;
