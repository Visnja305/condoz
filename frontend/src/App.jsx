import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./components/HomePage"
import BuildingProfile from "./components/BuildingProfile";
import UserProfilePage from "./components/UserProfilePage";
import SignupFormPage from "./components/SignupFormPage";
import UserProfileDetailPage from "./components/UserProfileDetailPage"
import CreateEvent from "./components/CreateEvent"
import ManageEvents from "./components/ManageEvents"
import NavBar from "./components/NavBar";
import UsersLiveChat from "./components/UsersLiveChat";

import { authenticate } from "./store/session";



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    const getData=()=>{
  dispatch(authenticate());
   setIsLoaded(true);}
    getData();
  }, [dispatch]);



  return (


<>
      <NavBar isLoaded={isLoaded} />

      {isLoaded && <Outlet />}

</>
   )
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/my-profile/create-event", element: <CreateEvent /> },
      { path: "/user-profile/:id", element: <UserProfileDetailPage /> },
      { path: "/condos/:condoId", element: <BuildingProfile/> },
      { path: "/profile" , element: <UserProfilePage /> },
      { path: "/:condoId/signup", element: <SignupFormPage /> },
      { path: "/live-chat", element: <UsersLiveChat /> },
      { path: "/user-profile/manage-events", element: <ManageEvents /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;





// import React, { useState, useEffect } from "react";
// import { Route, Switch, useLocation} from "react-router-dom";
// import { useDispatch,useSelector } from "react-redux";
// import HomePage from "./components/HomePage"
// import BuildingProfile from "./components/BuildingProfile";
// import UserProfilePage from "./components/UserProfilePage";
// import SignupFormPage from "./components/SignupFormPage";
// import UserProfileDetailPage from "./components/UserProfileDetailPage"
// import CreateEvent from "./components/CreateEvent"
// import ManageEvents from "./components/ManageEvents"
// import NavBar from "./components/NavBar";
// import UsersLiveChat from "./components/UsersLiveChat";

// import { authenticate } from "./store/session";



// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const sessionUser = useSelector((state) => state.session.user);
//   useEffect(() => {
//     dispatch(authenticate()).then(() => setIsLoaded(true));
//   }, [dispatch]);



//   return (


// <>
//       <NavBar isLoaded={isLoaded} />

//       <Switch >
//       <Route exact path="/">
// <HomePage />
//           </Route>
//           {sessionUser &&
//           <Route exact path="/my-profile/create-event">
//             <CreateEvent />
//           </Route>}
//         {sessionUser &&  <Route exact path="/user-profile/:id(\d+)" >
// <UserProfileDetailPage />

//           </Route>}
//       <Route exact path="/condos/:condoId(\d+)">
// <BuildingProfile />
//           </Route>
// {sessionUser &&
//           <Route exact path="/profile" >
// <UserProfilePage />

//           </Route>}

//           <Route exact path="/:condoId(\d+)/signup">
//             <SignupFormPage />
//             </Route>
//             {sessionUser &&
//             <Route exact path="/user-profile/manage-events">
//             <ManageEvents />
//             </Route>

// }
// <Route exact path="/live-chat">
//             <UsersLiveChat />
//             </Route>



//       </Switch>

// </>
//    )
// }

// export default App;
