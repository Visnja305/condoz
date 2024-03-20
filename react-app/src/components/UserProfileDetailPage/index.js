import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory,NavLink} from "react-router-dom";
import { getProfileThunk } from "../../store/userProfiles";
import { authenticate } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import DeleteUserProfileModal from "../DeleteUserProfileModal";
import EditUserProfileModal from "../EditUserProfileModal";

import "./UserProfileDetailPage.css"

const UserProfileDetailPage =()=>{
const {id}=useParams()


const dispatch=useDispatch()
const sessionUser = useSelector((state) => state.session.user);
const userProfile=useSelector((state)=>state.userProfiles[id]);
// const [userProfile,setUserProfile]=useState({});
const [isLoaded,setIsLoaded]=useState(false)
console.log(id)
console.log(sessionUser.id)

    useEffect(() => {

        const getData=async()=>{
            await dispatch(getProfileThunk(id));
            setIsLoaded(true);

        }
        getData();






    },[isLoaded])






if(sessionUser===null && !isLoaded ){
  return  <h1>Loading...</h1>
}
else{


    const payload={
        profileId:userProfile?.id,
        userId:userProfile?.user_id,
    }

 return(
 <>{isLoaded &&

  <div className="container-user-profile-detail-page">
        <div className="user-profile-detail-information"><img id="profile-image-on-profile-detail-page"src={userProfile?.profile_img} />
        <p>{sessionUser?.first_name} {sessionUser?.last_name}</p>
        <p>Age: {userProfile?.age}</p>
        <p>Education: {userProfile?.education}</p>
        <p>Work: {userProfile?.work}</p>
        <p>Hometown: {userProfile?.hometown}</p>
        <p>Interests: <ul>{Object.keys(userProfile).map((a)=>(
 userProfile[a]===true && <li key={a}>{a}</li>

))}
        </ul>
        </p>


</div>
{Number(id)===sessionUser.id && <div className="user-profile-detail-page-delete-and-edit">
<OpenModalButton buttonText="Delete profile"
                    modalComponent={<DeleteUserProfileModal props={userProfile.id} />}
                  />
<OpenModalButton buttonText="Edit profile"
                    modalComponent={<EditUserProfileModal props={
                        payload
                    }/>}
                  />
                  </div>}
    </div>  }</>)

        }







}

export default UserProfileDetailPage;

/* /* <ul>
    {
      Object.keys(userProfile).map((oneKey,i)=>{
        return (
            <li key={i}>{oneKey}:{userProfile[oneKey]}</li>
          )
      })
    }

  </ul> */
