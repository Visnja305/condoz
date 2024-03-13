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














    return(<>{sessionUser && sessionUser.has_profile==="yes" && <div>
        <img src={userProfile.profile_img} />
        <p>{sessionUser.first_name} {sessionUser.last_name}</p>
        <p>Age: {userProfile.age}</p>
        <p>Education: {userProfile.education}</p>
        <p>Work: {userProfile.work}</p>
        <p>Hometown: {userProfile.hometown}</p>
        <p>Interests: <ul>{Object.keys(userProfile).map((a)=>{
return userProfile[a]===true && <li></li>

})}
        </ul>
        </p>



    </div>  }{sessionUser && sessionUser.has_profile==="no" && <div><p>I still dont have a profile</p></div>}{!sessionUser && <div><p>I'm not logged in</p></div>}</>)









}

export default UserProfileDetailPage;

/* <ul>
    {
      Object.keys(userProfile).map((oneKey,i)=>{
        return (
            <li key={i}>{oneKey}:{userProfile[oneKey]}</li>
          )
      })
    }

  </ul> */
