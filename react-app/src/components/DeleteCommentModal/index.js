import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { useHistory } from "react-router-dom";
import { deleteEventThunk } from "../../store/events";
import "./DeleteCommentModal.css";




function DeleteCommentModal({props}) {
    const { closeModal } = useModal();
    const history=useHistory()
    const dispatch=useDispatch();
    console.log(props)
    const eventId=props
    const handleOnClick = async(e)=>{

        e.preventDefault();

        await dispatch(deleteEventThunk(eventId)).then(closeModal());




    }
    return(<>
        <p>Are you sure you want to delete your event?</p>
        <button onClick={handleOnClick}>Yes</button>
        <button onClick={closeModal}>No</button>
</>
    )
}

export default DeleteCommentModal;
