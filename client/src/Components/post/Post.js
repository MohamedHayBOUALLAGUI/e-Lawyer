import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../JS/actions/post';
import { current } from '../../JS/actions/user';

const Post = ({  match }) => {
  const post = useSelector(state => state.postReducer.post)
  const loading = useSelector(state => state.postReducer.loading)
  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(current())
  }, []);

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
      <CommentForm postId={post._id} />
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func,
  post: PropTypes.object
};

export default Post;
