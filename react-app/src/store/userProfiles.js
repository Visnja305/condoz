// constants
const CREATE_USER_PROFILE = "userProfile/CREATE_PROFILE";
const GET_PROFILE="userProfile/GET_PROFILE"
const GET_ALL_PROFILES="userProfile/GET_ALL_PROFILES"
const DELETE_PROFILE="userProfile/DELETE_PROFILE"
const EDIT_PROFILE="userProfile/EDIT_PROFILE"
const ADD_NOTIFICATION="userProfile/ADD_NOTIFICATION"

const createProfile = (data) => ({
	type: CREATE_USER_PROFILE,
	data
});
const getProfile=(data)=>({
    type:GET_PROFILE,
    data
})

const getProfiles=(data)=>({
    type:GET_ALL_PROFILES,
    data
})

const deleteProfile=(id)=>({
    type:DELETE_PROFILE,
    id
})

const editProfile=(data)=>({
    type:EDIT_PROFILE,
    data

})
const addNotification = (data,profileId) => {
    return {
      type: ADD_NOTIFICATION,
      data,profileId
    }
   }

export const createUserProfileThunk = (formData) => async (dispatch) => {
	const response = await fetch("/api/profiles/", {
        method: "POST",

        body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(createProfile(data));
        return data
	}
    const errorData = response.json();

    return errorData

};
export const getProfileThunk=(id)=>async (dispatch)=>{
    const response = await fetch(`/api/profiles/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();


		dispatch(getProfile(data));
        return data
	}
return response
}
export const getProfilesThunk=()=>async (dispatch)=>{
    const response = await fetch(`/api/profiles/all`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();


		dispatch(getProfiles(data));
        return data
	}
return response
}


export const deleteUserProfileThunk=(profileId)=>async(dispatch)=>{
    const response=await fetch(`/api/profiles/delete/${profileId}`, {
        method: "DELETE",

    });
    if (response.ok) {
      const id = await response.json();

      dispatch(deleteProfile(id));
      return "Profile removed";
    }
    return response

    }

    export const editUserProfileThunk = (formData,profileId) => async (dispatch) => {
        const response = await fetch(`/api/profiles/edit/${profileId}`, {
            method: "PUT",

            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(editProfile(data));
            return data
        }
        const errorData = response.json();

        return errorData

    };

    export const addChatNotificationThunk = (room,id) => async (dispatch) => {
        const response = await fetch(`/api/profiles/add-notification/${room}/${id}`, {

            method: "PUT",

        });
        if (response.ok) {
            const data = await response.json();
            dispatch(editProfile(data));
            return data
        }
        const errorData = response.json();

        return errorData

    };



const userProfiles=(state = {}, action)=> {
    let new_state={}

	switch (action.type) {
		case CREATE_USER_PROFILE:

            return {...state,[action.data.user_id]:action.data}
        case GET_PROFILE:
           return {...state,[action.data.user_id]:action.data}
        case GET_ALL_PROFILES:
                action.data.map((profile) => new_state[profile.user_id] = profile)
                return new_state

        case DELETE_PROFILE:
                const newState = { ...state };
                delete newState[action.id];
                return newState;
        case EDIT_PROFILE:
            new_state[action.data.user_id]=action.data
            return new_state
            // return {...state,[action.data.user_id]:action.data}


		default:
			return state;
	}
}


export default userProfiles
