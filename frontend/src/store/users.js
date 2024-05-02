// constants
const GET_USERS = "users/GET_USERS";
const GET_USER="users/GET_USER";
const GET_USER_BY_PROFILE_ID="users/GET_USER_BY_PROFILE_ID";
// const GET_ONLINE_USERS="users/GET_ONLINE_USERS";
// const GET_OFFLINE_USERS="users/GET_OFFLINE_USERS";
 const GET_ONLINE_AND_OFFLINE_USERS="users/GET_ONLINE_AND_OFFLINE_USERS"

const getUser=(user)=>({
	type:GET_USER,
	user
})

const getUsers = (users) => ({
	type: GET_USERS,
	users
});

const getUserByProfileId=(offline,online)=>({
	type: GET_USER_BY_PROFILE_ID,
	offline,online

});
// const getOnlineUsers=(users,id)=>({
// 	type:GET_ONLINE_USERS,
// 	users,id
// });
// const getOfflineUsers=(users,id)=>({
// 	type:GET_OFFLINE_USERS,
// 	users,id
// });
const getOnlineAndOfflineUsers=(offline,online)=>({
	type:GET_ONLINE_AND_OFFLINE_USERS,
	online,offline
	
})

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
export const getUserByProfileIdThunk=(id)=>async (dispatch)=>{
    const response = await fetch(`/api/users/search-by-profile/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const user = await response.json();


		dispatch(getUserByProfileId(user));

        return user
	}
return response
}

export const getOnlineAndOfflineUsersThunk=()=>async (dispatch)=>{
	const response=await fetch(`/api/users/get-users`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const users = await response.json();

		const offline=users["offline-users"];
		const online=users["online-users"];






		dispatch(getOnlineAndOfflineUsers(offline,online));

        return users
	}
return response
}

const users=(state = {}, action)=> {
    let new_state={}
	switch (action.type) {
		case GET_USER:
			return {...state,[action.user.id]:action.user}

		case GET_USER_BY_PROFILE_ID:
			return {...state,[action.user.id]:action.user}

		case GET_USERS:


			action.users.map((user) => new_state[user.id] = user)
            return new_state
		case GET_ONLINE_AND_OFFLINE_USERS:
			console.log("from REDUX",action.online)

			return {...state,["onlineUsers"]:action.online,["offlineUsers"]:action.offline}

		default:
			return state;
	}
}

export default users
