// constants
const CREATE_USER_PROFILE = "userProfile/CREATE_PROFILE";


const createProfile = (data) => ({
	type: CREATE_USER_PROFILE,
	data
});




export const createUserProfileThunk = (formData) => async (dispatch) => {
	const response = await fetch("/api/profiles", {
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



const userProfiles=(state = {}, action)=> {
    let new_state={}
	switch (action.type) {
		case CREATE_USER_PROFILE:

            return {...state,[action.data.id]:action.data}

		default:
			return state;
	}
}

export default userProfiles
