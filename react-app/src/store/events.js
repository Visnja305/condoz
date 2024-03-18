// constants
const CREATE_EVENT = "events/CREATE_EVENT";
const GET_EVENTS="events/GET_EVENTS"

const createEvent = (data) => ({
	type: CREATE_EVENT,
	data
});
const getEvents=(data)=>({
    type: GET_EVENTS,
    data
})


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
export const getEventsThunk = () => async (dispatch) => {
	const response = await fetch("/api/events/all", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getEvents(data));
	}
};




const events=(state = {}, action)=> {
    let new_state={}

	switch (action.type) {

		case CREATE_EVENT:

            return {...state,[action.data.id]:action.data}
        case GET_EVENTS:
            action.data.map((event) => new_state[event.id] = event)
            return new_state



		default:
			return state;
	}
}


export default events
