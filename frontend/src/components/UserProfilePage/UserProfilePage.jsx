import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Navigate,NavLink } from "react-router-dom";
import "./UserProfilePage.css"
import OpenModalButton from "../OpenModalButton";
import CreateUserProfileModal from "../CreateUserProfileModal";
import { getCondosThunk } from "../../store/condos";
import {getUsersThunk} from "../../store/users";
import ShowEvents from "../ShowEvents";
import { Loader } from "@googlemaps/js-api-loader"

const UserProfilePage =()=>{

    const dispatch=useDispatch();

    // const [isLoaded,setIsLoaded]=useState(false);
    const [checkedLocation,setCheckedLocation]=useState("");
    const [checkedInterest,setCheckedInterest]=useState("");
    const [sendLocation,setSendLocation]=useState("");
    const [sendInterest,setSendInterest]=useState("");


    const [isReset,setIsReset]=useState(false)
    const sessionUser = useSelector((state) => state.session.user);

    // const condos=useSelector((state)=>state.condos);
console.log("RENDER FROM USER PROFILE PAGE")
    useEffect(() => {

        const getData=async()=>{

            await dispatch(getCondosThunk())
            // await dispatch(getUsersThunk())
            // setIsLoaded(true);
            console.log("from user profile page !!!!")

        }
        getData();

    },[dispatch])

    const condos=useSelector((state)=>state.condos);
    // if(!sessionUser){return <Navigate to="/" />}
const handleChangeLocation=(e)=>{
    setCheckedLocation(e.target.value);
    setIsReset(false);


}

const handleChangeInterest=(e)=>{
    e.stopPropagation();
    setCheckedInterest(e.target.value);
    setIsReset(false);
}
const resetFilters=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    setCheckedLocation("");
    setCheckedInterest("");
    setSendLocation("")
    setSendInterest("")

    setIsReset(true);
}


const handleSubmit=async (e)=>{
    e.preventDefault();
    e.stopPropagation();


setSendLocation(checkedLocation);
setSendInterest(checkedInterest);
//  let props={location:sendLocation,interest:sendInterest}

}

// const handleGoToChat=async(e,id)=>{
//     e.preventDefault();
//     socket=io()
//    const chatroom= getRandomInt(1,1000);
// //    await dispatch(addChatNotificationThunk(room,id))
//  setPayload({
//     initiatorProfileId:sessionUser.profile_id,
//     invitedUserProfileId:id,
//     room:chatroom

// })
// setUserRequestChat(true)
// setChatroom(chatroom)
// // socket.emit("notification",payload)

// //     history.push(`/live-chat/${chatroom}/${id}`)


// }




const loader = new Loader({
    apiKey: "AIzaSyDT-2eTsngiC7PYb6IWkBmtnfi8giJ5-wg",
    version: "weekly",
    libraries:"places",
    callback:"initAutocomplete"

  });





