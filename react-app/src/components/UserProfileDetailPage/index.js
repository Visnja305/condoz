import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory,NavLink} from "react-router-dom";
import { getProfileThunk } from "../../store/userProfiles";
import { authenticate } from "../../store/session";

import "./UserProfileDetailPage.css"

const UserProfileDetailPage =()=>{
const theUserId=useParams()
const id=theUserId.id;
 console.log(id)
const dispatch=useDispatch()
const [userProfile,setUserProfile]=useState({});
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {

       const currentProfile= dispatch(getProfileThunk(id)).then(res=>setUserProfile(res)).catch(
        async (res) => {

         console.log(res)

  })




        }, [dispatch]);

console.log(userProfile)












    return(<>{sessionUser && sessionUser.has_profile==="yes" && <div><p>I'm online!!!!!!and i have a profile</p>


    </div>  }{sessionUser && sessionUser.has_profile==="no" && <div><p>I still dont have a profile</p></div>}{!sessionUser && <div><p>I'm not logged in</p></div>}</>)









}

export default UserProfileDetailPage;
