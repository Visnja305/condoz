import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { useHistory } from "react-router-dom";
import commentIcon from ".././logos/send-comment.png";
import { editCommentThunk } from "../../store/comments";
import "./EditCommentModal.css";



function EditCommentModal({props}) {
    const { closeModal } = useModal();
    const dispatch=useDispatch();
    const comment=props;
    const [content,setContent]=useState(comment.content);
    const [error,setError]=useState("")


const handleSubmit =async(e) => {
    e.preventDefault();

    if (content.startsWith(" ") || content===""){
        setError("Comment not valid/can not begin with empty space/field can not be empty")
            }
else{
    setError("")


    const formData = new FormData();
    formData.append("content",content);




    await dispatch(editCommentThunk(formData,comment.id)).then(closeModal()).catch(
        async (res) => {

         console.log(res)

  })

}
  }



    return(<>
        <p>Update comment</p>
        <p>{error}</p>
        <form className="edit-comment-form" onSubmit={handleSubmit}>

            <input id="edit-comment-input"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}

                    />

                <button id="submit-for-edit-a-comment" type="submit" ><img src={commentIcon} style={{ width: "20px", height: "20px" }}/></button>




      </form>


</>
    )
}

export default EditCommentModal;
