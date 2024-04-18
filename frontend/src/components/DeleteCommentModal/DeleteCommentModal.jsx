import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk } from "../../store/comments";
import "./DeleteCommentModal.css";
/* eslint-disable react/prop-types */



function DeleteCommentModal({props}) {
    const { closeModal } = useModal();
    const dispatch=useDispatch();
    console.log(props)
    const commentId=props
    const handleOnClick = async(e)=>{

        e.preventDefault();

        await dispatch(deleteCommentThunk(commentId)).then(closeModal());




    }
    return(<>
        <p>Delete comment?</p>
        <button onClick={handleOnClick}>Yes</button>
        <button onClick={closeModal}>No</button>
</>
    )
}

export default DeleteCommentModal;
