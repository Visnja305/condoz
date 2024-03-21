
// constants
const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
// const EDIT_COMMENT = 'EDIT_COMMENT';
// const DELETE_COMMENT = 'DELETE_COMMENT';


// ACTIONS
const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
  }
}

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
 }

// const editComment = (comment) => {
//   return {
//     type: EDIT_COMMENT,
//     comment
//   }
// }

// const deleteComment = (id) => {
//   return {
//     type: DELETE_COMMENT,
//     id
//   }
// }


// THUNKS
export const getCommentsThunk = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${eventId}`);
  const data = await res.json();
  dispatch(getComments(data))

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

// export const editCommentThunk=(formData,trackId,commentId)=>async(dispatch)=>{

//   const res =await fetch(`/api/tracks/${trackId}/comments/${commentId}`, {
//     method: "PUT",

//     body: formData,
// })

// if(res.ok){



//   const data = await res.json();



//   if(data.comment){
//   return data.comment[0]
//     }
//   dispatch(editComment(data))
//  return data
// }

// return res
// }
// export const deleteCommentThunk = (trackId,commentId) => async (dispatch) => {
//   const response=await fetch(`/api/tracks/${trackId}/comments/${commentId}`, {
//     method: "DELETE",

// });
// if (response.ok) {
//   const id = await response.json();

//   dispatch(deleteComment(id));
//   return "Comment removed";
// }
// return response

// }

// reducer
const comments = (state = {}, action) => {
  let new_state = {};
  switch (action.type) {
    case GET_COMMENTS:
      action.comments.map((comment) => new_state[comment.id] = comment)
      return new_state
    case ADD_COMMENT:

      return { ...state, [action.comment.id]: action.comment };
    //   case EDIT_COMMENT:

    //   return { ...state, [action.comment.id]: action.comment };
    // case DELETE_COMMENT:
    //   const newState = { ...state };
    //   delete newState[action.id];
    //   return newState;

    default:
      return state;
  }
}

export default comments;
