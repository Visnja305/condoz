import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./ShowEvents.css"
import {useLocation} from "react-router-dom";
import { getCondosThunk } from "../../store/condos";
import { Link } from "react-router-dom";
import { getEventsThunk } from "../../store/events";
import UserProfileSmall from "../UserProfileSmall";

// import {AnimatePresence, motion} from "framer-motion/dist/framer-motion"
import { motion, AnimatePresence } from "framer-motion"
function ShowEvents(props){
    const dispatch = useDispatch();
    const [isLoaded,setIsLoaded]=useState(false)

    const events=Object.values(useSelector((state)=>state.events))


    console.log(events)


    useEffect(() => {

        const getData=async()=>{
            await dispatch(getEventsThunk());
            setIsLoaded(true);

        }
        getData();






    },[isLoaded])






    return (
<><h1>Events</h1>

{events.map(event=>(
   <div className="show-events-event"> <p>{event.location_name},{event.time.slice(0,22)}</p>
   <p>{event.details}</p>
   <p>{event.need_people_total ? <span>{`Available room for ${event.left_room_for}/out of ${event.need_people_total}`}</span> : "Everyone is invited!"}</p>
   <p>Interests: <ul>{Object.keys(event).map((a)=>(
 event[a]===true && <li key={a}>{a}</li>

))}
        </ul>
        </p>
   <p>Organized by: </p>

   <UserProfileSmall userId={event.organizer_id} />
   <p>Created on:{event.time_created.slice(0,22)}</p>
   </div>
))}

</>
    )
}

export default ShowEvents;
