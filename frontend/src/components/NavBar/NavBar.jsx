import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from "../../store/session";
import { Navigate } from 'react-router-dom';

import "./NavBar.css";

function NavBar({ isLoaded }){
	// const history=useHistory();
    const dispatch=useDispatch();

	const sessionUser = useSelector(state => state.session.user);
const handleLogOut=async (e)=>{
    e.preventDefault();
    await dispatch(logout());

	<Navigate to="/" />
}
	return (<>
        {sessionUser &&
		<ul className="navbar-ul">
			<li>
				<NavLink exact to="/profile">Home</NavLink>
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
