import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import { getProfileThunk } from "../../store/userProfiles";
import { getUserThunk } from "../../store/users";
import OpenModalButton from "../OpenModalButton";
import DeleteUserProfileModal from "../DeleteUserProfileModal";
import EditUserProfileModal from "../EditUserProfileModal";
import onlineUser from "../logos/online.png"
import offlineUser from "../logos/offline.png"

import "./UserProfileDetailPage.css"

const UserProfileDetailPage =()=>{
const {id}=useParams()


const dispatch=useDispatch()
const sessionUser = useSelector((state) => state.session.user);
const user=useSelector((state) => state.users[id]);
const userProfile=useSelector((state)=>state.userProfiles[id]);
// const [userProfile,setUserProfile]=useState({});
const [isLoaded,setIsLoaded]=useState(false)


    useEffect(() => {

        const getData=async()=>{
            await dispatch(getProfileThunk(id));
            await dispatch(getUserThunk(id))
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
        <p>{user?.first_name} {user?.last_name} {user.is_online ? <img src={onlineUser} id="online-offline-user-icon" /> : <span><img src={offlineUser} id="online-offline-user-icon"/>offline</span>}</p>
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
{Number(id)===sessionUser?.id && <div className="user-profile-detail-page-delete-and-edit">
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
