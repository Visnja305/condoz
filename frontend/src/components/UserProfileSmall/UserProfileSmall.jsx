import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getProfileThunk} from "../../store/userProfiles";
import {getUsersThunk} from "../../store/users";
import "./UserProfileSmall.css"




function UserProfileSmall({userId}){


    const dispatch = useDispatch();
    const [isLoaded,setIsLoaded]=useState(false);
    const userProfile=useSelector((state)=>state.userProfiles[userId])
    const user=useSelector((state)=>state.users[userId])







    useEffect(() => {

        const getUsers=async()=>{
            await dispatch(getUsersThunk())
            await dispatch(getProfileThunk(userId))
            setIsLoaded(true);

        }
        getUsers();






    },[isLoaded])













    return (<div><Link to={`/user-profile/${user?.id}`}><img id="user-profile-small-user-image" src={userProfile?.profile_img}/></Link>
<p>{user?.first_name} {user?.last_name}</p>

    </div>

    )
}

export default UserProfileSmall;

//  <div className="enter-building-profile" style={{backgroundImage:`url(${theCondo.main_image})`}}></div>

// if (sessionUser) {return <Redirect to={`/profile/${sessionUser.id}`} />}
