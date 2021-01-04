import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../JS/actions/post';
import { current } from '../../JS/actions/user';
import FilterByname from '../FilterPost/FilterByname';



const Posts = () => {
  const posts = useSelector(state => state.postReducer.posts);
  const loading = useSelector(state => state.postReducer.loading);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
    dispatch(getPosts());
  }, [getPosts, current]);

  return loading ? <Spinner /> : posts === null ? (<h1>there is no posts </h1>) : (
    <Fragment>
      <div className="containerHead">
        <div className="row">
          <div className="neons col-12">
            <h1><em>Posts</em></h1>
          </div>
        </div>
      </div>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <FilterByname/>
      {loading ? null : <PostForm />}
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func,
  post: PropTypes.object
};


export default Posts;
