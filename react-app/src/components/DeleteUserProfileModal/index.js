import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {deleteUserProfileThunk} from "../../store/userProfiles"
import { useHistory } from "react-router-dom";
import { editUsersHasNoProfileThunk } from "../../store/session";
import "./DeleteUserProfileModal.css";




function DeleteUserProfileModal(props) {
    const { closeModal } = useModal();
    const history=useHistory()
    const dispatch=useDispatch();
    console.log(props)
    const profileId=props.props
    const handleOnClick = async(e)=>{

        e.preventDefault();
        await dispatch(editUsersHasNoProfileThunk())
        await dispatch(deleteUserProfileThunk(profileId)).then(closeModal()).then(history.push("/profile"));




    }
    return(<>
        <p>Are you sure you want to delete your profile?</p>
        <button onClick={handleOnClick}>Yes</button>
        <button onClick={closeModal}>No</button>
</>
    )
}

export default DeleteUserProfileModal;
