import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory } from "react-router-dom";
import "./UserProfilePage.css"
import OpenModalButton from "../OpenModalButton";
import CreateUserProfileModal from "../CreateUserProfileModal";
const UserProfilePage =()=>{
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser){console.log(sessionUser)}
    if(!sessionUser){return <Redirect to="/" />}





    return(<>{sessionUser && <div>{sessionUser.has_profile==="no" &&
<OpenModalButton buttonText="Create a profile"
                    modalComponent={<CreateUserProfileModal  />}
                  />

    }</div>  }</>)
}

export default UserProfilePage;
