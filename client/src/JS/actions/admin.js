import {GET_USERS,
  CANCEL_LOADING ,
  LOAD_MORE ,
  DELETE_USER ,
  BAN_USER ,
  UNBAN_USER,LOADING_MORE_FAILED,CANCEL_INITLOADING,LOAD_MORE_USERS,ADD_ADMIN,REMOVE_ADMIN} from "../const/admin";

export const getUsers = (data) => {
  return {
    type: GET_USERS,
    payload: data,
  };
};

export const cancelLoading = () => {
  return {
    type: CANCEL_LOADING,
  };
};
export const cancelInitLoading = () => {
  return {
    type: CANCEL_INITLOADING,
  };
};

export const loadMoreInit = () => {
  return {
    type: LOAD_MORE,
  };
};

export const loadMoreUsers = (data) => {
  return {
    type: LOAD_MORE_USERS,
    payload: data,
  };
};

export const loadMoreFailed = () => {
  return {
    type: LOADING_MORE_FAILED,
  };
};

export const deleteUsers = (userId) => {
  return {
    type: DELETE_USER,
    payload: userId,
  };
};

export const banUsers = (userId) => {
  return {
    type: BAN_USER,
    payload: userId,
  };
};

export const unbanUsers = (userId) => {
  return {
    type: UNBAN_USER,
    payload: userId,
  };
};
//add/remove admin
export const addAdmin = (userId) => {
  return {
    type: ADD_ADMIN,
    payload: userId,
  };
};

export const removeAdmin = (userId) => {
  return {
    type: REMOVE_ADMIN,
    payload: userId,
  };
};