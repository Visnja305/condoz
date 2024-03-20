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
<><h1>eveeeentsss</h1>

{events.map(event=>(
   <div className="show-events-event"> <p>{event.location_name},{event.time}</p>
   <p>{event.details}</p>
   <p></p>
   <p>Organized by: </p>

   <UserProfileSmall userId={event.organizer_id} />
   </div>
))}

</>
    )
}

export default ShowEvents;