const initAutocomplete= async ()=> {
    const { Map } = await google.maps.importLibrary("maps");
    const map = new Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        console.log(place.geometry.location?.lng())
      console.log(place.geometry?.location?.lat())
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          }),
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  loader.load().then(initAutocomplete());
//   window.initAutocomplete = initAutocomplete;





















    return(<div className="user-profile-page-base">{sessionUser && <div className="if-session-user-profile-page-base">{sessionUser.has_profile==="no" &&<div className="if-user-has-profile-page">
        <p>Join the community</p>
<OpenModalButton buttonText="Create a profile"
                    modalComponent={<CreateUserProfileModal  />}
                  />


</div>
    }{sessionUser.has_profile==="yes" &&<div className="links-when-user-has-profile">
<NavLink
            className="user-profile-link"
            exact to={`/user-profile/${sessionUser.id}`}
             >Profile</NavLink>
<NavLink
            className="create-event-link"
            exact to={`/my-profile/create-event`}
             >Create event</NavLink>
<NavLink
            className=",manage-events-link"
            exact to={`/user-profile/manage-events`}
             >Manage events</NavLink>
             <div className="events-and-users-user-profile-page">
                <div className="events-user-profile-page">
             <form className="user-profile-filter-events-form" onSubmit={handleSubmit} >
             <p>Filter events by:</p>
             <ul>

              <li>
                Location:
                {Object.values(condos).map((condo)=>(
                <label key={`${condo.id}-upp`}>
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
             <button id="filter-events-buttons" onClick={(e)=>{resetFilters(e)}}>Reset</button>
             <button id="filter-events-buttons" type="submit">Search</button>
             </form>
             <ShowEvents props={{location:sendLocation,interest:sendInterest}} />
             </div>
             <div className="users-on-user-profile-page">
             <NavLink
            exact to={`/live-chat/${sessionUser.id}`}
             >Live chat</NavLink>





             </div>
             </div>





    </div>}</div>  }
<div className="map-container">
    <div className="input-maps">
    <input
      id="pac-input"
      class="controls"
      type="text"
      placeholder="Search Box"
    />
    </div>
    <div id="map"></div>


    </div>







{/* 111111111111
    <div id="map"></div>
   { (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyDT-2eTsngiC7PYb6IWkBmtnfi8giJ5-wg", v: "weekly"})} */}














    </div>)
}

export default UserProfilePage;

{/* <NavLink activeClassName="user-profile-link-active"
            className="user-profile-link"
            exact to="/my-profile"
             >Profile</NavLink> */}












//              import React, { useEffect, useState } from "react";

// import { useSelector, useDispatch } from "react-redux";
// import { useParams, Redirect, useLocation, useHistory,NavLink } from "react-router-dom";
// import "./UserProfilePage.css"
// import OpenModalButton from "../OpenModalButton";
// import CreateUserProfileModal from "../CreateUserProfileModal";
// import { getCondosThunk } from "../../store/condos";
// import {getUsersThunk} from "../../store/users";
// import ShowEvents from "../ShowEvents";
// import LiveChat from "../LiveChat";
// import onlineUser from "../logos/online.png"
// import offlineUser from "../logos/offline.png"
// import { io } from "socket.io-client"


// let socket
// let chatroom
// const UserProfilePage =()=>{

//     const dispatch=useDispatch();
//     const history=useHistory();
//     const [isLoaded,setIsLoaded]=useState(false);
//     const [checkedLocation,setCheckedLocation]=useState("");
//     const [checkedInterest,setCheckedInterest]=useState("");
//     const [sendLocation,setSendLocation]=useState("");
//     const [sendInterest,setSendInterest]=useState("");
//     const [userRequestChat,setUserRequestChat]=useState(false);
//     const [chatroom,setChatroom]=useState("");
//     const [payload,setPayload]=useState({})

//     const [isReset,setIsReset]=useState(false)
//     const sessionUser = useSelector((state) => state.session.user);
//     const users=useSelector((state)=>state.users)
//     const condos=useSelector((state)=>state.condos);
//     const allUsers=Object.values(users).filter(user=>user?.id!==sessionUser?.id)

//     const onlineUsers=allUsers.filter(user=>user.is_online==true)
//     const offlineUsers=allUsers.filter(user=>user.is_online==false)

//     useEffect(()=>{
//         // if(env==='production'){socket=io(renderdatabase)}

//     socket=io()
//     // socket=io("ws://localhost:8000")

//     socket.on("notification",async(data)=>{
//         console.log("*******************",data)


//     })

//     },[chatroom])

















//     useEffect(() => {

//         const getData=async()=>{

//             await dispatch(getCondosThunk())
//             await dispatch(getUsersThunk())
//             setIsLoaded(true);

//         }
//         getData();
//     },[isLoaded])


//     if(!sessionUser){return <Redirect to="/" />}
// const handleChangeLocation=(e)=>{
//     setCheckedLocation(e.target.value);
//     setIsReset(false);


// }
// const handleChangeInterest=(e)=>{

//     setCheckedInterest(e.target.value);
//     setIsReset(false);
// }
// const resetFilters=(e)=>{
//     e.preventDefault();
//     setCheckedLocation("");
//     setCheckedInterest("");
//     setSendLocation("")
//     setSendInterest("")

//     setIsReset(true);
// }
// let props

// const handleSubmit=async (e)=>{
//     e.preventDefault();


// setSendLocation(checkedLocation);
// setSendInterest(checkedInterest);
// props={location:sendLocation,interest:sendInterest}

// }
// function getRandomInt(min,max) {
//     const minCeiled = Math.ceil(min);
//     const maxFloored = Math.floor(max);
//     return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
//   }

// const handleGoToChat=async(e,id)=>{
//     e.preventDefault();
//     socket=io()
//    const chatroom= getRandomInt(1,1000);
// //    await dispatch(addChatNotificationThunk(room,id))
//  setPayload({
//     initiatorProfileId:sessionUser.profile_id,
//     invitedUserProfileId:id,
//     room:chatroom

// })
// setUserRequestChat(true)
// setChatroom(chatroom)
// // socket.emit("notification",payload)

// //     history.push(`/live-chat/${chatroom}/${id}`)


// }

//     return(<>{sessionUser && <div>{sessionUser.has_profile==="no" &&<div>
//         <p>Join the community</p>
// <OpenModalButton buttonText="Create a profile"
//                     modalComponent={<CreateUserProfileModal  />}
//                   />


// </div>
//     }{sessionUser.has_profile==="yes" &&<div className="links-when-user-has-profile">
// <NavLink activeClassName="user-profile-link-active"
//             className="user-profile-link"
//             exact to={`/user-profile/${sessionUser.id}`}
//              >Profile</NavLink>
// <NavLink activeClassName="user-profile-link-active"
//             className="create-event-link"
//             exact to={`/my-profile/create-event`}
//              >Create event</NavLink>
// <NavLink activeClassName="user-profile-link-active"
//             className=",manage-events-link"
//             exact to={`/user-profile/manage-events`}
//              >Manage events</NavLink>
//              <div className="events-and-users-user-profile-page">
//                 <div className="events-user-profile-page">
//              <form className="user-profile-filter-events-form" onSubmit={handleSubmit} >
//              <p>Filter events by:</p>
//              <ul>

//               <li>
//                 Location:
//                 {Object.values(condos).map((condo)=>(
//                 <label>
//                 {condo.name}

//                 <input type="radio" value={condo.id} onChange = {(e)=>{handleChangeLocation(e)}} checked={Number(checkedLocation)===Number(condo.id)} />
//                 </label>


//                 ))}
//                  <label>
//                 Other

//                 <input type="radio" value="other" onChange = {(e)=>{handleChangeLocation(e)}} checked={checkedLocation==="other"} />
//                 </label>



//               </li>
//               <li>
//                 Interests:
//                 <select name="languages" id="lang" onChange= {(e)=>{handleChangeInterest(e)}}>
//                 <option selected={isReset}></option>
//                 <option value="tennis">tennis</option>
//                 <option value="padel">padel</option>
//                 <option value="pickleball">pickleball</option>
//                 <option value="golf" >golf</option>
//                 <option value="gym">gym</option>
//                 <option value="boating" >boating</option>
//                 <option value="jogging" >jogging</option>
//                 <option value="dogs" >dogs</option>
//                 <option value="kids_activities">kids activities</option>
//                 <option value="soccer">soccer</option>
//                 <option value="cocktail_hour" >cocktail hour</option>
//                 <option value="philanthropy" >philanthropy</option>
//                 <option value="basketball" >basketball</option>
//                 <option value="art" >art</option>
//                 <option value="spa" >spa</option>
//                 <option value="fine_dining">fine dining</option>
//                 <option value="polo" >polo</option>
//                 <option value="scuba_diving" >scuba diving</option>
//                 <option value="horseback_riding" >horseback riding</option>
//                 <option value="yoga" >yoga</option>
//                 <option value="boxing" >boxing</option>
//                 <option value="other">other</option>
//                 </select>
//               </li>
//              </ul>
//              <button id="filter-events-buttons" onClick={(e)=>{resetFilters(e)}}>Reset</button>
//              <button id="filter-events-buttons" type="submit">Search</button>
//              </form>
//              <ShowEvents props={{location:sendLocation,interest:sendInterest}} />
//              </div>
//              <div className="users-on-user-profile-page">
//                 <p>Users</p>
//                 <ul>{onlineUsers.map(user=>(
//                     <li>{user.first_name} {user.last_name} <img src={onlineUser} id="online-offline-user-circle" /><button onClick={(e)=>{handleGoToChat(e,user.profile_id)}}>Live chat</button> </li>

// ))}

//                 </ul>
//                 <ul>{offlineUsers.map(user=>(
//                     <li>{user.first_name} {user.last_name} <img src={offlineUser} id="online-offline-user-circle" /> </li>

// ))}

//                 </ul>
//                 {userRequestChat &&
//                      <div className="live-chat-on-user-profile">
//                         <LiveChat props={{chatroom,payload}}/>
//                      </div>
//                     }




//              </div>
//              </div>





//     </div>}</div>  }</>)
// }

// export default UserProfilePage;
