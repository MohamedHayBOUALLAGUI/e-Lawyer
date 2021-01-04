import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser, registerLawyer } from "../../JS/actions/user";
import { setAlert } from "../../JS/actions/alert";

import "./Signup.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [lawyerSpecialty, setLawyerSpecialty] = useState("Criminal Lawyer");

  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
          />
          <label htmlFor="tab-1" className="tab">
            Register Lawyer
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
            Register Client
          </label>
          {/* Register Client */}
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>{" "}
              <div className="group">
                <label htmlFor="lastName" className="label">
                  lastName
                </label>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <select name="Specialty" className="specialty" onChange={(e) => setLawyerSpecialty(e.target.value)}>
                  <option>* Select Your Law Specialty</option>
                  <option value="Foreigners Lawyer">Foreigners Lawyer</option>
                  <option value="Insurance Lawyer">Insurance Lawyer</option>
                  <option value="Accountant & tax Lawyer">Accountant & tax Lawyer</option>
                  <option value="Criminal Lawyer">Criminal Lawyer</option>
                  <option value="Civil & Family Lawyer">Civil & Family Lawyer</option>
                  <option value="Employment Lawyer">Employment Lawyer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Email Address
                </label>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="group btnReg">
                <input
                  type="submit"
                  className="button"
                  value="CREATE A NEW ACCOUNT"
                  onClick={() => {
                    if (password !== password2) {
                      dispatch(setAlert('Passwords do not match', 'danger'));
                    } else {
                      dispatch(
                        registerLawyer({ name, lastName, email, password, lawyerSpecialty }, history)
                      )
                    }
                  }}
                />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="/login">Already Member?</a>
              </div>
            </div>
            {/* sign up part */}
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="lastName" className="label">
                  last Name
                </label>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Email Address
                </label>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="group btnReg">
                <input
                  type="submit"
                  className="button"
                  value="CREATE A NEW ACCOUNT"
                  onClick={() => {
                    if (password !== password2) {
                      dispatch(setAlert('Passwords do not match', 'danger'));
                    } else {
                      dispatch(
                        registerUser({ name, lastName, email, password }, history)
                      )
                    }
                  }
                  }
                />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="/login">Already Member?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
