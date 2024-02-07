import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import LoginFormPage from "../LoginFormPage";
import { authenticate } from "../../store/session";
import Navigation from "../Navigation";


function BuildingProfile(){
    const {buildingId}=useParams();

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
      <>

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
      </>
    );
}

export default BuildingProfile;
