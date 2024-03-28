import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from "../../store/session";
import { useParams, useHistory } from 'react-router-dom';

import "./NavBar.css";

function NavBar({ isLoaded }){
	const history=useHistory()
    const dispatch=useDispatch();
	const sessionUser = useSelector(state => state.session.user);
const handleLogOut=async (e)=>{
    e.preventDefault();
    await dispatch(logout())
	history.push("/")
}
	return (<>
        {sessionUser &&
		<ul className="navbar-ul">
			<li>
				<NavLink exact to={`/profile/${sessionUser.profile_id}`}>Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<button id="logout-navbar-button" onClick={(e)=>{handleLogOut(e)}}>Logout</button>
				</li>
			)}
		</ul>
            }
            </>
	);
}

export default NavBar;
