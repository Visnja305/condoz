import React from "react";
import { Route, Switch, useLocation} from "react-router-dom";
import HomePage from "./components/HomePage"
import BuildingProfile from "./components/BuildingProfile";
import AnimatePresence from "framer-motion/dist/framer-motion"


function App() {



  return (


<>


      <Switch >
      <Route exact path="/">
<HomePage />
          </Route>
      <Route path="/condos/:condoId(\d+)">
<BuildingProfile />
          </Route>
      </Switch>

</>
   )
}

export default App;
