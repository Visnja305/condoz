import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory,NavLink } from "react-router-dom";
import "./UserProfilePage.css"
import OpenModalButton from "../OpenModalButton";
import CreateUserProfileModal from "../CreateUserProfileModal";
import { getCondosThunk } from "../../store/condos";
const UserProfilePage =()=>{
    const dispatch=useDispatch();
    const [isLoaded,setIsLoaded]=useState(false);
    const [checkedLocation,setCheckedLocation]=useState("");
    const [checkedInterest,setCheckedInterest]=useState("");
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



    return(<>{sessionUser && <div>{sessionUser.has_profile==="no" &&<div>
        <p>Join the community</p>
<OpenModalButton buttonText="Create a profile"
                    modalComponent={<CreateUserProfileModal  />}
                  />


</div>
    }{sessionUser.has_profile==="yes" &&<div>
<NavLink activeClassName="user-profile-link-active"
            className="user-profile-link"
            exact to={`/my-profile/${sessionUser.id}`}
             >Profile</NavLink>
<NavLink activeClassName="user-profile-link-active"
            className="create-event-link"
            exact to={`/my-profile/create-event`}
             >Create event</NavLink>
             <form className="user-profile-filter-events-form"  >
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
                <select name="languages" id="lang">
                <option selected={isReset}></option>
                <option value="tennis" onChange = {(e)=>{handleChangeInterest(e)}}>tennis</option>
                <option value="padel" onChange = {(e)=>{handleChangeInterest(e)}}>padel</option>
                <option value="pickleball" onChange = {(e)=>{handleChangeInterest(e)}}>pickleball</option>
                <option value="golf" onChange = {(e)=>{handleChangeInterest(e)}} >golf</option>
                <option value="gym" onChange = {(e)=>{handleChangeInterest(e)}}>gym</option>
                <option value="boating" onChange = {(e)=>{handleChangeInterest(e)}}>boating</option>
                <option value="jogging" onChange = {(e)=>{handleChangeInterest(e)}}>jogging</option>
                <option value="dogs" onChange = {(e)=>{handleChangeInterest(e)}}>dogs</option>
                <option value="kids_activities" onChange = {(e)=>{handleChangeInterest(e)}}>kids activities</option>
                <option value="soccer" onChange = {(e)=>{handleChangeInterest(e)}}>soccer</option>
                <option value="cocktail_hour" onChange = {(e)=>{handleChangeInterest(e)}}>cocktail hour</option>
                <option value="philanthropy" onChange = {(e)=>{handleChangeInterest(e)}}>philanthropy</option>
                <option value="basketball" onChange = {(e)=>{handleChangeInterest(e)}}>basketball</option>
                <option value="art" onChange = {(e)=>{handleChangeInterest(e)}}>art</option>
                <option value="spa" onChange = {(e)=>{handleChangeInterest(e)}}>spa</option>
                <option value="fine_dining" onChange = {(e)=>{handleChangeInterest(e)}}>fine dining</option>
                <option value="polo" onChange = {(e)=>{handleChangeInterest(e)}}>polo</option>
                <option value="scuba_diving" onChange = {(e)=>{handleChangeInterest(e)}}>scuba diving</option>
                <option value="horseback_riding" onChange = {(e)=>{handleChangeInterest(e)}}>horseback riding</option>
                <option value="yoga" onChange = {(e)=>{handleChangeInterest(e)}}>yoga</option>
                <option value="boxing" onChange = {(e)=>{handleChangeInterest(e)}}>boxing</option>
                <option value="other" onChange = {(e)=>{handleChangeInterest(e)}}>other</option>
                </select>
              </li>
             </ul>
             <button onClick={(e)=>{resetFilters(e)}}>Reset</button>
             <button onClick={}>Search</button>
             </form>





    </div>}</div>  }</>)
}

export default UserProfilePage;

{/* <NavLink activeClassName="user-profile-link-active"
            className="user-profile-link"
            exact to="/my-profile"
             >Profile</NavLink> */}
