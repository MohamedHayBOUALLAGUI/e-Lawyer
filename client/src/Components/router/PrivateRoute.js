import React,{useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
import {useSelector,useDispatch } from "react-redux";
import { current } from "../../JS/actions/user";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("token");
  if (isAuth) {
    return <Route component={Component} {...rest} />;
  }
  return <Redirect to="/"/>;
};

export default PrivateRoute;

export const PrivateR = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token"))
   {dispatch(current())}
  }, []);
  const user = useSelector(state => state.userReducer.user);
  console.log('privateroute',user)
  
  const isAuth = localStorage.getItem("token");
  if(user===null){return null}
  else if (isAuth && user.isAdmin) {
    return <Route component={Component} {...rest} />
  }
  return <Redirect to="/" />;
};


