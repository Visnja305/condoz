// constants
/* eslint-disable no-case-declarations */
const CREATE_EVENT = "events/CREATE_EVENT";
const GET_EVENTS="events/GET_EVENTS";
const DELETE_EVENT="events/DELETE_EVENT";
const EDIT_EVENT="events/EDIT_EVENT"

const createEvent = (data) => ({
	type: CREATE_EVENT,
	data
});
const getEvents=(data)=>({
    type: GET_EVENTS,
    data
})
const deleteEvent=(id)=>({
    type:DELETE_EVENT,
    id

})
const editEvent=(data)=>({
    type:EDIT_EVENT,
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
export const deleteEventThunk=(eventId)=>async(dispatch)=>{
    const response=await fetch(`/api/events/delete/${eventId}`, {
        method: "DELETE",

    });
    if (response.ok) {
      const id = await response.json();

      dispatch(deleteEvent(id));
      return "Event removed";
    }
    return response
}

export const editEventThunk = (formData,eventId) => async (dispatch) => {
    console.log(eventId)
    const response = await fetch(`/api/events/edit/${eventId}`, {
        method: "PUT",

        body: formData,
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editEvent(data));
        return data
    }
    const errorData = response.json();

    return errorData

};




const events=(state = {}, action)=> {
    let new_state={}

	switch (action.type) {

		case CREATE_EVENT:

            return {...state,[action.data.id]:action.data}
        case GET_EVENTS:
            action.data.map((event) => new_state[event.id] = event)
            return new_state
        case DELETE_EVENT:
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        case EDIT_EVENT:
            return {...state,[action.data.id]:action.data}



		default:
			return state;
	}
}


export default events
