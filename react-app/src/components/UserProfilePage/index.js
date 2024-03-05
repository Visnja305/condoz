import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import "./UserProfilePage.css"
const UserProfilePage =()=>{
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser){console.log(sessionUser)}
console.log(sessionUser)




    return(<>{sessionUser ? <p>hello</p> : <p>no user</p>}</>)
}

export default UserProfilePage;
