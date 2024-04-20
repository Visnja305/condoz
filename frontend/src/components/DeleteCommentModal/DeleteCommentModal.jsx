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
    return(<div className="delete-comment-modal-base">
        <p>Delete comment?</p>
        <div>
        <button onClick={handleOnClick}>Yes</button>
        <button onClick={closeModal}>No</button>
        </div>
</div>
    )
}

export default DeleteCommentModal;
