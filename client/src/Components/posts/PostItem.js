import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike, deletePost, getPosts } from '../../JS/actions/post';
import { AiFillDelete } from 'react-icons/ai'
import './Posts.css';

const PostItem = ({
  post: { _id, text, name, lastName, lawyerSpecialty, img, user, likes,dislikes, comments, date },
  showActions
}) => {

  const isAuth = localStorage.getItem("token");
  const userCurrent = useSelector(state => state.userReducer.user);

  const dispatch = useDispatch();

  return (

    <div className="containerPos"  >
      <Link to={`/profile/${user}`}>
        <div className="profile-img" style={{
          background: `url(${img})`, backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <h1 style={{ textTransform: 'capitalize' }}>{name + ' ' + lastName}</h1>
      </Link>
      <h4>{lawyerSpecialty}</h4>
      <div className="description">
        <div id="ct" className='descCont'>
          <div className="corner " id="left_top" />
          <div className="corner" id="left_bottom" />
          <div className="corner" id="right_top" />
          <div className="corner" id="right_bottom" />
          <blockquote>
            <p><i style={{color:'black'}}>“{text}” </i></p>
          </blockquote>
        </div>
      </div>
      {isAuth ? showActions && (
        <div>
          <div>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
          </div>
          {user === userCurrent._id || userCurrent.isAdmin === true ? (
            <div className="social">
              <a>
                <span
                  onClick={() => dispatch(deletePost(_id))}
                  type="button"
                >
                  <AiFillDelete />
                </span>
              </a>
            </div>) : null}
        </div>) : null}
      <footer>
        {isAuth ? showActions && (
          <div className="likes">
            <p>  <span
                onClick={async () => {
                  await dispatch(addLike(_id));
                  dispatch(getPosts());
                }}
              type="button"
            >
              <i className="fas fa-thumbs-up" style={{cursor:'pointer'}} />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </span></p>
            <p> <span
                 onClick={async () => {
                  await dispatch(removeLike(_id));
                  dispatch(getPosts());
                }}
              type="button"
            >
              <i className="fas fa-thumbs-down"  style={{cursor:'pointer'}} />
              <span>
                    {dislikes.length > 0 && <span>{dislikes.length}</span>}
                  </span>
            </span></p>
          </div>) : null}
        <div className="projects">
          <p>Posted on </p>
          <p>{formatDate(date)}</p>
        </div>
      </footer>
    </div>


  );
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object,
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  deletePost: PropTypes.func,
  showActions: PropTypes.bool
};

export default PostItem;