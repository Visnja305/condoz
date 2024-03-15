// constants
const CREATE_EVENT = "events/CREATE_EVENT";

const createEvent = (data) => ({
	type: CREATE_EVENT,
	data
});


export const createEventThunk = (formData) => async (dispatch) => {
	const response = await fetch("/api/events/", {
        method: "POST",

        body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(createEvent(data));
        return data
	}
    const errorData = response.json();

    return errorData

};




const events=(state = {}, action)=> {

	switch (action.type) {
		case CREATE_EVENT:

            return {...state,[action.data.id]:action.data}



		default:
			return state;
	}
}


export default events
