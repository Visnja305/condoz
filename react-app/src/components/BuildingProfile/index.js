import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import LoginFormPage from "../LoginFormPage";
import { authenticate } from "../../store/session";
import { getCondosThunk } from "../../store/condos";
import Navigation from "../Navigation";
import "./BuildingProfile.css"



function BuildingProfile(){
    const {condoId}=useParams();

    const dispatch = useDispatch();
    const condos = Object.values(useSelector((state) => state.condos));

    const theCondo=condos.filter((condo)=>Number(condo.id)===Number(condoId))[0]



    console.log(theCondo)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      dispatch(getCondosThunk())
      dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
<>
     {theCondo && ( <div className="enter-building-profile" >

<p>Let's see if this is working or not, Testing, testing CONDOZ</p>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
      </div>
    )

    }
</>
    )
}

export default BuildingProfile;

//  <div className="enter-building-profile" style={{backgroundImage:`url(${theCondo.main_image})`}}></div>
