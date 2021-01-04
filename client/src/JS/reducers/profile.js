import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
  } from '../const/profile';
  
  const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
    isAuth:false
  };
  
    export const profileReducer = (state = initialState, { type, payload }) => {
  
    switch (type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false,
          isAuth: true,
        };
      case GET_PROFILES:
        return {
          ...state,
          profiles: payload,
          loading: false,
          isAuth: true,
        };
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          profile: null
        };
      case CLEAR_PROFILE:
        return {
          ...state,
          profile: null,
          repos: []
        };
      default:
        return state;
    }
  }