// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";


const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});



const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		console.log(data)
		if (data.errors) {
			return data.errors;
		}

		dispatch(setUser(data));
		return data
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};


export const signUp = (first_name,last_name,type,condo_id, email, password) => async (dispatch) => {


	const response = await fetch(`/api/auth/${condo_id}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({

			email,
			password,
			first_name,
			last_name,
			type,
			condo_id,

		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editUsersHasProfileThunk=(profile)=>async(dispatch)=>{
const profileId=profile.id;
	const res =await fetch(`/api/auth/has-profile-yes/${profileId}`, {
	  method: "PUT",


  })
  if (res.ok) {
	const user = await res.json();
	dispatch(setUser(user));
	return user
}
const errorData = res.json();

return errorData

  }

  export const editUsersHasNoProfileThunk=()=>async(dispatch)=>{

		const res =await fetch(`/api/auth/has-profile-no`, {
		  method: "PUT",


	  })
	  if (res.ok) {
		const user = await res.json();
		dispatch(setUser(user));
		return user
	}
	const errorData = res.json();

	return errorData

	  }



export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };

		default:
			return state;
	}
}
