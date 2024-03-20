// constants
const CREATE_USER_PROFILE = "userProfile/CREATE_PROFILE";
const GET_PROFILE="userProfile/GET_PROFILE"
const DELETE_PROFILE="userProfile/DELETE_PROFILE"
const EDIT_PROFILE="editProfile/EDIT_PROFILE"

const createProfile = (data) => ({
	type: CREATE_USER_PROFILE,
	data
});
const getProfile=(data)=>({
    type:GET_PROFILE,
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
console.log(data)

		dispatch(getProfile(data));
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
      return "Comment removed";
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



const userProfiles=(state = {}, action)=> {

	switch (action.type) {
		case CREATE_USER_PROFILE:

            return {...state,[action.data.user_id]:action.data}
        case GET_PROFILE:
            console.log(state,action.data)
            return {...state,[action.data.user_id]:action.data}
        case DELETE_PROFILE:
                const newState = { ...state };
                delete newState[action.id];
                return newState;
        case EDIT_PROFILE:
            return {...state,[action.data.user_id]:action.data}


		default:
			return state;
	}
}


export default userProfiles
