import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,GET_SEARCHED_LAWYERS,GET_LAWYERS_BY_SPECIALTY,GET_LAW_BY_SPECIALTY_NAME
} from '../const/post';

// Get posts
export const getPosts = () => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get('/post',options);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};


// Add like
export const addLike = (id) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.put(`/post/like/${id}`, "", options);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.put(`/post/dislike/${id}`, "", options);

    dispatch({
      type: UPDATE_DISLIKES,
      payload: { id, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};


// Delete post
export const deletePost = id => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete(`/post/${id}`,options);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post('/post', formData,options);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`/post/${id}`,options);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(`/post/comment/${postId}`, formData,options);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete(`/post/comment/${postId}/${commentId}`,options);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//search by lawyer name
export const getSearchedLawyers = (search) => async dispatch => {

  try {
    const res = await axios.get(`/post/lawyer/${search}`);

    dispatch({
      type: GET_SEARCHED_LAWYERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//search by lawyer specialty
export const getLawyersBySpecialty = (search) => async dispatch => {

  try {
    const res = await axios.get(`/post/lawyerSpecialty/${search}`);

    dispatch({
      type: GET_LAWYERS_BY_SPECIALTY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//search by lawyer specialty
export const getLawByNameSpecialty = (name,specialty) => async dispatch => {

  try {
    const res = await axios.get(`/post/lawyer/${name}/${specialty}`);

    dispatch({
      type: GET_LAW_BY_SPECIALTY_NAME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};
