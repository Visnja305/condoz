// // constants
// const GET_USERS = "users/GET_USERS";



// const getUsers = (users) => ({
// 	type: GET_USERS,
// 	users
// });

// export const getUsersThunk = () => async (dispatch) => {
// 	const response = await fetch("/api/users/all", {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	if (response.ok) {
// 		const users = await response.json();
// 		if (users.errors) {
// 			return;
// 		}

// 		dispatch(getUsers(users));
// 	}
// };


// const users=(state = {}, action)=> {
//     let new_state={}
// 	switch (action.type) {
// 		case GET_USERS:
//             console.log(users)
// 			action.users.map((user) => new_state[user.id] = user)
//             return new_state

// 		default:
// 			return state;
// 	}
// }

// export default users
