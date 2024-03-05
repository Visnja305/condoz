import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams, Redirect } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import LoginFormPage from "../LoginFormPage";
import { authenticate } from "../../store/session";
import { getCondosThunk } from "../../store/condos";
import Navigation from "../Navigation";
import "./BuildingProfile.css"
import { login } from "../../store/session";
import validator from "validator";
import { useHistory } from "react-router-dom";
import UserProfilePage from "../UserProfilePage";


function BuildingProfile(){
    const {condoId}=useParams();
    let history=useHistory();

    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const condos = Object.values(useSelector((state) => state.condos));

    const theCondo=condos.filter((condo)=>Number(condo.id)===Number(condoId))[0]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");






    useEffect(() => {


      dispatch(getCondosThunk()).then(dispatch(authenticate())).then(() => setIsLoaded(true));
    }, [dispatch]);
    if (sessionUser) {return <Redirect to="/profile" />}


    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!validator.isEmail(email)) {
        setMessage("Please, enter valid Email!");
      }
      else{
        setMessage("");

      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    }
    };




    return (
<div className="building-profile-base">
     {theCondo && isLoaded && ( <div className="enter-building-profile" >
      <h2>{theCondo.name}</h2>
     <form onSubmit={handleSubmit} className="enter-building-profile-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <p>{message}</p>
        <div className="login-form-container">

          <input
            type="text"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            required
            id="email-login-input"
          />

          <label>
          Email
        </label>
</div>
<div className="login-form-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password-login-input"

          />

       <label>Password</label>
       </div>
        <button type="submit" id="login-button" disabled={email.length == 0 || password.length == 0}>Log In</button>
      </form>
      <span>Not a member?  <button id="signup-button-login-page" onClick={(e)=>history.push(`/${condoId}/signup`)}>Sign up</button></span>


      </div>
    )

    }
</div>
    )
}

export default BuildingProfile;

//  <div className="enter-building-profile" style={{backgroundImage:`url(${theCondo.main_image})`}}></div>

// if (sessionUser) {return <Redirect to={`/profile/${sessionUser.id}`} />}
