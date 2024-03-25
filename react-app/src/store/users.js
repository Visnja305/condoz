// constants
const GET_USERS = "users/GET_USERS";
const GET_USER="users/GET_USER";

const getUser=(user)=>({
	type:GET_USER,
	user
})

const getUsers = (users) => ({
	type: GET_USERS,
	users
});

export const getUserThunk = (userId) => async (dispatch) => {

	const response = await fetch(`/api/users/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const user = await response.json();
		if (user.errors) {
			return;
		}

		dispatch(getUser(user));
	}
};





export const getUsersThunk = () => async (dispatch) => {

	const response = await fetch("/api/users/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const users = await response.json();
		if (users.errors) {
			return;
		}

		dispatch(getUsers(users));
	}
};


const users=(state = {}, action)=> {
    let new_state={}
	switch (action.type) {
		case GET_USER:
			return {...state,[action.user.id]:action.user}

		case GET_USERS:


			action.users.map((user) => new_state[user.id] = user)
            return new_state

		default:
			return state;
	}
}

export default users
