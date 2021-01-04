import React, { useEffect } from "react";
import Signup from "./Components/Signup/Signup";
import { Switch, Route, useHistory } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/router/PrivateRoute";
import { PrivateR } from "./Components/router/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { current, logout } from "./JS/actions/user";
import { message } from "antd";
import Home from "./Pages/Home";
import Login from './Components/Login/Login'
import Alert from './Components/Alert/Alert'
//////////////////////////
import ProfileForm from './Components/profile-forms/ProfileForm';
import AddExperience from './Components/profile-forms/AddExperience';
import AddEducation from './Components/profile-forms/AddEducation';
import Profiles from './Components/profiles/Profiles';
import Profile from './Components/profile/Profile';
import Posts from './Components/posts/Posts';
import Post from './Components/post/Post';
import AllUsers from './Components/AllUsers/AllUsers';
import Cases from './Components/Cases/Cases';
import CaseForm from './Components/Cases/CaseForm';
import NotFound from './Components/layout/NotFound';
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

/////////////////////////
function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user)
  useEffect(() => {
    if (localStorage.getItem("token")) { dispatch(current()) }
  }, []);
  const history = useHistory();
  useEffect(() => {
    if (user !== null) {
      if (user.isBan === true) {
        { dispatch(logout()) }
        history.push("/");
        message.error("your account get banned !Please contact admin ");
      }
    }
  }, [user]);

  return (
    <div className="App">
      <Navbar />
      <Alert />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <Route exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateR exact path="/all_users" component={AllUsers} />
        <PrivateRoute exact path="/cases" component={Cases} />
        <PrivateRoute exact path="/new_case/:id" component={CaseForm} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
