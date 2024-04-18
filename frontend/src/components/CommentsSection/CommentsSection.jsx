import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CommentsSection.css"
import commentIcon from ".././logos/send-comment.png";
import editIcon from ".././logos/edit.png";
import deleteIcon from ".././logos/delete.png";
import { getCommentsThunk } from "../../store/comments";
import {getProfilesThunk} from "../../store/userProfiles";
import { postCommentThunk } from "../../store/comments";
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";
/* eslint-disable react/prop-types */

function CommentsSection({eventId}) {

  const dispatch = useDispatch();

  const eventComments = useSelector((state) => state.comments.currentEventComments[eventId])
  let fromMostRecentEventComments
  if(eventComments){
  fromMostRecentEventComments=eventComments.reverse();
  }
  const profiles=useSelector((state)=>state.userProfiles);
  const sessionUser=useSelector((state)=>state.session.user);


  const [comment, setComment] = useState("");
  const [error,setError]=useState("")

  const [isLoaded,setIsLoaded]=useState(false)

  useEffect(() => {

    const getInfo=async()=>{
        await dispatch(getCommentsThunk(eventId));
        await dispatch(getProfilesThunk());



        setIsLoaded(true);

    }
    getInfo();
},[isLoaded])





  const handleSubmit = async(e) => {
    e.preventDefault();
    if (comment.startsWith(" ")){
setError("Comment not valid/can not begin with empty space")
    }
    else{


setError("")
    const formData = new FormData();
    formData.append("content", comment);
    formData.append("author_id",sessionUser.id);
    formData.append("author_profile_id",sessionUser.profile_id);
    formData.append("event_id",eventId);

    await dispatch(postCommentThunk(formData))
    setComment("")


    }

  }



  return (
    <>

        <div className="comments-container">


          <form onSubmit={handleSubmit} className="comment-form">



              <div className="comment-input-field-field">
<p>{error}</p>
                <input id="input-comment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment"
                  required
                />

              </div>
              <div className="comment-input-field-button">
                <button id="submit-for-post-a-comment" type="submit" ><img src={commentIcon} style={{ width: "20px", height: "20px" }}/></button>
              </div>

          </form>
          <div className="view-all-comments-for-event">
          {fromMostRecentEventComments?.map(comment=>(
            <div id="comment" key={`${comment.id}-${new Date().getTime()}`}>


            <div><img src={profiles[comment.author_id]?.profile_img} id="profile-img-from-comment-author"/></div>

            <div>
            <p id="comment-author-name">{comment.author_first_name} {comment.author_last_name}</p>
            <p>{comment.content}</p>
            {comment.author_id=== sessionUser.id && (
                <span>
                  <OpenModalButton buttonText={<img alt="" id="logo2" src={editIcon} style={{ width: "20px", height: "20px", backgroundColor:"black",}} />}
                    modalComponent={<EditCommentModal props={comment} />}
                  />
                  <OpenModalButton  buttonText={<img alt="" id="logo2" src={deleteIcon} style={{ width: "20px", height: "20px" }} />}
                    modalComponent={<DeleteCommentModal props={comment.id } />}
                  />

                </span>)}
            </div>

            </div>





          ))}
          </div>
        </div>


    </>


  );
}

export default CommentsSection;

{/* <img src={profiles[getUsersProfile].profile_img}/> */}
