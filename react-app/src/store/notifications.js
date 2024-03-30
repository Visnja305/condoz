
// constants

const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
const ADD_NOTIFICATION='ADD_NOTIFICATION';



// ACTIONS


const getNotifications = (data,profileId) => {
  return {
    type: GET_NOTIFICATIONS,
    data,profileId
  }
 }
 const addNotification=(data,id)=>{

    return{
        type:ADD_NOTIFICATION,
        data,id

    }
 }




// THUNKS
//get all notifications for a current user
export const getAllNotificationsThunk = (profileId) => async (dispatch) => {
    const response = await fetch(`/api/notifications/all`, {
        headers: {
			"Content-Type": "application/json",
		},


    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getNotifications(data,profileId));
        return data
    }
    const errorData = response.json();

    return errorData

};
export const addChatNotificationThunk = (room,id) => async (dispatch) => {
    const response = await fetch(`/api/notifications/add-notification/${room}/${id}`, {

        headers: {
			"Content-Type": "application/json",
		},





    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addNotification(data,id));
        return data
    }
    const errorData = response.json();

    return errorData

};


// reducer
const notifications = (state = {}, action) => {
  let new_state = {};

  switch (action.type) {

    case GET_NOTIFICATIONS:
        
        new_state=JSON.parse(JSON.stringify(state))
      action.data.forEach((notification) => new_state[notification.chat_initiated_by]=notification.chat_room)

      return {...state,[action.profileId]:new_state}

      case ADD_NOTIFICATION:

        return { ...state };


    default:
      return state;
  }
}

export default notifications;
