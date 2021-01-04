import axios from 'axios';
import {
GET_USER_CASES,
CASES_ERROR,GET_LAWYER_CASES,DELETE_CASE,ADD_CASE,ACCEPT_CASE
} from '../const/case';
import { setAlert } from './alert';
import {message } from "antd";


// Get user cases
export const getUserCases = () => async dispatch => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get(`case/user`,options);
  
      dispatch({
        type: GET_USER_CASES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CASES_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      });
    }
  };

  // Get lawyer cases
export const getLawyerCases = () => async dispatch => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get(`case/lawyer`,options);
  
      dispatch({
        type: GET_LAWYER_CASES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CASES_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      });
    }
  };

  //delete Case

  export const deleteCase = id => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res= await axios.delete(`/case/${id}`,options);
console.log(res)
    dispatch({
      type: DELETE_CASE,
      payload: id
    });

    dispatch(setAlert('Case Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Add case
export const addCase = (formData,id) => async dispatch => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(`/case/${id}`, formData,options);

    dispatch({
      type: ADD_CASE,
      payload: res.data
    });
    dispatch(setAlert('Case Created', 'success'));
    
  } catch (err) {
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};
//Accept case
export const acceptCase = (id)  => async dispatch => {
    try {
      const res = await axios.patch(`/case/accepted/${id}`,null, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      dispatch({
        type: ACCEPT_CASE,
        payload: id,
      })
      message.success(` Case accepted ! `);
      //
    } catch (err) {
      message.error("server error");
    }
  };
