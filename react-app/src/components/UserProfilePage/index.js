import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory,NavLink } from "react-router-dom";
import "./UserProfilePage.css"
import OpenModalButton from "../OpenModalButton";
import CreateUserProfileModal from "../CreateUserProfileModal";
import { getCondosThunk } from "../../store/condos";
import ShowEvents from "../ShowEvents"
const UserProfilePage =()=>{
    const dispatch=useDispatch();
    const [isLoaded,setIsLoaded]=useState(false);
    const [checkedLocation,setCheckedLocation]=useState("");
    const [checkedInterest,setCheckedInterest]=useState("");
    const [sendLocation,setSendLocation]=useState("");
    const [sendInterest,setSendInterest]=useState("");

    const [isReset,setIsReset]=useState(false)
    const sessionUser = useSelector((state) => state.session.user);
    const condos=useSelector((state)=>state.condos)





    useEffect(() => {

        const getData=async()=>{

            await dispatch(getCondosThunk())
            setIsLoaded(true);

        }
        getData();
    },[isLoaded])


    if(!sessionUser){return <Redirect to="/" />}
const handleChangeLocation=(e)=>{
    setCheckedLocation(e.target.value);
    setIsReset(false);


}
const handleChangeInterest=(e)=>{

    setCheckedInterest(e.target.value);
    setIsReset(false);
}
const resetFilters=(e)=>{
    e.preventDefault();
    setCheckedLocation("");
    setCheckedInterest("");
    setIsReset(true);
}
let props

const handleSubmit=async (e)=>{
    e.preventDefault();

setSendLocation(checkedLocation);
setSendInterest(checkedInterest);
props={location:sendLocation,interest:sendInterest}

}

    return(<>{sessionUser && <div>{sessionUser.has_profile==="no" &&<div>
        <p>Join the community</p>
<OpenModalButton buttonText="Create a profile"
                    modalComponent={<CreateUserProfileModal  />}
                  />


</div>
    }{sessionUser.has_profile==="yes" &&<div>
<NavLink activeClassName="user-profile-link-active"
            className="user-profile-link"
            exact to={`/user-profile/${sessionUser.id}`}
             >Profile</NavLink>
<NavLink activeClassName="user-profile-link-active"
            className="create-event-link"
            exact to={`/my-profile/create-event`}
             >Create event</NavLink>
             <form className="user-profile-filter-events-form" onSubmit={handleSubmit} >
             <p>Filter events by:</p>
             <ul>

              <li>
                Location:
                {Object.values(condos).map((condo)=>(
                <label>
                {condo.name}

                <input type="radio" value={condo.id} onChange = {(e)=>{handleChangeLocation(e)}} checked={Number(checkedLocation)===Number(condo.id)} />
                </label>


                ))}
                 <label>
                Other

                <input type="radio" value="other" onChange = {(e)=>{handleChangeLocation(e)}} checked={checkedLocation==="other"} />
                </label>



              </li>
              <li>
                Interests:
                <select name="languages" id="lang" onChange= {(e)=>{handleChangeInterest(e)}}>
                <option selected={isReset}></option>
                <option value="tennis">tennis</option>
                <option value="padel">padel</option>
                <option value="pickleball">pickleball</option>
                <option value="golf" >golf</option>
                <option value="gym">gym</option>
                <option value="boating" >boating</option>
                <option value="jogging" >jogging</option>
                <option value="dogs" >dogs</option>
                <option value="kids_activities">kids activities</option>
                <option value="soccer">soccer</option>
                <option value="cocktail_hour" >cocktail hour</option>
                <option value="philanthropy" >philanthropy</option>
                <option value="basketball" >basketball</option>
                <option value="art" >art</option>
                <option value="spa" >spa</option>
                <option value="fine_dining">fine dining</option>
                <option value="polo" >polo</option>
                <option value="scuba_diving" >scuba diving</option>
                <option value="horseback_riding" >horseback riding</option>
                <option value="yoga" >yoga</option>
                <option value="boxing" >boxing</option>
                <option value="other">other</option>
                </select>
              </li>
             </ul>
             <button onClick={(e)=>{resetFilters(e)}}>Reset</button>
             <button type="submit">Search</button>
             </form>
             <ShowEvents props />





    </div>}</div>  }</>)
}

export default UserProfilePage;

{/* <NavLink activeClassName="user-profile-link-active"
            className="user-profile-link"
            exact to="/my-profile"
             >Profile</NavLink> */}
