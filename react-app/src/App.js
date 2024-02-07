import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage"
import BuildingProfile from "./components/BuildingProfile";


function App() {


  return (
    <>

    <div>
      <Switch>
      <Route exact path="/">
<HomePage />
          </Route>
      <Route path="/condos/:condoId(\d+)">
<BuildingProfile />
          </Route>
      </Switch>
    </div>
   </>
   )
}

export default App;
