import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../JS/actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name,lastName, img, user, date },
}) => {
  const userCurrent = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()

  return (
    <div className="rootComment">
      <article className="content">
        <div>
          {userCurrent.isLawyer ?
            <Link to={`/profile/${user}`}>
              <div className="profile-img" style={{
                background: `url(${img})`, backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <h5 style={{ position: 'absolute', top: '45px', left: '5px', color: '#ffc145',textTransform:'capitalize' }}>{name+' '+lastName}</h5>
            </Link> : <div>
              <div className="profile-img" style={{
                background: `url(${img})`, backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <h5 style={{ position: 'absolute', top: '45px', left: '5px', color: '#ffc145',textTransform:'capitalize' }}>{name+' '+lastName}</h5>
            </div>}
        </div>
        <p style={{overflowWrap:'break-word',marginTop:'10px'}}>{text}</p>
        {userCurrent ? (user === userCurrent._id || userCurrent.isAdmin === true) ? (
          <div className="socialComment">
            <button
              onClick={() => dispatch(deleteComment(postId, _id))}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        ) : null : null}
        <footer className='footerComment'>
          <p>Posted on</p><p>{formatDate(date)}</p></footer>
      </article>
      <div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.object,
  deleteComment: PropTypes.func
};



export default CommentItem;
