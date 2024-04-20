import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteEventThunk } from "../../store/events";
import "./DeleteEventModal.css";
/* eslint-disable react/prop-types */



function DeleteEventModal({props}) {
    const { closeModal } = useModal();
    // const history=useHistory()
    const dispatch=useDispatch();
    console.log(props)
    const eventId=props
    const handleOnClick = async(e)=>{

        e.preventDefault();

        await dispatch(deleteEventThunk(eventId)).then(closeModal());




    }
    return(<div className="delete-event-modal-base">
        <p>Are you sure you want to delete your event?</p>
        <div className="delete-event-modal-buttons">
        <button onClick={handleOnClick}>Yes</button>
        <button onClick={closeModal}>No</button>
        </div>
</div>
    )
}

export default DeleteEventModal;
