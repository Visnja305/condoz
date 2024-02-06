import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage"
import BuildingProfile from "./components/BuildingProfile";


function App() {


  return (
    <>
    <HomePage />
    <div>
      <Switch>
      <Route path="/condos/:condoId(\d+)">
<BuildingProfile />
          </Route>
      </Switch>
    </div>
   </>
   )
}

export default App;
