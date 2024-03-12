import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory,NavLink } from "react-router-dom";
import "./UserProfilePage.css"
import OpenModalButton from "../OpenModalButton";
import CreateUserProfileModal from "../CreateUserProfileModal";
const UserProfilePage =()=>{
    const sessionUser = useSelector((state) => state.session.user);

    if(!sessionUser){return <Redirect to="/" />}





    return(<>{sessionUser && <div>{sessionUser.has_profile==="no" &&
<OpenModalButton buttonText="Create a profile"
                    modalComponent={<CreateUserProfileModal  />}
                  />

    }{sessionUser.has_profile==="yes" && <div>
<NavLink activeClassName="user-profile-link-active"
            className="user-profile-link"
            exact to={`/my-profile/${sessionUser.id}`}
             >Profile</NavLink>


    </div>}</div>  }</>)
}

export default UserProfilePage;

{/* <NavLink activeClassName="user-profile-link-active"
            className="user-profile-link"
            exact to="/my-profile"
             >Profile</NavLink> */}
