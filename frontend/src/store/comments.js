
// constants
/* eslint-disable no-mixed-spaces-and-tabs */
const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';


// ACTIONS
const getComments = (comments,eventId) => {
  return {
    type: GET_COMMENTS,
    comments,eventId
  }
}

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
 }

const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id
  }
}


// THUNKS
export const getCommentsThunk = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${eventId}`);
  const data = await res.json();
  dispatch(getComments(data,eventId))

  return data
}
export const postCommentThunk=(formData)=>async(dispatch)=>{

  const res =await fetch(`/api/comments/new`, {
    method: "POST",

    body: formData,
})

if(res.ok){



  const data = await res.json();



  if(data.comment){
  return data.comment[0]
    }
  dispatch(addComment(data))
  return data
}

  const error = await res.json()
  console.log(error)
return error
}

export const editCommentThunk=(formData,commentId)=>async(dispatch)=>{

  const res =await fetch(`/api/comments/${commentId}`, {
    method: "PUT",

    body: formData,
})

if(res.ok){



  const comment = await res.json();



  if(comment.comment){
  return comment.comment[0]
    }
  dispatch(editComment(comment))
 return comment
}

return res
}
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response=await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",

});
if (response.ok) {
  const id = await response.json();

  dispatch(deleteComment(id));
  return "Comment removed";
}
return response

}
const initialState = {
  allComments: {},
  currentEventComments: {},

};

// reducer
const comments = (state = initialState, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_COMMENTS:
      const currentEventComments = action.comments.reduce(
        (acc, comment) => ({ ...acc, [comment.id]: comment}),
        {}
      );
      return {
        ...state,
        currentEventComments: { ...state.currentEventComments, ...currentEventComments },

      };

      // action.comments.map((comment) => new_state[comment.id] = comment)
      // return {...state,[action.eventId]:new_state}
    case ADD_COMMENT:
      const newComment=action.comment;
      return {
        ...state,
        allComments: { ...state.allComments, [newComment.id]: newComment },
        currentEventComments: { ...state.currentEventComments, [newComment.id]: newComment },
      };


      // return { ...state, [action.comment.id]: action.comment };
    case EDIT_COMMENT:
      const newComm=action.comment;
      return {
        ...state,
        allComments: { ...state.allComments, [newComm.id]: newComm },
        currentEventComments: { ...state.currentEventComments, [newComm.id]: newComm },
      };


      // return { ...state, [action.comment.id]: action.comment };
    case DELETE_COMMENT:
      const newAllComments = { ...state.allComments };
      delete newAllComments[action.id];
      const newCurrentEventComments = { ...state.currentEventComments };
      delete newCurrentEventComments[action.id];
      return {
        ...state,
        allComments: newAllComments,
        currentEventComments: newCurrentEventComments,
      };



      // const newState = { ...state };
      // delete newState[action.id];
      // return newState;

    default:
      return state;
  }
}

export default comments;


// const comments = (state = {}, action) => {
//   let new_state = {};
//   switch (action.type) {
//     case GET_COMMENTS:
//       action.comments.map((comment) => new_state[comment.id] = comment)
//       return new_state
//     case ADD_COMMENT:
//       return { ...state, [action.comment.id]: action.comment };
//     case EDIT_COMMENT:
//       return { ...state, [action.comment.id]: action.comment };
//     case DELETE_COMMENT:
//       const newState = { ...state };
//       delete newState[action.id];
//       return newState;

//     default:
//       return state;
//   }
// }
