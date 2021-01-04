import {
  LOAD_USER,
  REGISTER_USER,
  LOGIN_USER,
  FAIL_USER,
  LOGOUT_USER,
  CURRENT_USER,
} from "../const/user";

import axios from "axios";
import {setAlert} from './alert'

export const registerUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/user/register", user);
    //{user,msg,token}
    // localStorage.setItem("token",result.data.token)
    dispatch({ type: REGISTER_USER, payload: result.data });
    history.push("/dashboard");
  } catch (error) {
    const { errors,msg } = error.response.data;
    console.log(errors)
    if (Array.isArray(errors)) {
      errors.map(err=>dispatch(setAlert(err.msg, 'danger')))
      //errors.forEach((err) => alert(err.msg));
  }
  if (msg) {
    dispatch(setAlert(msg, 'danger'))    }
}
    // dispatch({ type: FAIL_USER, payload: error.response.data });
  
};
//Register lawyer

export const registerLawyer = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/lawyer/register", user);
    //{user,msg,token}
    // localStorage.setItem("token",result.data.token)
    dispatch({ type: REGISTER_USER, payload: result.data });
    history.push("/dashboard");
  } catch (error) {
    const { errors,msg } = error.response.data;
    console.log(errors)
    if (Array.isArray(errors)) {
      errors.map(err=>dispatch(setAlert(err.msg, 'danger')))
      //errors.forEach((err) => alert(err.msg));
  }
  if (msg) {
    dispatch(setAlert(msg, 'danger'))    }
}
    // dispatch({ type: FAIL_USER, payload: error.response.data });
  
};




//Login User/Lawyer
export const loginUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/login", user);
    console.log(result);
  
    //{user,msg,token}
    
if (result.data.user.isClient){
    dispatch({ type: LOGIN_USER, payload: result.data });
    history.push("/dashboard");}
if (result.data.user.isLawyer){
    //{user,msg,token}
    dispatch({ type: LOGIN_USER, payload: result.data });
    history.push("/dashboard");}
  } catch (error) {
    const { errors, msg } = await error.response.data;
    
    if (Array.isArray(errors)) {
    errors.map(err=>dispatch(setAlert(err.msg, 'danger')))

    }
    if (msg) {
      dispatch(setAlert(msg, 'danger'))    }
  }
};

export const current = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    let result = await axios.get("/current", options)
    //  user
    dispatch({ type: CURRENT_USER, payload: result.data.user })
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};