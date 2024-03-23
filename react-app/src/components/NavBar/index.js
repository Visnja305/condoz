import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from "../../store/session";

import "./NavBar.css";

function NavBar({ isLoaded }){
    const dispatch=useDispatch();
	const sessionUser = useSelector(state => state.session.user);
const handleLogOut=async (e)=>{
    e.preventDefault();
    await dispatch(logout())
}
	return (<>
        {sessionUser &&
		<ul>
			<li>
				<NavLink exact to="/profile">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<button onClick={(e)=>{handleLogOut(e)}}>Logout</button>
				</li>
			)}
		</ul>
            }
            </>
	);
}

export default NavBar;
