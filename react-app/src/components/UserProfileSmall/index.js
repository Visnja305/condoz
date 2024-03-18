import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams, Redirect } from "react-router-dom";
import {getProfileThunk} from "../../store/userProfiles"



function UserProfileSmall(){
    const {userProfileId}=useParams();
    console.log(userProfileId)


    const dispatch = useDispatch();
    const [isLoaded,setIsLoaded]=useState(false);
    const userProfile=useSelector((state)=>state.userProfiles[userProfileId])






    useEffect(() => {

        const getUsers=async()=>{
            await dispatch(getProfileThunk(userProfileId));
            setIsLoaded(true);

        }
        getUsers();






    },[isLoaded])













    return (<div>pikilii</div>

    )
}

export default UserProfileSmall;

//  <div className="enter-building-profile" style={{backgroundImage:`url(${theCondo.main_image})`}}></div>

// if (sessionUser) {return <Redirect to={`/profile/${sessionUser.id}`} />}
