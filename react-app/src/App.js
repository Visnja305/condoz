import React from "react";
import { Route, Switch, useLocation} from "react-router-dom";
import HomePage from "./components/HomePage"
import BuildingProfile from "./components/BuildingProfile";
import AnimatePresence from "framer-motion/dist/framer-motion"
import SignupFormPage from "./components/SignupFormPage";


function App() {



  return (


<>


      <Switch >
      <Route exact path="/">
<HomePage />
          </Route>
          <Route exact path="/:condoId(\d+)/signup">
            <SignupFormPage />
          </Route>
      <Route path="/condos/:condoId(\d+)">
<BuildingProfile />
          </Route>

      </Switch>

</>
   )
}

export default App;
