// constants
const CREATE_USER_PROFILE = "userProfile/CREATE_PROFILE";
const GET_PROFILE="userProfile/GET_PROFILE"

const createProfile = (data) => ({
	type: CREATE_USER_PROFILE,
	data
});
const getProfile=(data)=>({
    type:GET_PROFILE,
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


const userProfiles=(state = {}, action)=> {

	switch (action.type) {
		case CREATE_USER_PROFILE:

            return {...state,[action.data.user_id]:action.data}
        case GET_PROFILE:
            return {...state,[action.data.user_id]:action.data}

		default:
			return state;
	}
}


export default userProfiles
