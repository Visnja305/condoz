import React, { useState,useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";


import { useParams, useHistory } from 'react-router-dom';
import "./CommentsSection.css"
import commentIcon from ".././logos/send-comment.png";
import { getCommentsThunk } from "../../store/comments";
import {getProfilesThunk} from "../../store/userProfiles";
import { postCommentThunk } from "../../store/comments";


function CommentsSection({eventId}) {

  const dispatch = useDispatch();
  const history = useHistory();
  const comments = Object.values(useSelector((state) => state.comments));
  const profiles=useSelector((state)=>state.userProfiles);
  const sessionUser=useSelector((state)=>state.session.user);
  const eventComments=comments.filter(comment=>comment.event_id==eventId)
  const fromMostRecentEventComments=eventComments.reverse();
  const [comment, setComment] = useState("");

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



    const formData = new FormData();
    formData.append("content", comment);
    formData.append("author_id",sessionUser.id);
    formData.append("author_profile_id",sessionUser.profile_id);
    formData.append("event_id",eventId);

    await dispatch(postCommentThunk(formData))
    setComment("")




  }



  return (
    <>

        <div className="comments-container">


          <form onSubmit={handleSubmit} className="comment-form">



              <div className="comment-input-field-field">

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
          {fromMostRecentEventComments.map(comment=>(
            <div id="comment">


            <div><img src={profiles[comment.author_id]?.profile_img} id="profile-img-from-comment-author"/></div>

            <div>
            <p id="comment-author-name">{comment.author_first_name} {comment.author_last_name}</p>
            <p>{comment.content}</p>
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
