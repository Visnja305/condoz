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


function BuildingProfile(){
    const {condoId}=useParams();

    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const condos = Object.values(useSelector((state) => state.condos));

    const theCondo=condos.filter((condo)=>Number(condo.id)===Number(condoId))[0]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);





    useEffect(() => {
      dispatch(getCondosThunk()).then(dispatch(authenticate())).then(() => setIsLoaded(true));
    }, [dispatch]);
    if (sessionUser) return <Redirect to="/" />;
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    };


    return (
<>
     {theCondo && isLoaded && ( <div className="enter-building-profile" >
     <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>


      </div>
    )

    }
</>
    )
}

export default BuildingProfile;

//  <div className="enter-building-profile" style={{backgroundImage:`url(${theCondo.main_image})`}}></div>
