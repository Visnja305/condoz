import React from "react";
import { Route, Switch, useLocation} from "react-router-dom";
import HomePage from "./components/HomePage"
import BuildingProfile from "./components/BuildingProfile";
import UserProfilePage from "./components/UserProfilePage";
import SignupFormPage from "./components/SignupFormPage";
import UserProfileDetailPage from "./components/UserProfileDetailPage"
import CreateEvent from "./components/CreateEvent"

function App() {



  return (


<>


      <Switch >
      <Route exact path="/">
<HomePage />
          </Route>
          <Route exact path="/my-profile/create-event">
            <CreateEvent />
          </Route>
          <Route exact path="/user-profile/:id(\d+)" >
<UserProfileDetailPage />

          </Route>
      <Route exact path="/condos/:condoId(\d+)">
<BuildingProfile />
          </Route>
          <Route exact path="/profile" >
<UserProfilePage />

          </Route>

          <Route exact path="/:condoId(\d+)/signup">
            <SignupFormPage />
            </Route>

      </Switch>

</>
   )
}

export default App;
