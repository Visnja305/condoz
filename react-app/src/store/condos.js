// constants
const GET_CONDOS = "condos/GET_CONDOS";


const getCondos = (data) => ({
	type: GET_CONDOS,
	data
});




export const getCondosThunk = () => async (dispatch) => {
	const response = await fetch("/api/condos/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getCondos(data));
	}
};



const condos=(state = {}, action)=> {
    let new_state={}
	switch (action.type) {
		case GET_CONDOS:
			action.data.map((condo) => new_state[condo.id] = condo)
            return new_state

		default:
			return state;
	}
}

export default condos
