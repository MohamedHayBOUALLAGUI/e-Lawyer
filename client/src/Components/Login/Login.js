import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../JS/actions/user";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    /*const handleKeyPress = (event) => {
         if(event.key === 'Enter'){
         dispatch(loginUser({ email, password }, history))
         }
     }*/
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }, history))

    }
    return (
        <div className="login-container text-c animated flipInX">
            <div>
                <h1 className="logo-badge text-whitesmoke"><span className="fa fa-user-circle" /></h1>
            </div>
            <h3 className="text-whitesmoke">Sign In</h3>
            <form className="container-content" onSubmit={onSubmit}>
                <div className="margin-t">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())} />
                    </div>
                    <div className="form-group">
                        <input type="password" data-type="password" className="form-control" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="form-button button-l margin-b" onClick={onSubmit}>Sign In</button >
                    <a className="text-darkyellow" href="/"><small>Forgot your password?</small></a>
                    <p className="text-whitesmoke text-center"><small>Do not have an account?</small></p>
                    <a className="text-darkyellow" href="/register"><small>Sign Up</small></a>
                </div>
                <p className="margin-t text-whitesmoke"><small> E-LAWYER © 2020</small> </p>
            </form>
        </div>

    )
}
export default Login
